import {ADD_TO_CART,SET_CART_DETAILS,SET_CART_IDS,UPDATE_CART} from '../actionTypes';
import {updateProducts,setItemsLoading,loadingSuccess,addError, removeError} from './'
import API from '../../settings/api';

// Add Item to cart
export const addCart = pid =>({
    type: ADD_TO_CART,
    pid
});


export const addToCart = pid => {
    return async (dispatch,getState) => {
        try {
            const cart = {
                pid
            }
            const product = await API.call('post','/api/cart',cart);
            dispatch(addCart(product.item.pid));
            dispatch(updateProducts(pid));
            dispatch(removeError());
        } catch(err){
            const error = err.response ? err.response.data : err.message;
            dispatch(addError(error));
        }
    }
}

// set the items id which are in cart
export const setCartIds = ids =>({
    type: SET_CART_IDS,
    ids
});

// get from database
export const getCartIds = () => {
    return async (dispatch) => {
        dispatch(setItemsLoading())
        try{
            const cart = await API.call('get','/api/cart/ids');
            dispatch(setCartIds(cart.cart));
            dispatch(loadingSuccess)
            dispatch(removeError());
        } catch(err){
            const { error } = err.response.data;
            dispatch(addError(error));
        }
    }
}

// set cart details which added to cart
export const setCartDetails = cart =>({
    type: SET_CART_DETAILS,
    cart
})

// get from database
export const getCartItems = () => {
    return async (dispatch) => {
        dispatch(setItemsLoading())
        try{
            const cart = await API.call('get','/api/cart');
            dispatch(setCartDetails(cart.cart));
            dispatch(loadingSuccess());
            dispatch(removeError());
        } catch(err){
            const { error } = err.response.data;
            dispatch(addError(error));
        }
    }
}

export const updateCart = (cart,details) => ({
    type: UPDATE_CART,
    cart,
    details
});

export const incrementProduct = id => {
    return (dispatch,getState) => {
        let tempCart = [...getState().cart.cartDetails];
        let selectedProduct = tempCart.find(item => item.pid === id);

        const index = tempCart.indexOf(selectedProduct);
        let product = tempCart[index];
        product.count += 1;
        dispatch(updateCart([],tempCart))
    }
}

export const decrementProduct = id => {
    return (dispatch,getState) => {
        let tempCart = [...getState().cart.cartDetails];
        let selectedProduct = tempCart.find(item => item.pid === id);

        const index = tempCart.indexOf(selectedProduct);
        let product = tempCart[index];
        product.count -= 1;
        dispatch(updateCart([],tempCart))
    }
}

export const removetProduct = id => {
    return (dispatch,getState) => {
        let tempCart = [...getState().cart.cart];
        let tempCartDetails = [...getState().cart.cartDetails];
        tempCartDetails = tempCartDetails.map(item => item.pid !==id );
        tempCart.splice(tempCart.indexOf(id),1);
        dispatch(updateCart(tempCart,tempCartDetails))
    }
}