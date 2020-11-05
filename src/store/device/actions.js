import { GET_DEVICE, GET_DEVICE_SUCCESS, 
    GET_DEVICE_ERROR,
    UPDATE_STATE_DEVICE
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
