import { GET_TEMPERATURE, GET_TEMPERATURE_SUCCESS, GET_TEMPERATURE_ERROR } from './actionTypes';

export const getTemperature = (history) => {
    return {
        type: GET_TEMPERATURE,
        payload: {history}
    }
}

export const getTemperatureSuccess = (data) => {
    return {
        type: GET_TEMPERATURE_SUCCESS,
        payload: data
    }
}

export const getTemperatureError = (errors) => {
    return {
        type: GET_TEMPERATURE_ERROR,
        payload: errors
    }
}
