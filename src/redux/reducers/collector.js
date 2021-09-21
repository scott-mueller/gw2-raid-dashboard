import {
    FETCH_COLLECTOR_DATA,
    FETCH_COLLECTOR_DATA_RESPONSE,
    FETCH_ENCOUNTERS_FOR_TIMELINE_DETAILS,
    FETCH_ENCOUNTERS_FOR_TIMELINE_DETAILS_RESPONSE
} from "../actions";

const initialState = {
    stats: {},
    timelineEncounters: [],
    fetching: false
};

const collectorStatsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COLLECTOR_DATA: {
            return {
                ...state,
                fetching: true, stats: {}
            }
        }
        case FETCH_COLLECTOR_DATA_RESPONSE: {
            return {
                ...state,
                fetching: false,
                stats: action.payload.stats
            }
        }
        case FETCH_ENCOUNTERS_FOR_TIMELINE_DETAILS: {
            return {
                ...state,
                timelineEncounters: [],
                fetching: true
            }
        }
        case FETCH_ENCOUNTERS_FOR_TIMELINE_DETAILS_RESPONSE: {
            return {
                ...state,
                fetching: false,
                timelineEncounters: action.payload.encounters
            }
        }
        default:
            return state;
    }
};

export default collectorStatsReducer;
