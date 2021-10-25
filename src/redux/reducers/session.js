import {
    SIGN_UP,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAIL,
    SIGN_IN,
    SIGN_IN_SUCCESS,
    SIGN_IN_FAIL,
    FETCH_USER_BY_SESSION_TOKEN,
    FETCH_USER_BY_SESSION_TOKEN_RESPONSE,
    SIGN_OUT,
    VERIFY_API_KEY_RESPONSE,
    RESET_LOGIN_SIGNUP,
    VERIFY_API_KEY
} from '../actions';

const initialState = {
    fetching: false,
    user: {},
    signInSuccess: undefined,
    signupSuccess: undefined,
    errors: {},
    apiKeyVerified: false,
    verificationMessage: undefined
};

const sessionReducer = (state = initialState, action) => {
    switch(action.type) {
        case SIGN_UP: {
            return {
                ...state,
                fetching: true,
                signupSuccess: undefined,
                signedOut: null,
                errors: {}
            }
        }
        case SIGN_UP_SUCCESS: {
            return {
                ...state,
                fetching: false,
                signupSuccess: true,
                user: action.payload
            }
        }
        case SIGN_UP_FAIL: {
            return {
                ...state,
                fetching: false,
                signupSuccess: action.payload.success,
                errors: {
                    data: action.payload.data,
                    message: action.payload.message
                }
            }
        }
        case SIGN_IN: {
            return {
                ...state,
                fetching: true,
                signInSuccess: undefined,
                signedOut: null,
                errors: {}
            }
        }
        case SIGN_IN_SUCCESS: {
            return {
                ...state,
                fetching: false,
                signInSuccess: true,
                user: action.payload
            }
        }
        case SIGN_IN_FAIL: {
            return {
                ...state,
                fetching: false,
                signInSuccess: false,
                errors: {
                    failField: action.payload.failField,
                    message: action.payload.message
                }
            }
        }
        case FETCH_USER_BY_SESSION_TOKEN: {
            return {
                ...state,
                fetching: true
            }
        }
        case FETCH_USER_BY_SESSION_TOKEN_RESPONSE: {
            return {
                ...state,
                fetching: false,
                user: action.payload
            }
        }
        case SIGN_OUT: {
            return {
                ...state,
                signInSuccess: undefined,
                signupSuccess: undefined,
                signedOut: true,
                user: {}
            }
        }
        case VERIFY_API_KEY: {
            return {
                ...state,
                fetching: true,
                verificationMessage: undefined
            }
        }
        case VERIFY_API_KEY_RESPONSE: {
            return {
                ...state,
                fetching: false,
                verificationMessage: action.payload ? undefined : 'Unable to match account name to api key',
                apiKeyVerified: action.payload
            }
        }
        case RESET_LOGIN_SIGNUP: {
            return {
                ...state,
                apiKeyVerified: false,
                signInSuccess: undefined,
                signupSuccess: undefined,
                verificationMessage: undefined,
                errors: {},
            }
        }
        default:
            return state
    }
};

export default sessionReducer;
