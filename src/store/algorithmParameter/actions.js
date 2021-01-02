import { 
    GET_ALL_ALGORITHM_PARAMETER, 
    GET_ALL_ALGORITHM_PARAMETER_SUCCESS, 
    GET_ALL_ALGORITHM_PARAMETER_ERROR,
    ADD_ALGORITHM_PARAMETER, 
    ADD_ALGORITHM_PARAMETER_SUCCESS, 
    ADD_ALGORITHM_PARAMETER_ERROR,
    GET_ALGORITHM_PARAM_PAGE_SETTING, 
    GET_ALGORITHM_PARAM_PAGE_SETTING_SUCCESS, 
    GET_ALGORITHM_PARAM_PAGE_SETTING_ERROR,
} from './actionTypes';

export const getAllAlgorithmParameter = (history) => {
    return {
        type: GET_ALL_ALGORITHM_PARAMETER,
        payload: {history}
    }
}

export const getAllAlgorithmParameterSuccess = (data) => {
    return {
        type: GET_ALL_ALGORITHM_PARAMETER_SUCCESS,
        payload: data
    }
}

export const getAllAlgorithmParameterError = (errors) => {
    return {
        type: GET_ALL_ALGORITHM_PARAMETER_ERROR,
        payload: errors
    }
}

export const addAlgorithmParameter = (history, data, waspmote_id) => {
    return {
        type: ADD_ALGORITHM_PARAMETER,
        payload: {history, data, waspmote_id}
    }
}

export const addAlgorithmParameterSuccess = (data, waspmote_id) => {
    return {
        type: ADD_ALGORITHM_PARAMETER_SUCCESS,
        payload: {data, waspmote_id}
    }
}

export const addAlgorithmParameterError = (errors, waspmote_id) => {
    return {
        type: ADD_ALGORITHM_PARAMETER_ERROR,
        payload: {errors, waspmote_id}
    }
}

export const getAlgorithmParamPageSetting = (history) => {
    return {
        type: GET_ALGORITHM_PARAM_PAGE_SETTING,
        payload: {history}
    }
}

export const getAlgorithmParamPageSettingSuccess = (data) => {
    return {
        type: GET_ALGORITHM_PARAM_PAGE_SETTING_SUCCESS,
        payload: data
    }
}

export const getAlgorithmParamPageSettingError = (errors) => {
    return {
        type: GET_ALGORITHM_PARAM_PAGE_SETTING_ERROR,
        payload: errors
    }
}