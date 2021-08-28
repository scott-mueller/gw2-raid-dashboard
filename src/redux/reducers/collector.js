import { FETCH_COLLECTOR_DATA, FETCH_COLLECTOR_DATA_RESPONSE } from "../actions";

const initialState = {
    stats: {},
    fetching: false
};

const collectorStatsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COLLECTOR_DATA: {
            return {
                ...state,
                fetching: true
            }
        }
        case FETCH_COLLECTOR_DATA_RESPONSE: {
            return {
                ...state,
                fetching: false,
                stats: action.payload.stats
            }
        }
        default:
            return state;
    }
};

export default collectorStatsReducer;
