import { ADD_PRODUCT, SET_PRODUCTS, LOADING, LOADING_SUCCESS, SET_PRODUCT_DETAILS, SET_DETAILS, OPEN_PRODUCT_MODAL, CLOSE_PRODUCT_MODAL } from '../actionTypes';
import { addError, removeError } from './';
import API from '../../settings/api';

// for loader
export const setItemsLoading = () => {
    return {
        type: LOADING
    }
}

export const loadingSuccess = () => {
    return {
        type: LOADING_SUCCESS
    }
}


// product details modal
export const openProductModal = () => {
    return {
        type: OPEN_PRODUCT_MODAL
    }
}

export const closeProductModal = () => {
    return {
        type: CLOSE_PRODUCT_MODAL
    }
}


// add new product
export const addNewProduct = product => {
    return {
        type : ADD_PRODUCT,
        product
    }
}

export const addProduct = (newProduct) => {
    
    return async dispatch => {
        dispatch(setItemsLoading());
        try {
            API.setForm();
            const product = await API.call('post','/api/products',newProduct);
            dispatch(addNewProduct(product));
            dispatch(removeError());
        } catch(err){
            const { error } = err.response.data;
            dispatch(addError(error));
        }
    }
} 

// set products
export const setProducts = products => ({
    type: SET_PRODUCTS,
    products
});

function formatProducts(products,cartList) {
    const newProducts = [];
    
    products.forEach(product => {
        if(cartList.includes(product._id)){
            product.inCart = true
        } else {
            product.inCart = false
        }
        newProducts.push(product)
    });
    return newProducts;
}

// get product from database
export const getProducts = () => {
    return async (dispatch,getState) => {
        dispatch(setItemsLoading());
        try{
            let products  = await API.call('get','/api/products');
            const cart = getState().cart.cart;
            products = formatProducts(products.products,cart);
            dispatch(setProducts(products));
            dispatch(removeError());
        } catch(err){
            const { error } = err.response.data;
            dispatch(addError(error));
        }
    }
}

// set details using id
export const setDetails = id => {
    return {
        type: SET_PRODUCT_DETAILS,
        id
    }
}

// set details using product object
export const setProductDetails = product => {
    return {
        type: SET_DETAILS,
        product
    }
}

const getItem = (products,pid) => {
        const product = products.find(item => item._id === pid);
        return product;
}

export const updateProducts = pid => {
    return (dispatch,getState) => {
        try{
            let tempProducts = [...getState().product.products];
            const index = tempProducts.indexOf(getItem(tempProducts,pid));
            const product = tempProducts[index];
            product.inCart = true
            dispatch(setProducts(tempProducts));
            dispatch(removeError());
        } catch(err){
            const { error } = err.message;
            dispatch(addError(error));
        }
    }
}

export const getDetails = id => {
    return async dispatch => {
        dispatch(setItemsLoading());
        try{
            const product = await API.call('get',`/api/products/${id}`);            
            dispatch(setProductDetails(product.product));
            dispatch(removeError());
        } catch(err){
            const {error} = err.response.data;
            dispatch(addError(error));
        }
    }
}
