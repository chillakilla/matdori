import { createStore } from 'redux';
import { combineReducers } from 'redux';
import filterConfig from 'redux/modules/filterConfig';
import feeds from 'redux/modules/feeds';

const rootReducer = combineReducers({
  filterConfig,
  feeds
});

const store = createStore(rootReducer);

export default store;
