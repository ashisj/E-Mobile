import { ADD_ERROR, REMOVE_ERROR } from '../actionTypes';

const initialState = { 
    message : null,
    isError : false 
}
export default(state=initialState,action) => {
    switch(action.type){
        case ADD_ERROR:
            return {
                ...state,
                message: action.error,
                isError: true
            };
        case REMOVE_ERROR:
            return {
                ...state,
                message: null,
                isError: false
            };
        default:
            return state
    }
}
