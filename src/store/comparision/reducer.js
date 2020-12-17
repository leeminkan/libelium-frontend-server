import { 
    GET_COMPARISION_PAGE_SETTING, 
    GET_COMPARISION_PAGE_SETTING_SUCCESS, 
    GET_COMPARISION_PAGE_SETTING_ERROR,
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
    }
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
        default:
            state = { ...state };
            break;
    }
    return state;
}

export default comparision;