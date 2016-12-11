import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'
import { Provider } from 'react-redux';
import dockerStore from './store/dockerStore';
import Images from './components/Images';

const App = () => (
  <Provider store={dockerStore}>
    <div>
      <Router history={browserHistory}>
        <Route path="/" component={Images} />
      </Router>
      <ReduxToastr position="bottom-right" />
    </div>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('docker-ui-app'));
