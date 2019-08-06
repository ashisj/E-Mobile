import { ADD_ERROR, REMOVE_ERROR } from '../actionTypes';
import { loadingSuccess } from "./";

export const addError = error => dispatch =>{
  dispatch(loadingSuccess());
  dispatch({
    type: ADD_ERROR,
    error
  })
};

export const removeError = () => dispatch => {
  dispatch(loadingSuccess());
  dispatch({
    type: REMOVE_ERROR
  });
};