import { 
    GET_COMPARISION_PAGE_SETTING, 
    GET_COMPARISION_PAGE_SETTING_SUCCESS, 
    GET_COMPARISION_PAGE_SETTING_ERROR, 
    GET_ERROR_RATES, 
    GET_ERROR_RATES_SUCCESS, 
    GET_ERROR_RATES_ERROR, 
    UPDATE_STATE_COMPARISION_PAGE
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

export const getErrorRates = (history, waspmote_algorithm, waspmote_not_algorithm) => {
    return {
        type: GET_ERROR_RATES,
        payload: {history, waspmote_algorithm, waspmote_not_algorithm}
    }
}

export const getErrorRatesSuccess = (data) => {
    return {
        type: GET_ERROR_RATES_SUCCESS,
        payload: data
    }
}

export const getErrorRatesError = (errors) => {
    return {
        type: GET_ERROR_RATES_ERROR,
        payload: errors
    }
}

export const updateStateComparisionPage = (state) => {
    return {
        type: UPDATE_STATE_COMPARISION_PAGE,
        payload: state
    }
}