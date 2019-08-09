import React from 'react';
import './App.css';

import { BrowserRouter } from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './store'

import NavPage from './pages/NavPage';
import Router from './Router';
import Loader from './components/container/Loader';
import ProductModal from './components/presentational/ProductModal';
import {getProducts,getCartIds} from './store/actions';

// update product List
store.dispatch(getCartIds());
setTimeout(()=>{
  store.dispatch(getProducts());
},0);

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavPage/>
        <Router/>
        <Loader />
        <ProductModal/>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
