import { SET_CURRENT_USER,SET_AUTH_MODAL,LOGIN_ERROR } from '../actionTypes';

const DEFAULT_STATE = {
    isAuthenticated: false,
    user: {},
    isOpenAuthModal: false,
    loginErrorMessage: ''
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !!Object.keys(action.user).length,
                user: action.user,
            };
        case SET_AUTH_MODAL:
            return {
                ...state,
                isOpenAuthModal:action.status,
                loginErrorMessage: ''
            }
        case LOGIN_ERROR:
            return {
                ...state,
                loginErrorMessage:action.message
            }
        default:
            return state;
    }
};