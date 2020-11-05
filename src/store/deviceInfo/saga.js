import { takeEvery, fork, put, all, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

// Login Redux States
import { GET_DEVICE_INFO, UPDATE_DEVICE_INFO } from './actionTypes';
import { getDeviceInfoError, getDeviceInfoSuccess, updateDeviceInfoError, updateDeviceInfoSuccess } from './actions';

import { apiGetDeviceInfo, apiUpdateDeviceInfo } from '../../helpers/api';

function* getDeviceInfoFlow({ payload: { history, id } }) {
    try {
        const response = yield call(apiGetDeviceInfo, id);
        yield put(getDeviceInfoSuccess(response.data.data));
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
                localStorage.clear();
                history.push('/login');
            } else if (error.response.data.error) {
                yield put(getDeviceInfoError(error.response.data.errors));
            }
        } else {
            yield put(getDeviceInfoError("Some thing was wrong!"));
            console.log(error);
        }
    }
}

function* updateDeviceInfoFlow({ payload: { history, id, data } }) {
    try {
        const response = yield call(apiUpdateDeviceInfo, id, data);
        toast("Update successfully !");
        yield put(updateDeviceInfoSuccess(response.data.data));
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
                localStorage.clear();
                history.push('/login');
            } else if (error.response.data.error) {
                yield put(updateDeviceInfoError(error.response.data.errors));
            }
        } else {
            yield put(updateDeviceInfoError("Some thing was wrong!"));
            console.log(error);
        }
    }
}


export function* watchGetDeviceInfos() {
    yield takeEvery(GET_DEVICE_INFO, getDeviceInfoFlow)
}
export function* watchUpdateDeviceInfos() {
    yield takeEvery(GET_DEVICE_INFO, getDeviceInfoFlow)
    yield takeEvery(UPDATE_DEVICE_INFO, updateDeviceInfoFlow)
}

function* DeviceInfoSaga() {
    yield all([
        fork(watchGetDeviceInfos),
        fork(watchUpdateDeviceInfos),
    ]);
}

export default DeviceInfoSaga;