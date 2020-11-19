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

export const addSensor = (history, data, additional) => {
    return {
        type: ADD_SENSOR,
        payload: {history, data, additional}
    }
}

export const addSensorSuccess = () => {
    return {
        type: ADD_SENSOR_SUCCESS
    }
}

export const addSensorError = (errors) => {
    return {
        type: ADD_SENSOR_ERROR,
        payload: errors
    }
}

export const deleteSensor = (history, id, additional) => {
    return {
        type: DELETE_SENSOR,
        payload: {history, id, additional}
    }
}

export const deleteSensorSuccess = () => {
    return {
        type: DELETE_SENSOR_SUCCESS
    }
}

export const deleteSensorError = (errors) => {
    return {
        type: DELETE_SENSOR_ERROR,
        payload: errors
    }
}