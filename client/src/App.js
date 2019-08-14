import React from 'react';
import './App.css';

import { BrowserRouter } from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './store'

import NavPage from './pages/NavPage';
import Router from './Router';
import Loader from './components/container/Loader';
import ProductModal from './components/presentational/ProductModal';
import AuthModal from './components/presentational/AuthModal';
import {getProducts,getCartIds,getUser} from './store/actions';

// update product List
const  initalCall = async () => {
  await store.dispatch(getCartIds());
  await store.dispatch(getUser());
  await store.dispatch(getProducts());
}

initalCall();

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavPage/>
        <Router/>
        <Loader />
        <ProductModal/>
        <AuthModal/>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
