import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducers/appReducer';
import thunk from 'redux-thunk';

const organizationStore = createStore(
  reducer,
  applyMiddleware(thunk)
);

export default organizationStore;