import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducers/appReducer';
import thunk from 'redux-thunk';

const dockerStore = createStore(
  reducer,
  applyMiddleware(thunk)
);

export default dockerStore;