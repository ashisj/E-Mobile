import { ADD_PRODUCT, SET_PRODUCTS, LOADING, LOADING_SUCCESS, SET_PRODUCT_DETAILS, SET_DETAILS } from '../actionTypes';
import { addError, removeError } from './';
import API from '../../settings/api';

export const setProducts = products => ({
    type: SET_PRODUCTS,
    products
});

export const setItemsLoading = () => {
    return {
        type: LOADING
    }
}

export const addNewProduct = product => {
    return {
        type : ADD_PRODUCT,
        product
    }
}

export const loadingSuccess = () => {
    return {
        type: LOADING_SUCCESS
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

export const getProducts = () => {
    return async dispatch => {
        dispatch(setItemsLoading());
        try{
            const products  = await API.call('get','/api/products');
            dispatch(setProducts(products.products));
            dispatch(removeError());
        } catch(err){
            const { error } = err.response.data;
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