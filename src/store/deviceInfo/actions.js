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

export const getDeviceInfo = (history, id) => {
    return {
        type: GET_DEVICE_INFO,
        payload: {history, id}
    }
}

export const getDeviceInfoSuccess = (data) => {
    return {
        type: GET_DEVICE_INFO_SUCCESS,
        payload: data
    }
}

export const getDeviceInfoError = (errors) => {
    return {
        type: GET_DEVICE_INFO_ERROR,
        payload: errors
    }
}

export const updateDeviceInfo = (history, id, data) => {
    return {
        type: UPDATE_DEVICE_INFO,
        payload: {history, id, data}
    }
}

export const updateDeviceInfoSuccess = (data) => {
    return {
        type: UPDATE_DEVICE_INFO_SUCCESS,
        payload: data
    }
}

export const updateDeviceInfoError = (errors) => {
    return {
        type: UPDATE_DEVICE_INFO_ERROR,
        payload: errors
    }
}

export const updateStateDeviceInfo = (state) => {
    return {
        type: UPDATE_STATE_DEVICE_INFO,
        payload: state
    }
}

export const getAllSensor = (history) => {
    return {
        type: GET_ALL_SENSOR,
        payload: {history}
    }
}

export const getAllSensorSuccess = (data) => {
    return {
        type: GET_ALL_SENSOR_SUCCESS,
        payload: data
    }
}

export const getAllSensorError = (errors) => {
    return {
        type: GET_ALL_SENSOR_ERROR,
        payload: errors
    }
}