import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
//import { configureStore } from '@reduxjs/toolkit'
//import { Provider } from 'react-redux'
import App from './components/App';
//import rootReducer from './slices'

//const store = configureStore({ reducer: rootReducer })
const root = document.querySelector('#root');

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  root
);
