import { GET_SETTING, GET_SETTING_SUCCESS, GET_SETTING_ERROR } from './actionTypes';

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
