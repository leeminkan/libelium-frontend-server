import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

// Login Redux States
import { GET_DATA_COLLECTION } from './actionTypes';
import { getDataCollectionError, getDataCollectionSuccess, updateState } from './actions';

import { apiDataCollections } from '../../helpers/api';

function* getDataCollectionFlow({ payload: { history, meta, sort } }) {
    try {
        const response = yield call(apiDataCollections, meta, sort);
        yield put(getDataCollectionSuccess(response.data.data, response.data.meta));
        if (sort) {
            yield put(updateState({sort}));
        }
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
                localStorage.clear();
                history.push('/dashboard-custom');
            } else if (error.response.data.error) {
                yield put(getDataCollectionError(error.response.data.errors));
            }
        } else {
            yield put(getDataCollectionError("Some thing was wrong!"));
            console.log(error);
        }
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