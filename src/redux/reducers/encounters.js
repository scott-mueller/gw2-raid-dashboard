import {
    CLEAR_ENCOUNTERS_LIST,
    FETCH_ENCOUNTERS_BY_ACCOUNT_NAME,
    FETCH_ENCOUNTERS_BY_ACCOUNT_NAME_RESPONSE,
    APPLY_ENCOUNTERS_FILTER
} from "../actions";

const initialState = {
    fetching: false,
    accountName: null,
    encounters: [],
    filteredEncounters: [],
    filters: {
        logStatus: 'all',
        logDifficulty: 'all',
        dateRange: {
            lowerBound: null,
            upperBound: null
        },
        duration: {
            min: null,
            max: null,
            hideFalseStarts: false,
            falseStartDuration: null
        },
        dps: {
            min: null,
            max: null
        },
        roles: [],
        professions: [],
        encounters: []
    }
};

const applyFilers = (encounters, filters, accountName) => {

    let filteredEncounters = encounters;

    if (filters.logStatus === 'success') {
        filteredEncounters = filteredEncounters.filter((encounter) => encounter.success === true);
    }
    else if (filters.logStatus === 'fail') {
        filteredEncounters = filteredEncounters.filter((encounter) => encounter.success === false)
    }

    if (filters.logDifficulty === 'normal') {
        filteredEncounters = filteredEncounters.filter((encounter) => !encounter.bossName.toLowerCase().includes(' cm'))
    }
    else if (filters.logDifficulty === 'cm') {
        filteredEncounters = filteredEncounters.filter((encounter) => encounter.bossName.toLowerCase().includes(' cm'))
    }

    if (filters.dps.min !== null || filters.dps.min !== 'any') {
        filteredEncounters = filteredEncounters.filter((encounter) => {
            const player = encounter.players.find((player) => player.accountName = accountName);

            if (!isNaN(filters.dps.min)) {
                return player.dmgStats.targetDPS > filters.dps.min;
            }

            if (filters.dps.min === '<1000') {
                return true;
            }

            if (filters.dpsMin === '>40000') {
                return player.dmgStats.targetDPS > 40000
            }
            
            return false;
        })
    }

    /*if (filters.dps.max !== null || filters.dps.max !== 'any') {
        filteredEncounters = filteredEncounters.filter((encounter) => {
            const player = encounter.players.find((player) => player.accountName = accountName);

            if (!isNaN(filters.dps.max)) {
                return player.dmgStats.targetDPS < filters.dps.max;
            }
            
            return false;
        })
    }*/



    return filteredEncounters;
};

const encountersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ENCOUNTERS_BY_ACCOUNT_NAME: {
            return {
                ...initialState,
                accountName: action.payload,
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
        case APPLY_ENCOUNTERS_FILTER: {
            const { filterType, filterValue } = action.payload;

            let newState = state;


            if (filterType === 'logStatus') {
                newState =  {
                    ...newState,
                    filters: {
                        ...state.filters,
                        logStatus: filterValue
                    }
                }
            }

            if (filterType === 'bossType') {
                newState = {
                    ...newState,
                    filters: {
                        ...state.filters,
                        logDifficulty: filterValue
                    }
                }
            }

            if (filterType === 'dps-lower') {
                newState = {
                    ...newState,
                    filters: {
                        ...state.filters,
                        dps: {
                            ...state.filters.dps,
                            min: filterValue
                        }
                    }
                }
            }

            if (filterType === 'dps-upper') {
                newState = {
                    ...newState,
                    filters: {
                        ...state.filters,
                        dps: {
                            ...state.filters.dps,
                            min: filterValue
                        }
                    }
                }
            }

            return {
                ...newState,
                filteredEncounters: applyFilers(newState.encounters, newState.filters, state.accountName)
            }
        }
        default:
            return state;
    }
};

export default encountersReducer;
