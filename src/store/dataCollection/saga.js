import { takeEvery, fork, put, all, call } from 'redux-saga/effects';
import { saveAs } from 'file-saver'

// Login Redux States
import { 
    GET_DATA_COLLECTION,
    EXPORT_DATA_COLLECTION
 } from './actionTypes';
import { getDataCollectionError, getDataCollectionSuccess, updateState, exportDataCollectionSuccess, exportDataCollectionError } from './actions';

import { apiDataCollections, apiExportDataCollections } from '../../helpers/api';

import { handlerError } from '../../helpers/sagaUtils';

function* getDataCollectionFlow({ payload: { history, meta, sort, filter } }) {
    try {
        const response = yield call(apiDataCollections, meta, sort, filter);
        yield put(getDataCollectionSuccess(response.data.data, response.data.meta));
        if (sort) {
            yield put(updateState({sort}));
        }
    } catch (error) {
        const errors = handlerError(error, history);
        yield put(getDataCollectionError(errors));
    }
}

function* exportDataCollectionFlow({ payload: { history, meta, sort, filter, type } }) {
    try {
        const response = yield call(apiExportDataCollections, meta, sort, filter, type);
        saveAs(response.data, 'file.' + type);
        yield put(exportDataCollectionSuccess());
    } catch (error) {
        const errors = handlerError(error, history);
        yield put(exportDataCollectionError(errors));
    }
}


export function* watchGetDataCollections() {
    yield takeEvery(GET_DATA_COLLECTION, getDataCollectionFlow)
}

export function* watchExportDataCollections() {
    yield takeEvery(EXPORT_DATA_COLLECTION, exportDataCollectionFlow)
}

function* dataCollectionSaga() {
    yield all([
        fork(watchGetDataCollections),
        fork(watchExportDataCollections),
    ]);
}

export default dataCollectionSaga;