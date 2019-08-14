import {SET_AUTH_MODAL,SET_CURRENT_USER,LOGIN_ERROR} from '../actionTypes'
import {setItemsLoading,loadingSuccess} from './';
import API from '../../settings/api';

/* Modal */
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

/* end modal */


// Set User in store
export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user,
});

/* Logout user */
export const logout = () => {
  return async dispatch => {
      await API.call('get','/auth/logout');
      dispatch(setCurrentUser({}));
  };
};

/* Login user */

// Get user data from database
export const getUser = () => {
  return async dispatch => {
    try{
      const user = await API.call('get','/auth/user');
      if(user.user){
        dispatch(setCurrentUser(user.user));
        dispatch(closeAuthModal())
      }
    } catch(err){
      dispatch(setCurrentUser({}));
      dispatch(closeAuthModal())
    }
  }
}

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
      const user = await API.call('post','/auth/login',loginData);
      dispatch(setCurrentUser(user.user));
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

export const googleLogin = (token) => {
  return async dispatch => {
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






/*
import { addError, removeError } from './error';

//import API from '../../services/api';



export const setToken = token => {
    API.setToken(token);
};

export const logout = () => {
    return dispatch => {
        localStorage.clear();
        API.setToken(null);
        dispatch(setCurrentUser({}));
        dispatch(removeError());
  };
};

export const authUser = (path, data) => {
  return async dispatch => {
    try {
      const { token, ...user } = await API.call('post', `auth/${path}`, data);
      localStorage.setItem('jwtToken', token);
      API.setToken(token);
      dispatch(setCurrentUser(user));
      dispatch(removeError());
    } catch (err) {
      const { error } = err.response.data;     
      dispatch(addError(error));
    }
  };
};
*/