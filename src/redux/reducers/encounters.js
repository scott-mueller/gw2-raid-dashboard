import { remove, uniq } from "ramda";
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
            falseStartDuration: 20
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

    if (filters.dps.min !== null) {
        filteredEncounters = filteredEncounters.filter((encounter) => {
            const player = encounter.players.find((player) => player.accountName = accountName);

            if (!isNaN(filters.dps.min)) {
                return player.dmgStats.targetDPS > filters.dps.min;
            }

            if (filters.dpsMin === '>40000') {
                return player.dmgStats.targetDPS > 40000
            }
            
            return true;
        });
    }

    if (filters.dps.max !== null) {
        filteredEncounters = filteredEncounters.filter((encounter) => {
            const player = encounter.players.find((player) => player.accountName = accountName);

            if (!isNaN(filters.dps.max)) {
                return player.dmgStats.targetDPS < filters.dps.max;
            }
            
            return true;
        });
    }

    if (filters.duration.min !== null) {
        filteredEncounters = filteredEncounters.filter((encounter) => {

            if (!isNaN(filters.duration.min)) {
                return encounter.durationMs > filters.duration.min
            }
            
            return true;
        });
    }

    if (filters.duration.max !== null) {
        filteredEncounters = filteredEncounters.filter((encounter) => {

            if (!isNaN(filters.duration.max)) {
                return encounter.durationMs < filters.duration.max
            }
            
            return true;
        });
    }

    if (filters.duration.hideFalseStarts === true) {
        filteredEncounters = filteredEncounters.filter((encounter) => encounter.durationMs > (filters.duration.falseStartDuration * 1000));
    }

    if (filters.encounters.length > 0) {
        filteredEncounters = filteredEncounters.filter((encounter) => filters.encounters.includes(encounter.bossName));
    }

    if (filters.professions.length > 0) {
        filteredEncounters = filteredEncounters.filter((encounter) => {
            const player = encounter.players.find((player) => player.accountName = accountName);
            return filters.professions.includes(player.profession);
        })
    }

    if (filters.roles.length > 0) {
        filteredEncounters = filteredEncounters.filter((encounter) => {
            const player = encounter.players.find((player) => player.accountName = accountName);
            return filters.roles.every((role) => player.roles.includes(role));
        })
    }

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

            switch (filterType) {
                case 'logStatus': {
                    newState =  {
                        ...newState,
                        filters: {
                            ...state.filters,
                            logStatus: filterValue
                        }
                    };
                    break;
                }

                case 'bossType': {
                    newState = {
                        ...newState,
                        filters: {
                            ...state.filters,
                            logDifficulty: filterValue
                        }
                    };
                    break;
                }

                case 'duration-lower': {
                    newState = {
                        ...newState,
                        filters: {
                            ...state.filters,
                            duration: {
                                ...state.filters.duration,
                                min: filterValue
                            }
                        }
                    };
                    break;
                }

                case 'duration-upper': {
                    newState = {
                        ...newState,
                        filters: {
                            ...state.filters,
                            duration: {
                                ...state.filters.duration,
                                max: filterValue
                            }
                        }
                    };
                    break;
                }

                case 'hide-false-starts': {
                    newState = {
                        ...newState,
                        filters: {
                            ...state.filters,
                            duration: {
                                ...state.filters.duration,
                                hideFalseStarts: filterValue
                            }
                        }
                    };
                    break;
                }

                case 'false-start-duration': {
                    newState = {
                        ...newState,
                        filters: {
                            ...state.filters,
                            duration: {
                                ...state.filters.duration,
                                falseStartDuration: filterValue
                            }
                        }
                    };
                    break;
                }

                case 'dps-lower': {
                    newState = {
                        ...newState,
                        filters: {
                            ...state.filters,
                            dps: {
                                ...state.filters.dps,
                                min: filterValue
                            }
                        }
                    };
                    break;
                }

                case 'dps-upper': {
                    newState = {
                        ...newState,
                        filters: {
                            ...state.filters,
                            dps: {
                                ...state.filters.dps,
                                max: filterValue
                            }
                        }
                    };
                    break;
                }

                case 'encounter': {
                    newState = {
                        ...newState,
                        filters: {
                            ...state.filters,
                            encounters: filterValue
                                ? uniq([...state.filters.encounters, action.payload.encounterName])
                                : remove(state.filters.encounters.indexOf(action.payload.encounterName), 1, state.filters.encounters)
                        }
                    };
                    break;
                }

                case 'profession': {
                    newState = {
                        ...newState,
                        filters: {
                            ...state.filters,
                            professions: state.filters.professions.includes(filterValue)
                                ? remove(state.filters.professions.indexOf(filterValue), 1, state.filters.professions)
                                : uniq([...state.filters.professions, filterValue])
                        }
                    };
                    break;
                }

                case 'role': {
                    newState = {
                        ...newState,
                        filters: {
                            ...state.filters,
                            roles: state.filters.roles.includes(filterValue)
                                ? remove(state.filters.roles.indexOf(filterValue), 1, state.filters.roles)
                                : uniq([...state.filters.roles, filterValue])
                        }
                    };
                    break;
                }

                default: {
                    return state;
                }
            }

            return {
                ...newState,
                filteredEncounters: applyFilers(state.encounters, newState.filters, state.accountName)
            }
        }
        default:
            return state;
    }
};

export default encountersReducer;
