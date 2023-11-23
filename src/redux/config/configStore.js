import { createStore } from 'redux';
import { combineReducers } from 'redux';
import fetchConfig from 'redux/modules/fetchConfig';

const rootReducer = combineReducers({
  fetchConfig
});

const store = createStore(rootReducer);

export default store;
