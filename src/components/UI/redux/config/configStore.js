import { combineReducers, createStore } from 'redux';
import addNewFeed from '../modules/addNewFeed';
import modal from '../modules/modal';
import currentEmail from '../modules/currentEmail';

const rootReducer = combineReducers({ addNewFeed, modal, currentEmail });
const store = createStore(rootReducer);

export default store;
