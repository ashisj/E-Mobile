import {ADD_TO_CART,SET_CART_IDS,SET_CART_DETAILS,UPDATE_CART} from '../actionTypes';

const initialState = {
    cart: [],
    cartDetails: []
}

const cart = ( state = initialState, action) => {
    switch(action.type){
        case ADD_TO_CART:
            return {
                ...state,
                cart: [...state.cart,action.pid]
            }
        case SET_CART_DETAILS:
            return {
                ...state,
                cartDetails: [...action.cart]
            }
        case SET_CART_IDS:
            return {
                ...state,
                cart: [...action.ids]
            }
        case UPDATE_CART:
            let cart = []
            if(action.cart.length){
                cart = action.cart
            } else {
                cart = state.cart
            }
            return {
                ...state,
                cart : cart,
                cartDetails : [...action.details]
            }
        default:
            return state
    } 
}

export default cart;