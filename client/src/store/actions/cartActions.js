import {ADD_TO_CART,SET_CART_DETAILS,UPDATE_CART,UPDATE_CART_TOTALS,CLEAR_CART} from '../actionTypes';
import {updateProductsForCart,setItemsLoading,loadingSuccess,addError, removeError} from './'
import API from '../../settings/api';

/** ------------------------------ Add Item To Cart --------------------------- */
// Add Item to cart
export const addCartItemsAction = itemIds =>({
    type: ADD_TO_CART,
    itemIds
});

// set cart details which added to cart
export const setCartDetails = cart =>({
    type: SET_CART_DETAILS,
    cart
})

export const addCartItems = itemIds =>{
    return (dispatch,getState) => {
        dispatch(addCartItemsAction(itemIds));
        const products = getState().product.products;
        let cartProducts = products.filter(product => itemIds.indexOf(product._id) !== -1)
        cartProducts = cartProducts.map(product => {
            return {
                pid:product._id,
                title:product.title,
                image:product.image,
                price:product.price,
                count: 1
            }
        })
        dispatch(setCartDetails(cartProducts));
        dispatch(updateTotals());
    }
};

export const addToCart = pid => {
    return async (dispatch,getState) => {
        const auth = getState().auth;
        dispatch(setItemsLoading());
        try {
            if(auth.isAuthenticated){
                const cart = {
                    pid,
                    userId: auth.user._id 
                }
                const product = await API.call('post','/api/cart',cart);
                const productIds = product.item.items.map(item => item.pid);
                localStorage.setItem('cart',JSON.stringify(productIds));
                dispatch(addCartItems(JSON.parse(localStorage.getItem('cart'))));
                dispatch(updateProductsForCart());
            } else {
                let cartItems = JSON.parse(localStorage.getItem('cart'));
                if(cartItems){
                    cartItems.push(pid);
                } else {
                    cartItems = [pid]
                }
                localStorage.setItem('cart',JSON.stringify(cartItems));
                dispatch(addCartItems(JSON.parse(localStorage.getItem('cart'))));
                dispatch(updateProductsForCart());
            }
            dispatch(loadingSuccess());
            dispatch(removeError());
        } catch(err){
            const error = err.response ? err.response.data : err.message;
            dispatch(loadingSuccess());
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
        dispatch(updateCart([],tempCart));
        dispatch(updateTotals());
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
        dispatch(updateTotals());
    }
}

export const removetProduct = id => {
    return async (dispatch,getState) => {
        dispatch(setItemsLoading());
        try{
            const auth = getState().auth;
            if(auth.isAuthenticated){
                await API.call('post','api/cart/removeItem',{userId:auth.user._id,pid:id});
            }
            let tempCart = JSON.parse(localStorage.getItem('cart'));
            tempCart = tempCart.filter(item => item !== id);
            localStorage.setItem('cart',JSON.stringify(tempCart))
            dispatch(addCartItems(tempCart));
            dispatch(updateProductsForCart());
            dispatch(loadingSuccess());
        } catch(err){
            dispatch(loadingSuccess());
            const error = err.response ? err.response.data : err.message;
            dispatch(addError(error));
        }
    }
}

const updateTotals = () => {
    let total = 0;
    return (dispatch,getState) => {
        const cartItems = getState().cart.cartDetails;
        cartItems.map( item => (total += item.price * item.count));
        dispatch({
            type:UPDATE_CART_TOTALS,
            total
        })
    }
}

export const clearCart = () => {
    return async (dispatch,getState) => {
        dispatch(setItemsLoading());
        try{
            const auth = getState().auth;
            if(auth.isAuthenticated){
                await API.call('post','api/cart/clearCart',{userId:auth.user._id});
            }
            localStorage.removeItem('cart');
            dispatch(loadingSuccess());
            dispatch(addCartItems([]));
            dispatch(updateProductsForCart());
        } catch(err){
            dispatch(loadingSuccess());
            const error = err.response ? err.response.data : err.message;
            dispatch(addError(error));
        }
    }
}