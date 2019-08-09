import { combineReducers } from 'redux';
import productReducer from './productReducers';
import errorReducers from './errorReducers';
import cartReducers from './cartReducers';

export default combineReducers({
    product: productReducer,
    error: errorReducers,
    cart: cartReducers 
});