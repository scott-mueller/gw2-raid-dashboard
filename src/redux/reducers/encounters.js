import {
    CLEAR_ENCOUNTERS_LIST,
    FETCH_ENCOUNTERS_BY_ACCOUNT_NAME,
    FETCH_ENCOUNTERS_BY_ACCOUNT_NAME_RESPONSE
} from "../actions";

const initialState = {
    fetching: false,
    encounters: [],
    filteredEncounters: [],
    filters: {}
};

const encountersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ENCOUNTERS_BY_ACCOUNT_NAME: {
            return {
                ...initialState,
                fetching: true,
            }
        }
        case FETCH_ENCOUNTERS_BY_ACCOUNT_NAME_RESPONSE: {
            return {
                ...state,
                fetching: false,
                encounters: action.payload,
                filteredEncounters: action.payload
            }
        }
        case CLEAR_ENCOUNTERS_LIST: {
            return {
                ...initialState
            }
        }
        default:
            return state;
    }
};

export default encountersReducer;
