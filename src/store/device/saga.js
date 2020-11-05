import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

// Login Redux States
import { GET_DEVICE } from './actionTypes';
import { getDeviceError, getDeviceSuccess, updateStateDevice } from './actions';

import { apiDevices } from '../../helpers/api';

function* getDeviceFlow({ payload: { history, meta, sort, filter } }) {
    try {
        const response = yield call(apiDevices, meta, sort, filter);
        yield put(getDeviceSuccess(response.data.data, response.data.meta));
        if (sort) {
            yield put(updateStateDevice({sort}));
        }
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
                localStorage.clear();
                history.push('/dashboard-custom');
            } else if (error.response.data.error) {
                yield put(getDeviceError(error.response.data.errors));
            }
        } else {
            yield put(getDeviceError("Some thing was wrong!"));
            console.log(error);
        }
    }
}


export function* watchGetDevices() {
    yield takeEvery(GET_DEVICE, getDeviceFlow)
}

function* deviceSaga() {
    yield all([
        fork(watchGetDevices),
    ]);
}

export default deviceSaga;