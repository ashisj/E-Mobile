import {SET_AUTH_MODAL,SET_CURRENT_USER,LOGIN_ERROR} from '../actionTypes'
import {setItemsLoading,loadingSuccess,addCartItems,updateProductsForCart,addError,removeError} from './';
import API from '../../settings/api';

/*------------------------------------Authentication  Modal -----------------------------*/
export const setAuthModal = status => ({
  type: SET_AUTH_MODAL,
  status
})

export const closeAuthModal = () => {
  return dispatch => {
    dispatch(setAuthModal(false));
  }
};

export const openAuthModal = () => {
  return dispatch => {
    dispatch(setAuthModal(true));
  }
}

/* end Auth modal */



/*--------------------------------------- Logout user ------------------------------------ */
export const logout = () => {
  return async dispatch => {
    dispatch(setItemsLoading());
    try{
      await API.call('get','/auth/logout');
      dispatch(setCurrentUser({}));
      localStorage.removeItem('cart');
      dispatch(addCartItems([]));
      dispatch(updateProductsForCart());
      dispatch(removeError());
      dispatch(loadingSuccess());
    } catch(err){
      dispatch(loadingSuccess());
      const error = err.response ? err.response.data : err.message;
      dispatch(addError(error));
    }
  };
};

/*---------------------------------------- Logged In user ------------------------------------*/

// Set User in store
export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user,
});

// Get user data from database
export const getUser = () => {
  return async dispatch => {
    dispatch(setItemsLoading());
    try{
      const user = await API.call('get','/auth/user');

      if(user.user){
        dispatch(setCurrentUser(user.user));
        if(user.user.cart){
          localStorage.setItem('cart',JSON.stringify(user.user.cart));
          dispatch(addCartItems(JSON.parse(localStorage.getItem('cart'))));
          dispatch(updateProductsForCart());
        } 
        dispatch(closeAuthModal());
      } else {
        const cartItems = JSON.parse(localStorage.getItem('cart'));
        if(cartItems){
          dispatch(addCartItems(cartItems));
          dispatch(updateProductsForCart());
        }
        dispatch(setCurrentUser({}));
        dispatch(openAuthModal());
      }
      dispatch(loadingSuccess());
      dispatch(removeError())
    } catch(err){
      const error = err.response ? err.response.data : err.message;
      dispatch(setCurrentUser({}));
      dispatch(closeAuthModal())
      dispatch(loadingSuccess());
      dispatch(addError(error));
    }
  }
}

/* ---------------------------------------------- Log In --------------------------------------------- */
// error message for login
export const loginError = message => ({
  type:LOGIN_ERROR,
  message
});

export const loginFail = message => {
  return dispatch => {
    dispatch(loginError(message))
  }
}

// login user
export const login = (loginData) => {
  return async dispatch => {
    dispatch(setItemsLoading());
    try{
      const cartItems = localStorage.getItem('cart')
      if(cartItems){
        loginData.cart = cartItems;
      }
      const user = await API.call('post','/auth/login',loginData);
      dispatch(setCurrentUser(user.user));
      if(user.user.cart){
        localStorage.setItem('cart',JSON.stringify(user.user.cart));
        dispatch(addCartItems(JSON.parse(localStorage.getItem('cart'))));
        dispatch(updateProductsForCart());
      }
      dispatch(closeAuthModal());
      dispatch(loadingSuccess());
    } catch(err){
      if(err.response.status === 401){
        dispatch(loginError('Invalid Credentials'))
      }
      dispatch(loadingSuccess());
      dispatch(setCurrentUser({}));
    }
  }
}

export const googleLogin = (loginData) => {
  return async dispatch => {
    dispatch(setItemsLoading());
    try{
      const cartItems = localStorage.getItem('cart')
      if(cartItems){
        loginData.cart = cartItems;
      }
      const user = await API.call('post','/auth/google',loginData);
      dispatch(setCurrentUser(user.user));
      if(user.user.cart){
        localStorage.setItem('cart',JSON.stringify(user.user.cart));
        dispatch(addCartItems(JSON.parse(localStorage.getItem('cart'))));
        dispatch(updateProductsForCart());
      }
      dispatch(closeAuthModal());
      dispatch(loadingSuccess());
    } catch(err){
      dispatch(loadingSuccess());
      dispatch(loginError('Error occoured !!! Please try again....'));
      dispatch(setCurrentUser({}));
    }
  }
}

/*
export const facebookLogin = (token) => {
  return async dispatch => {
    console.log(token);
    dispatch(setItemsLoading());
    try{
      const user = await API.call('post','/auth/google',token);
      dispatch(setCurrentUser(user.user));
      dispatch(closeAuthModal());
      dispatch(loadingSuccess());
    } catch(err){
      dispatch(loadingSuccess());
      dispatch(loginError('Error occoured !!! Please try again....'));
    }
  }
}
*/

export const register = (registerData) => {
  return async dispatch => {
    const user = await API.call('post','/auth/signup',registerData);
    console.log(user);
  }
}