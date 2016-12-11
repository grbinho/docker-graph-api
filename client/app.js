import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'
import { Provider } from 'react-redux';
import dockerStore from './store/dockerStore';
import Images from './components/Images';


import ApolloClient, { createNetworkInterface } from 'apollo-client';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: 'http://localhost:4000' }),
});

import { ApolloProvider } from 'react-apollo';




const App = () => (
  <ApolloProvider client={client}>
    <Provider store={dockerStore}>
      <div>
        <Router history={browserHistory}>
          <Route path="/" component={Images} />
        </Router>
      </div>
    </Provider>
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById('docker-ui-app'));
