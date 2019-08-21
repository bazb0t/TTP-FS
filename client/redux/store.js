// Redux
import thunkMiddleware from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';

// Utils
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

// Combine Reducers
import user from './user'

const defaultReducer = (state = {}, action) => {
    return state;
  }

const reducer = combineReducers({defaultReducer, user});


// Create Store & Export All
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(
    thunkMiddleware,
    createLogger({ collapsed: true })
  ))
);

export default store;
export * from './user';
