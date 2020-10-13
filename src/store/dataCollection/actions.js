import { GET_DATA_COLLECTION, GET_DATA_COLLECTION_SUCCESS, GET_DATA_COLLECTION_ERROR } from './actionTypes';

export const getDataCollection = (history, pagination) => {
    return {
        type: GET_DATA_COLLECTION,
        payload: {history, pagination}
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
