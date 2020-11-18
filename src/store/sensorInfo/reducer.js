import { GET_SENSOR_INFO, GET_SENSOR_INFO_SUCCESS, GET_SENSOR_INFO_ERROR, UPDATE_SENSOR_INFO, UPDATE_SENSOR_INFO_SUCCESS, UPDATE_SENSOR_INFO_ERROR,
    UPDATE_STATE_SENSOR_INFO } from './actionTypes';

const initialState = {
    errors: null,
    loading: {
        GET_SENSOR_INFO: false,
        UPDATE_SENSOR_INFO: false
    },
    data: {
        
    }
}

const sensorInfo = (state = initialState, action) => {
    switch (action.type) {
        case GET_SENSOR_INFO:
            state = {
                ...state,
                loading: {
                    ...state.loading,
                    GET_SENSOR_INFO: true
                }
            }
            break;
        case UPDATE_SENSOR_INFO:
            state = {
                ...state,
                loading: {
                    ...state.loading,
                    UPDATE_SENSOR_INFO: true
                }
            }
            break;
        case GET_SENSOR_INFO_SUCCESS:
            state = {
                ...state,
                loading: {
                    ...state.loading,
                    GET_SENSOR_INFO: false
                },
                data: action.payload,
            }
            break;
        case UPDATE_SENSOR_INFO_SUCCESS:
            state = {
                ...state,
                loading: {
                    ...state.loading,
                    UPDATE_SENSOR_INFO: false
                },
                data: action.payload,
            }
            break;
        case GET_SENSOR_INFO_ERROR:
            state = { 
                ...state, 
                errors: action.payload,
                loading: {
                    ...state.loading,
                    GET_SENSOR_INFO: false
                }
            };
            break;
        case UPDATE_SENSOR_INFO_ERROR:
            state = { 
                ...state, 
                errors: action.payload,
                loading: {
                    ...state.loading,
                    UPDATE_SENSOR_INFO: false
                }
            };
            break;
        case UPDATE_STATE_SENSOR_INFO:
            state = { ...state, ...action.payload };
            break;
        default:
            state = { ...state };
            break;
    }
    return state;
}

export default sensorInfo;