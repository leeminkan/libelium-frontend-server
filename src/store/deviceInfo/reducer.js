import {
    GET_DEVICE_INFO, 
    GET_DEVICE_INFO_SUCCESS, 
    GET_DEVICE_INFO_ERROR, 
    UPDATE_DEVICE_INFO, 
    UPDATE_DEVICE_INFO_SUCCESS, 
    UPDATE_DEVICE_INFO_ERROR,
    UPDATE_STATE_DEVICE_INFO,
    GET_ALL_SENSOR,
    GET_ALL_SENSOR_SUCCESS,
    GET_ALL_SENSOR_ERROR
} from './actionTypes';

const initialState = {
    errors: null,
    loading: {
        GET_DEVICE_INFO: false,
        UPDATE_DEVICE_INFO: false
    },
    sensors: [],
    data: {
        "name": '...'
    },
    file: null,
    selectedSensors: []
}

const deviceInfo = (state = initialState, action) => {
    switch (action.type) {
        case GET_DEVICE_INFO:
            state = {
                ...state,
                loading: {
                    ...state.loading,
                    GET_DEVICE_INFO: true
                }
            }
            break;
        case UPDATE_DEVICE_INFO:
            state = {
                ...state,
                loading: {
                    ...state.loading,
                    UPDATE_DEVICE_INFO: true
                }
            }
            break;
        case GET_ALL_SENSOR:
            state = {
                ...state,
                loading: {
                    ...state.loading,
                    GET_ALL_SENSOR: true
                }
            }
            break;
        case GET_DEVICE_INFO_SUCCESS:
            let selectedSensors = action.payload.sensors.map(({ id }) => id);
            state = {
                ...state,
                loading: {
                    ...state.loading,
                    GET_DEVICE_INFO: false
                },
                data: action.payload,
                selectedSensors
            }
            break;
        case UPDATE_DEVICE_INFO_SUCCESS:
            state = {
                ...state,
                loading: {
                    ...state.loading,
                    UPDATE_DEVICE_INFO: false
                },
                data: action.payload,
            }
            break;
        case GET_ALL_SENSOR_SUCCESS:
            state = {
                ...state,
                loading: {
                    ...state.loading,
                    GET_ALL_SENSOR: false
                },
                sensors: action.payload,
            }
            break;
        case GET_DEVICE_INFO_ERROR:
            state = { 
                ...state, 
                errors: action.payload,
                loading: {
                    ...state.loading,
                    GET_DEVICE_INFO: false
                }
            };
            break;
        case UPDATE_DEVICE_INFO_ERROR:
            state = { 
                ...state, 
                errors: action.payload,
                loading: {
                    ...state.loading,
                    UPDATE_DEVICE_INFO: false
                }
            };
            break;
        case GET_ALL_SENSOR_ERROR:
            state = { 
                ...state, 
                errors: action.payload,
                loading: {
                    ...state.loading,
                    GET_ALL_SENSOR: false
                }
            };
            break;
        case UPDATE_STATE_DEVICE_INFO:
            state = { ...state, ...action.payload };
            break;
        default:
            state = { ...state };
            break;
    }
    return state;
}

export default deviceInfo;