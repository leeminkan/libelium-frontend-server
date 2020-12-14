import { 
    GET_COMPARISION_PAGE_SETTING, 
    GET_COMPARISION_PAGE_SETTING_SUCCESS, 
    GET_COMPARISION_PAGE_SETTING_ERROR
} from './actionTypes';

export const getComparisionPageSetting = (history) => {
    return {
        type: GET_COMPARISION_PAGE_SETTING,
        payload: {history}
    }
}

export const getComparisionPageSettingSuccess = (data) => {
    return {
        type: GET_COMPARISION_PAGE_SETTING_SUCCESS,
        payload: data
    }
}

export const getComparisionPageSettingError = (errors) => {
    return {
        type: GET_COMPARISION_PAGE_SETTING_ERROR,
        payload: errors
    }
}