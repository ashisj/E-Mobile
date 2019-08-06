import { ADD_PRODUCT, SET_PRODUCTS,LOADING,LOADING_SUCCESS, SET_PRODUCT_DETAILS,SET_DETAILS } from '../actionTypes';

const initialState = {
    products : [],
    loading : false,
    successMessage : '',
    details: []
}

const product = (state = initialState ,action) => {
    switch(action.type){
        case ADD_PRODUCT:
            return {
                ...state,
                products:[action.product.product,...state.products],
                successMessage: `Product added with product id <Link to='/'>${action.product.product._id}</Link>`,
                loading: false
            }
        case SET_PRODUCTS:
            return {
                ...state,
                products : [...action.products],
                loading : false
            }
        case LOADING:
            return {
                ...state,
                loading: true
            }
        case LOADING_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case SET_PRODUCT_DETAILS:
            const product = state.products.find(product => product._id === action.id )
            return {
                ...state,
                details : product
            }
        case SET_DETAILS:
            return {
                ...state,
                details : action.product[0]
            }
        default:
            return state;
    }
}

export default product;