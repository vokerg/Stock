import promiseMiddleware from 'redux-promise';
import logger from 'redux-logger';
import { applyMiddleware } from 'redux';

export default applyMiddleware(promiseMiddleware, logger);
