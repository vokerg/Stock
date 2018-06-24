import { createStore } from 'redux';
import applyMiddleware from './middleware'
import mainReducer from './reducers'

var store = createStore(mainReducer, applyMiddleware);

export const getConfiguredStore = () => store;

export const getCurrentState = () => store.getState();
