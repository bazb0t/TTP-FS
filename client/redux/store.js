import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// More Reducers
import user from './user';
import trade from './trade';
import assets from './assets';
import sumAssets from './sumAssets';
import transactions from './transactions';

// Reducer & Middleware
const reducer = combineReducers({ user, trade, assets, transactions, sumAssets });
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

// Create Store & Export All
const store = createStore(reducer, middleware);

export default store;
export * from './user';
export * from './trade';
export * from './assets';
export * from './sumAssets';
export * from './transactions';
