import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'
import Images from './components/Images';
import './semantic/dist/semantic.min.css';


import ApolloClient, { createNetworkInterface } from 'apollo-client';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: 'http://localhost:4000/graphql' }),
});

import { ApolloProvider } from 'react-apollo';


const App = () => (
  <ApolloProvider client={client}>
    <div>
      <Router history={browserHistory}>
        <Route path="/" component={Images} />
      </Router>
    </div>
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById('docker-ui-app'));
