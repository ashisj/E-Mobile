import { ADD_DELIVERY_DETAILS } from "../actionTypes";
import API from '../../settings/api';

export const addDeliveryDetails = info =>{
    return {
        type: ADD_DELIVERY_DETAILS,
        info
    }
};

export const addDeliveryData = info =>{
    return dispatch => {
        dispatch(addDeliveryDetails(info));
    }
};

export const placeOrder = transactionId =>{
    return async (dispatch,getState) => {
        const deliveryDetails = getState().order.deliveryInfo;
        const items = getState().cart.cartDetails;
        const total = getState().cart.total;

        const order = {
            items,
            total,
            deliveryDetails,
            transactionId
        }
        
        const newOrder = await API.call('post','/api/order',order);
        console.log(newOrder);
        
    }
}