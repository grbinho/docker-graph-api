import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import Images from './components/Images';
import Containers from './components/Containers';
import './semantic/dist/semantic.min.css';
import AppMenu from './appMenu';


import ApolloClient, { createNetworkInterface } from 'apollo-client';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: 'http://localhost:4000/graphql' }),
});

import { ApolloProvider } from 'react-apollo';


const App = () => (
  <ApolloProvider client={client}>
      <Router history={browserHistory}>
        <Route path="/" component={AppMenu} >
          <IndexRoute component={Containers}/>
          <Route path="containers" component={Containers} />
          <Route path="images" component={Images} />
        </Route>
      </Router>
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById('docker-ui-app'));
