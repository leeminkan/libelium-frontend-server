import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

// Login Redux States
import { GET_DISPLAYED_DEVICES } from './actionTypes';
import { getDisplayedDevicesError, getDisplayedDevicesSuccess } from './actions';

import { apiGetDisplayedDevices } from '../../helpers/api';

import { handlerError } from '../../helpers/sagaUtils';

function* getDisplayedDevicesFlow({ payload: { history } }) {
    try {
        const response = yield call(apiGetDisplayedDevices);
        yield put(getDisplayedDevicesSuccess(response.data.data));
    } catch (error) {
        const errors = handlerError(error, history);
        yield put(getDisplayedDevicesError(errors));
    }
}


export function* watchGetDisplayedDevices() {
    yield takeEvery(GET_DISPLAYED_DEVICES, getDisplayedDevicesFlow)
}

function* dashboardSaga() {
    yield all([
        fork(watchGetDisplayedDevices),
    ]);
}

export default dashboardSaga;