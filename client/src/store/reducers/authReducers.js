import { SET_CURRENT_USER,SET_AUTH_MODAL,LOGIN_ERROR,REGISTRATION_FAIL,REGISTRATION_SUCCESS } from '../actionTypes';

const DEFAULT_STATE = {
    isAuthenticated: false,
    user: {},
    isOpenAuthModal: false,
    loginErrorMessage: '',
    registerMessage: '',
    registerStatus: false
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
                loginErrorMessage: '',
                registerMessage: ''
            }
        case LOGIN_ERROR:
            return {
                ...state,
                loginErrorMessage:action.message
            }
        case REGISTRATION_SUCCESS:
            return {
                ...state,
                registerMessage : 'Register Successfully please login...',
                registerStatus: true
            }

        case REGISTRATION_FAIL:
                return {
                    ...state,
                    registerMessage : 'Registration failed',
                    registerStatus: false
                }
        default:
            return state;
    }
};