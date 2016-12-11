import 'whatwg-fetch';

const createAsyncDispatch = (url, requestOptions, action, payloadTransformer, requestBodyTransformer) =>
  (dispatch) => {
    // Handle response and dispatch
    const handleResponse = (response) => {
      if (payloadTransformer && response.body) {
        action.payload = payloadTransformer(response.body);
      }

      if (response.isSuccess) {
        dispatch({ type: 'CLEAR_ERRORS' });
        return dispatch(action);
      }

      // Error handling
      // We will turn an array of Key:'PropertyName', Value: 'Error text' pairs
      // into an object.
      const errors = {};

      if (response.body) {
        response.body.forEach((item) => {
          let propertyName = item.Key;
          const value = item.Value;

          if (!propertyName) {
            propertyName = 'genericErrorMessage';
          }
          // Expand the object with new property
          Object.assign(errors, { [propertyName]: value });
        });
      }

      return dispatch({
        type: 'ERROR',
        payload: errors
      });
    };

    const method = requestOptions;
    const headers = {
      Prefer: 'return=representation',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      //Authorization: `Bearer ${Context.jwtToken}`
    };

    let fetchRequest = {
      method,
      headers
    };

    if (requestOptions !== null && typeof requestOptions === 'object') {
      fetchRequest = requestOptions;
    }

    if (action.payload &&
      (fetchRequest.method.toLowerCase() === 'post') ||
      (fetchRequest.method.toLowerCase() === 'put')) {
      let body = action.payload;
      if (requestBodyTransformer) {
        body = requestBodyTransformer(body);
      }

      fetchRequest.body = JSON.stringify(body);
    }

    // Do the call.
    return fetch(url, fetchRequest)
      .then((response) => {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
          return response.json().then((body) => {
            return { isSuccess: response.status !== 400, body };
          });
        }
        return { isSuccess: response.status !== 400 };
      })
      .then(handleResponse);
  };

export { createAsyncDispatch };