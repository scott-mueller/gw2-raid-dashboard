import { uniq } from 'ramda';
import {
    FETCH_COLLECTOR_DATA,
    FETCH_COLLECTOR_DATA_RESPONSE,
    FETCH_ENCOUNTERS_FOR_TIMELINE_DETAILS,
    FETCH_ENCOUNTERS_FOR_TIMELINE_DETAILS_RESPONSE,
    FETCH_ENCOUNTERS_FOR_PLAYER_IN_COLLECTOR,
    FETCH_ENCOUNTERS_FOR_PLAYER_IN_COLLECTOR_RESPONSE,
    APPLY_PROFESSION_FILTER,
    APPLY_ROLE_FILTER,
    RESET_PROFESSION_AND_ROLE_FILTERS
} from "../actions";

const initialState = {
    stats: {},
    timelineEncounters: [],
    selectedPlayer: {
        accountName: null,
        encounters: [],
        filteredEncounters: [],
        filters: {
            profession: null,
            roles: []
        }
    },
    fetching: false
};

const collectorStatsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COLLECTOR_DATA: {
            return {
                ...state,
                fetching: true,
                stats: {}
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
        case FETCH_ENCOUNTERS_FOR_PLAYER_IN_COLLECTOR: {
            const newState =  {
                ...state,
                fetching: true,
                selectedPlayer: initialState.selectedPlayer
            }
            newState.selectedPlayer.accountName = action.payload.accountName
            newState.selectedPlayer.filteredEncounters = [];
            newState.selectedPlayer.filters = {
                profession: null,
                roles: []
            };
            return newState;
        }
        case FETCH_ENCOUNTERS_FOR_PLAYER_IN_COLLECTOR_RESPONSE: {
            const newState = {
                ...state,
                fetching: false
            };
            newState.selectedPlayer.encounters = action.payload.encounters;
            newState.selectedPlayer.filteredEncounters = action.payload.encounters;
            return newState;
        }
        case APPLY_PROFESSION_FILTER: {
            const newState = state;
            
            if(action.payload === state.selectedPlayer.filters.profession) {
                newState.selectedPlayer.filters.profession = null;
            }
            else {
                newState.selectedPlayer.filters.profession = action.payload;
            }

            const filteredEncounters = state.selectedPlayer.encounters.filter((encounter) => {
                const player = encounter.players.filter((player) => player.accountName === state.selectedPlayer.accountName)[0];
                
                // PROFESSION FILTER
                let hasProfession;
                if (newState.selectedPlayer.filters.profession){
                    hasProfession = player.profession.toLowerCase() === newState.selectedPlayer.filters.profession.toLowerCase();
                }
                else {
                    hasProfession = true;
                }

                // ROLE FILTER
                let hasRole;
                if (newState.selectedPlayer.filters.roles.length > 0) {
                    hasRole = newState.selectedPlayer.filters.roles.every((role) => player.roles.includes(role));
                }
                else {
                    hasRole = true;
                }

                return hasRole && hasProfession;
            });

            newState.selectedPlayer.filteredEncounters = filteredEncounters || [];

            return newState;
        }
        case APPLY_ROLE_FILTER: {
            const newState = state;

            if (newState.selectedPlayer.filters.roles.includes(action.payload)) {
                const index = newState.selectedPlayer.filters.roles.indexOf(action.payload);
                newState.selectedPlayer.filters.roles.splice(index, 1);
            }
            else {
                newState.selectedPlayer.filters.roles.push(action.payload);
            }
            newState.selectedPlayer.filters.roles = uniq(newState.selectedPlayer.filters.roles);

            const filteredEncounters = state.selectedPlayer.encounters.filter((encounter) => {
                const player =  encounter.players.filter((player) => player.accountName === state.selectedPlayer.accountName)[0];

                // PROFESSION FILTER
                let hasProfession;
                if (newState.selectedPlayer.filters.profession){
                    hasProfession = player.profession.toLowerCase() === newState.selectedPlayer.filters.profession.toLowerCase();
                }
                else {
                    hasProfession = true;
                }

                // ROLE FILTER
                let hasRole;
                if (newState.selectedPlayer.filters.roles.length > 0) {
                    hasRole = newState.selectedPlayer.filters.roles.every((role) => player.roles.includes(role));
                }
                else {
                    hasRole = true;
                }

                return hasProfession && hasRole;
            });

            newState.selectedPlayer.filteredEncounters = filteredEncounters || [];

            return newState;
        }
        case RESET_PROFESSION_AND_ROLE_FILTERS: {
            const newState = state;

            newState.selectedPlayer.filters.profession = null;
            newState.selectedPlayer.filters.roles = [];
            newState.selectedPlayer.filteredEncounters = newState.selectedPlayer.encounters;

            return newState;
        }
        default:
            return state;
    }
};

export default collectorStatsReducer;
