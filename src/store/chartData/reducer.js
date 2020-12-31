import { 
    GET_CHART_DATA, 
    GET_CHART_DATA_SUCCESS, 
    GET_CHART_DATA_ERROR,
    UPDATE_STATE_CHART_DATA
} from './actionTypes';

const initialState = {
    errors: null,
    loading: {
    },
    data: {
    },
}

const dataCollection = (state = initialState, action) => {
    switch (action.type) {
        case GET_CHART_DATA:
            state = {
                ...state,
                loading: {
                    ...state.loading,
                    [action.payload.waspmote_id]: {
                        ...state.loading[action.payload.waspmote_id],
                        [action.payload.sensor_key]: true
                    }
                }
            }
            break;
        case GET_CHART_DATA_SUCCESS:
            state = {
                ...state,
                loading: {
                    ...state.loading,
                    [action.payload.waspmote_id]: {
                        ...state.loading[action.payload.waspmote_id],
                        [action.payload.sensor_key]: false
                    }
                },
                data: {
                    ...state.data,
                    [action.payload.waspmote_id]: {
                        ...state.data[action.payload.waspmote_id],
                        [action.payload.sensor_key]: action.payload.data
                    }
                },
            }
            break;
        case GET_CHART_DATA_ERROR:
            state = { 
                ...state, 
                errors: action.payload,
                loading: {
                    ...state.loading,
                    [action.payload.waspmote_id]: {
                        ...state.loading[action.payload.waspmote_id],
                        [action.payload.sensor_key]: false
                    }
                }
            };
            break;
        case UPDATE_STATE_CHART_DATA:
            state = { ...state, ...action.payload };
            break;
        default:
            state = { ...state };
            break;
    }
    return state;
}

export default dataCollection;