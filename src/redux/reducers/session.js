import {
    FETCH_USER_DATA,
    FETCH_USER_DATA_RESPONSE
} from '../actions';

const initialState = {
    fetching: false,
    user: null
};

const sessionReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_USER_DATA: {
            return {
                ...state,
                fetching: true,
            }
        }
        case FETCH_USER_DATA_RESPONSE: {
            return {
                ...state,
                fetching: false,
                user: action.payload
            }
        }
        default:
            return state
    }
};

export default sessionReducer;
