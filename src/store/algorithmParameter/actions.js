import { 
    GET_ALL_ALGORITHM_PARAMETER, 
    GET_ALL_ALGORITHM_PARAMETER_SUCCESS, 
    GET_ALL_ALGORITHM_PARAMETER_ERROR
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