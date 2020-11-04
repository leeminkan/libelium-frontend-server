import { GET_DEVICES, GET_DEVICES_SUCCESS, GET_DEVICES_ERROR, RESET_DASHBOARD } from './actionTypes';

export const getDevices = (history) => {
    return {
        type: GET_DEVICES,
        payload: {history}
    }
}

export const getDeviceSuccess = (data) => {
    return {
        type: GET_DEVICES_SUCCESS,
        payload: data
    }
}

export const getDeviceError = (errors) => {
    return {
        type: GET_DEVICES_ERROR,
        payload: errors
    }
}

export const resetDashboard = () => {
    return {
        type: RESET_DASHBOARD
    }
}