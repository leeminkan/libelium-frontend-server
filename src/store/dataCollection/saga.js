import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

// Login Redux States
import { GET_DATA_COLLECTION } from './actionTypes';
import { getDataCollectionError, getDataCollectionSuccess, updateState } from './actions';

import { apiDataCollections } from '../../helpers/api';

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


export function* watchGetDataCollections() {
    yield takeEvery(GET_DATA_COLLECTION, getDataCollectionFlow)
}

function* dataCollectionSaga() {
    yield all([
        fork(watchGetDataCollections),
    ]);
}

export default dataCollectionSaga;