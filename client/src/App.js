import React from 'react';
import './App.css';

import { BrowserRouter } from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './store'

import NavPage from './pages/NavPage';
import Router from './Router';
import Loader from './components/container/Loader';
import {getProducts} from './store/actions';

// update product List
store.dispatch(getProducts());

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavPage/>
        <Router/>
        <Loader />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
