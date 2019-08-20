import { ADD_DELIVERY_DETAILS } from "../actionTypes";

const initialState = {
    deliveryInfo : {},
    readyForPay : false 
}

const order = (state=initialState,action) => {
    switch(action.type){
        case ADD_DELIVERY_DETAILS:
            return {
                ...state,
                deliveryInfo: action.info,
                readyForPay: true
            }
        default:
            return state;
    }
}

export default order;