import { 
    GET_DEVICE, 
    GET_DEVICE_SUCCESS, 
    GET_DEVICE_ERROR,
    UPDATE_STATE_DEVICE,
    GET_ALL_SENSOR_FOR_DEVICE_PAGE, 
    GET_ALL_SENSOR_FOR_DEVICE_PAGE_SUCCESS, 
    GET_ALL_SENSOR_FOR_DEVICE_PAGE_ERROR,
    ADD_DEVICE, 
    ADD_DEVICE_SUCCESS, 
    ADD_DEVICE_ERROR, 
    DELETE_DEVICE, 
    DELETE_DEVICE_SUCCESS, 
    DELETE_DEVICE_ERROR, 
 } from './actionTypes';

export const getDevice = (history, meta, sort, filter) => {
    return {
        type: GET_DEVICE,
        payload: {history, meta, sort, filter}
    }
}

export const getDeviceSuccess = (data, meta) => {
    return {
        type: GET_DEVICE_SUCCESS,
        payload: {
            data,
            meta
        }
    }
}

export const getDeviceError = (errors) => {
    return {
        type: GET_DEVICE_ERROR,
        payload: errors
    }
}

export const updateStateDevice = (state) => {
    return {
        type: UPDATE_STATE_DEVICE,
        payload: state
    }
}

export const getAllSensorForDevicePage = (history) => {
    return {
        type: GET_ALL_SENSOR_FOR_DEVICE_PAGE,
        payload: {history}
    }
}

export const getAllSensorForDevicePageSuccess = (data) => {
    return {
        type: GET_ALL_SENSOR_FOR_DEVICE_PAGE_SUCCESS,
        payload: data
    }
}

export const getAllSensorForDevicePageError = (errors) => {
    return {
        type: GET_ALL_SENSOR_FOR_DEVICE_PAGE_ERROR,
        payload: errors
    }
}

export const addDevice = (history, data, additional) => {
    return {
        type: ADD_DEVICE,
        payload: {history, data, additional}
    }
}

export const addDeviceSuccess = () => {
    return {
        type: ADD_DEVICE_SUCCESS
    }
}

export const addDeviceError = (errors) => {
    return {
        type: ADD_DEVICE_ERROR,
        payload: errors
    }
}

export const deleteDevice = (history, id, additional) => {
    return {
        type: DELETE_DEVICE,
        payload: {history, id, additional}
    }
}

export const deleteDeviceSuccess = () => {
    return {
        type: DELETE_DEVICE_SUCCESS
    }
}

export const deleteDeviceError = (errors) => {
    return {
        type: DELETE_DEVICE_ERROR,
        payload: errors
    }
}