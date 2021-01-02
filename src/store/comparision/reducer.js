import { 
    GET_COMPARISION_PAGE_SETTING, 
    GET_COMPARISION_PAGE_SETTING_SUCCESS, 
    GET_COMPARISION_PAGE_SETTING_ERROR, 
    GET_ERROR_RATES, 
    GET_ERROR_RATES_SUCCESS, 
    GET_ERROR_RATES_ERROR, 
    UPDATE_STATE_COMPARISION_PAGE,
} from './actionTypes';

const initialState = {
    errors: null,
    loading: {
    },
    data: {
    },
    setting: {
        waspmote_ids: [],
        sensors: []
    },
    error_rates: []
}

const comparision = (state = initialState, action) => {
    switch (action.type) {
        case GET_COMPARISION_PAGE_SETTING:
            state = {
                ...state,
                loading: {
                    ...state.loading,
                    GET_COMPARISION_PAGE_SETTING: true
                }
            }
            break;
        case GET_COMPARISION_PAGE_SETTING_SUCCESS:
            state = {
                ...state,
                loading: {
                    ...state.loading,
                    GET_COMPARISION_PAGE_SETTING: false
                },
                setting: action.payload,
            }
            break;
        case GET_COMPARISION_PAGE_SETTING_ERROR:
            state = { 
                ...state, 
                errors: action.payload,
                loading: {
                    ...state.loading,
                    GET_COMPARISION_PAGE_SETTING: false
                }
            };
            break;
            case GET_ERROR_RATES:
                state = {
                    ...state,
                    loading: {
                        ...state.loading,
                        GET_ERROR_RATES: true
                    }
                }
                break;
            case GET_ERROR_RATES_SUCCESS:
                state = {
                    ...state,
                    loading: {
                        ...state.loading,
                        GET_ERROR_RATES: false
                    },
                    error_rates: action.payload,
                }
                break;
            case GET_ERROR_RATES_ERROR:
                state = { 
                    ...state, 
                    errors: action.payload,
                    loading: {
                        ...state.loading,
                        GET_ERROR_RATES: false
                    }
                };
                break;
        case UPDATE_STATE_COMPARISION_PAGE:
            state = { ...state, ...action.payload };
            break;
        default:
            state = { ...state };
            break;
    }
    return state;
}

export default comparision;