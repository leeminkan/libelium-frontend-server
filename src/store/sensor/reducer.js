import { GET_SENSOR, GET_SENSOR_SUCCESS, 
    GET_SENSOR_ERROR,
    UPDATE_STATE_SENSOR
} from './actionTypes';

const initialState = {
    errors: null,
    loading: {
        GET_SENSOR: false
    },
    data: [],
    meta: {
        per_page: 5
    },
    sort: {
        order_by: 'created_at',
        order: 'desc'
    },
    filter: {
    },
    change: 1,
    showAddFilterModal: false
}

const dataCollection = (state = initialState, action) => {
    switch (action.type) {
        case GET_SENSOR:
            state = {
                ...state,
                loading: {
                    ...state.loading,
                    GET_SENSOR: true
                }
            }
            break;
        case GET_SENSOR_SUCCESS:
            state = {
                ...state,
                loading: {
                    ...state.loading,
                    GET_SENSOR: false
                },
                data: action.payload.data,
                meta: action.payload.meta,
            }
            break;
        case GET_SENSOR_ERROR:
            state = { 
                ...state, 
                errors: action.payload,
                loading: {
                    ...state.loading,
                    GET_SENSOR: false
                }
            };
            break;
        case UPDATE_STATE_SENSOR:
            state = { ...state, ...action.payload };
            break;
        default:
            state = { ...state };
            break;
    }
    return state;
}

export default dataCollection;