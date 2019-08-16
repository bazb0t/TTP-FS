import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import '../public/index.css';

ReactDOM.render(
  <Provider store={store}>
  <div>
      <h1>Welcome to Bearabull Trading</h1>
      <h2>painless portfolio management</h2>
  </div>
  </Provider>,
  document.getElementById('app')
);
