import { GET_SENSOR, GET_SENSOR_SUCCESS, 
    GET_SENSOR_ERROR,
    UPDATE_STATE_SENSOR,
    ADD_SENSOR, 
    ADD_SENSOR_SUCCESS, 
    ADD_SENSOR_ERROR,
    DELETE_SENSOR, 
    DELETE_SENSOR_SUCCESS, 
    DELETE_SENSOR_ERROR,
} from './actionTypes';

const initialState = {
    errors: null,
    loading: {
        GET_SENSOR: false,
        ADD_SENSOR: false,
        DELETE_SENSOR: false
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
    showAddFilterModal: false,
    showAddSensorModal: false,
    showDeleteSensorModal: false,
    sensorIdToDelete: 0,
    addPayload: {}
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
        case ADD_SENSOR:
                state = {
                    ...state,
                    loading: {
                        ...state.loading,
                        ADD_SENSOR: true
                    }
                }
                break;
        case ADD_SENSOR_SUCCESS:
                state = {
                    ...state,
                    loading: {
                        ...state.loading,
                        ADD_SENSOR: false
                    },
                    addPayload: {},
                    showAddSensorModal: false,
                }
                break;
        case ADD_SENSOR_ERROR:
                state = { 
                    ...state, 
                    errors: action.payload,
                    loading: {
                        ...state.loading,
                        ADD_SENSOR: false
                    },
                    addPayload: {},
                    showAddSensorModal: false,
                };
                break;
        case DELETE_SENSOR:
                state = {
                    ...state,
                    loading: {
                        ...state.loading,
                        DELETE_SENSOR: true
                    }
                }
                break;
        case DELETE_SENSOR_SUCCESS:
                state = {
                    ...state,
                    loading: {
                        ...state.loading,
                        DELETE_SENSOR: false
                    },
                    showDeleteSensorModal: false,
                    sensorIdToDelete: 0
                }
                break;
        case DELETE_SENSOR_ERROR:
                state = { 
                    ...state, 
                    errors: action.payload,
                    loading: {
                        ...state.loading,
                        DELETE_SENSOR: false
                    },
                    showDeleteSensorModal: false,
                    sensorIdToDelete: 0
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