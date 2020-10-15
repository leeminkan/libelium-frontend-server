import { GET_DATA_COLLECTION, GET_DATA_COLLECTION_SUCCESS, 
    GET_DATA_COLLECTION_ERROR,
    UPDATE_STATE
 } from './actionTypes';

export const getDataCollection = (history, meta, sort) => {
    return {
        type: GET_DATA_COLLECTION,
        payload: {history, meta, sort}
    }
}

export const getDataCollectionSuccess = (data, meta) => {
    return {
        type: GET_DATA_COLLECTION_SUCCESS,
        payload: {
            data,
            meta
        }
    }
}

export const getDataCollectionError = (errors) => {
    return {
        type: GET_DATA_COLLECTION_ERROR,
        payload: errors
    }
}

export const updateState = (state) => {
    return {
        type: UPDATE_STATE,
        payload: state
    }
}
