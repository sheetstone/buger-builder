import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import bugerReducer from './store/reducers/burger';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';

import * as serviceWorker from './serviceWorker';
import {watchAuth, watchBurgerBuilder,watchOrder } from './store/sagas/';

const combinedReducer = combineReducers({
  burger: bugerReducer,
  order: orderReducer,
  auth: authReducer,
});

const SagaMiddleware = createSagaMiddleware();

const composeEnhancers = ((process.env.NODE_ENV === 'development')?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:null) || compose;
const store = createStore(combinedReducer, composeEnhancers(applyMiddleware(thunk, SagaMiddleware)));

SagaMiddleware.run(watchAuth);
SagaMiddleware.run(watchBurgerBuilder);
SagaMiddleware.run(watchOrder);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
