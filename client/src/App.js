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
import {getProducts,getUser,addDeliveryData} from './store/actions';

// update product List
const  initalCall = async () => {
  await store.dispatch(getProducts());
  await store.dispatch(getUser());
}



const App = () => {
  initalCall();
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
