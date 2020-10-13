import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

// Login Redux States
import { GET_DATA_COLLECTION } from './actionTypes';
import { getDataCollectionError, getDataCollectionSuccess } from './actions';

import { apiDataCollections } from '../../helpers/api';

function* getDataCollectionFlow({ payload: { history, pagination } }) {
    try {
        const response = yield call(apiDataCollections, pagination);
        yield put(getDataCollectionSuccess(response.data.data, response.data.meta));
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

function* dashboardSaga() {
    yield all([
        fork(watchGetDataCollections),
    ]);
}

export default dashboardSaga;