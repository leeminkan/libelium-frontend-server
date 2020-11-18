import { GET_SENSOR, GET_SENSOR_SUCCESS, 
    GET_SENSOR_ERROR,
    UPDATE_STATE_SENSOR
 } from './actionTypes';

export const getSensor = (history, meta, sort, filter) => {
    return {
        type: GET_SENSOR,
        payload: {history, meta, sort, filter}
    }
}

export const getSensorSuccess = (data, meta) => {
    return {
        type: GET_SENSOR_SUCCESS,
        payload: {
            data,
            meta
        }
    }
}

export const getSensorError = (errors) => {
    return {
        type: GET_SENSOR_ERROR,
        payload: errors
    }
}

export const updateStateSensor = (state) => {
    return {
        type: UPDATE_STATE_SENSOR,
        payload: state
    }
}
