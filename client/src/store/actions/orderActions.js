import { ADD_DELIVERY_DETAILS } from "../actionTypes";
import API from '../../settings/api';
import {clearCart,loadingSuccess,addError,removeError} from './'

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
        try{
            const deliveryDetails = getState().order.deliveryInfo;
            const items = getState().cart.cartDetails;
            const total = getState().cart.total;

            const order = {
                items,
                total,
                deliveryDetails,
                transactionId,
            }
            
            //const newOrder = 
            await API.call('post','/api/order',order);
            dispatch(loadingSuccess());
            dispatch(removeError());
            dispatch(clearCart());
        } catch(err){
            dispatch(loadingSuccess());
            const error = err.response ? err.response.data : err.message;
            dispatch(addError(error));
        }
        
    }
}