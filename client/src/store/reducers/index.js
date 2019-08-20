import { combineReducers } from 'redux';
import productReducer from './productReducers';
import errorReducers from './errorReducers';
import cartReducers from './cartReducers';
import authReducers from './authReducers';
import orderReducers from './orderReducers';

export default combineReducers({
    product: productReducer,
    error: errorReducers,
    cart: cartReducers,
    auth: authReducers,
    order: orderReducers
});