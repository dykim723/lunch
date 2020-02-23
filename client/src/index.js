import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import './index.css';
import App from './App';
import thunk from 'redux-thunk';
import * as serviceWorker from './serviceWorker';

import rootReducer from './modules';
const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;
const middleware = [thunk];
const store = createStore(
  rootReducer,
  /* preloadedState, */ composeEnhancers(applyMiddleware(...middleware)),
);

ReactDOM.render(<App store={store} />, document.getElementById('root'));
// store.dispatch(getPeople());
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
