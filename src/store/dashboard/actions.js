import { GET_DISPLAYED_DEVICES, GET_DISPLAYED_DEVICES_SUCCESS, GET_DISPLAYED_DEVICES_ERROR, RESET_DASHBOARD } from './actionTypes';

export const getDisplayedDevices = (history) => {
    return {
        type: GET_DISPLAYED_DEVICES,
        payload: {history}
    }
}

export const getDisplayedDevicesSuccess = (data) => {
    return {
        type: GET_DISPLAYED_DEVICES_SUCCESS,
        payload: data
    }
}

export const getDisplayedDevicesError = (errors) => {
    return {
        type: GET_DISPLAYED_DEVICES_ERROR,
        payload: errors
    }
}

export const resetDashboard = () => {
    return {
        type: RESET_DASHBOARD
    }
}