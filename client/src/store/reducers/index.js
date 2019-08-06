import { combineReducers } from 'redux';
import productReducer from './productReducers';
import errorReducers from './errorReducers'
export default combineReducers({
    product: productReducer,
    error: errorReducers 
});