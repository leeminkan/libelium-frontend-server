import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

// Login Redux States
import { GET_DEVICES } from './actionTypes';
import { getDeviceError, getDeviceSuccess } from './actions';

import { apiGetDisplayedDevices } from '../../helpers/api';

function* getDeviceFlow({ payload: { history } }) {
    try {
        const response = yield call(apiGetDisplayedDevices);
        yield put(getDeviceSuccess(response.data.data));
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
    yield takeEvery(GET_DEVICES, getDeviceFlow)
}

function* dashboardSaga() {
    yield all([
        fork(watchGetDevices),
    ]);
}

export default dashboardSaga;