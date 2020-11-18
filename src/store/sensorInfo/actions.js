import { GET_SENSOR_INFO, GET_SENSOR_INFO_SUCCESS, GET_SENSOR_INFO_ERROR, UPDATE_SENSOR_INFO, UPDATE_SENSOR_INFO_SUCCESS, UPDATE_SENSOR_INFO_ERROR, UPDATE_STATE_SENSOR_INFO } from './actionTypes';

export const getSensorInfo = (history, id) => {
    return {
        type: GET_SENSOR_INFO,
        payload: {history, id}
    }
}

export const getSensorInfoSuccess = (data) => {
    return {
        type: GET_SENSOR_INFO_SUCCESS,
        payload: data
    }
}

export const getSensorInfoError = (errors) => {
    return {
        type: GET_SENSOR_INFO_ERROR,
        payload: errors
    }
}

export const updateSensorInfo = (history, id, data) => {
    return {
        type: UPDATE_SENSOR_INFO,
        payload: {history, id, data}
    }
}

export const updateSensorInfoSuccess = (data) => {
    return {
        type: UPDATE_SENSOR_INFO_SUCCESS,
        payload: data
    }
}

export const updateSensorInfoError = (errors) => {
    return {
        type: UPDATE_SENSOR_INFO_ERROR,
        payload: errors
    }
}

export const updateStateSensorInfo = (state) => {
    return {
        type: UPDATE_STATE_SENSOR_INFO,
        payload: state
    }
}