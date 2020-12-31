import { 
    GET_CHART_DATA, 
    GET_CHART_DATA_SUCCESS, 
    GET_CHART_DATA_ERROR, 
    UPDATE_STATE_CHART_DATA
 } from './actionTypes';

export const getChartData = (history, waspmote_id, sensor_key, limit, sort, algorithm_parameter_id = null) => {
    return {
        type: GET_CHART_DATA,
        payload: {history, waspmote_id, sensor_key, limit, sort, algorithm_parameter_id}
    }
}

export const getChartDataSuccess = (waspmote_id, sensor_key, data) => {
    return {
        type: GET_CHART_DATA_SUCCESS,
        payload: {waspmote_id, sensor_key, data}
    }
}

export const getChartDataError = (errors) => {
    return {
        type: GET_CHART_DATA_ERROR,
        payload: errors
    }
}
export const updateStateChartData = (state) => {
    return {
        type: UPDATE_STATE_CHART_DATA,
        payload: state
    }
}