import { GET_SETTING, GET_SETTING_SUCCESS, GET_SETTING_ERROR, UPDATE_SETTING, UPDATE_SETTING_SUCCESS, UPDATE_SETTING_ERROR } from './actionTypes';

export const getSetting = (history) => {
    return {
        type: GET_SETTING,
        payload: {history}
    }
}

export const getSettingSuccess = (data) => {
    return {
        type: GET_SETTING_SUCCESS,
        payload: data
    }
}

export const getSettingError = (errors) => {
    return {
        type: GET_SETTING_ERROR,
        payload: errors
    }
}

export const updateSetting = (history, data) => {
    return {
        type: UPDATE_SETTING,
        payload: {history, data}
    }
}

export const updateSettingSuccess = (data) => {
    return {
        type: UPDATE_SETTING_SUCCESS,
        payload: data
    }
}

export const updateSettingError = (errors) => {
    return {
        type: UPDATE_SETTING_ERROR,
        payload: errors
    }
}
