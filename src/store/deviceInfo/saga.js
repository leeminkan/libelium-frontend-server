import { takeEvery, fork, put, all, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

// Login Redux States
import {
    GET_DEVICE_INFO,
    UPDATE_DEVICE_INFO,
    GET_ALL_SENSOR
} from './actionTypes';
import {
    getDeviceInfoError,
    getDeviceInfoSuccess,
    updateDeviceInfoError,
    updateDeviceInfoSuccess,
    getAllSensorSuccess,
    getAllSensorError
} from './actions';

import { 
    apiGetDeviceInfo, 
    apiUpdateDeviceInfo, 
    apiGetAllSensor 
} from '../../helpers/api';

import { handlerError } from '../../helpers/sagaUtils';

function* getDeviceInfoFlow({ payload: { history, id } }) {
    try {
        const response = yield call(apiGetDeviceInfo, id);
        yield put(getDeviceInfoSuccess(response.data.data));
    } catch (error) {
        const errors = handlerError(error, history);
        yield put(getDeviceInfoError(errors));
    }
}

function* getAllSensorFlow({ payload: { history } }) {
    try {
        const response = yield call(apiGetAllSensor);
        yield put(getAllSensorSuccess(response.data.data));
    } catch (error) {
        const errors = handlerError(error, history);
        yield put(getAllSensorError(errors));
    }
}

function* updateDeviceInfoFlow({ payload: { history, id, data } }) {
    try {
        const response = yield call(apiUpdateDeviceInfo, id, data);
        toast("Update successfully !");
        yield put(updateDeviceInfoSuccess(response.data.data));
    } catch (error) {
        const errors = handlerError(error, history);
        yield put(updateDeviceInfoError(errors));
    }
}


export function* watchGetDeviceInfos() {
    yield takeEvery(GET_DEVICE_INFO, getDeviceInfoFlow)
}

export function* watchUpdateDeviceInfos() {
    yield takeEvery(UPDATE_DEVICE_INFO, updateDeviceInfoFlow)
}
export function* watchGetAllSensor() {
    yield takeEvery(GET_ALL_SENSOR, getAllSensorFlow)
}

function* DeviceInfoSaga() {
    yield all([
        fork(watchGetDeviceInfos),
        fork(watchUpdateDeviceInfos),
        fork(watchGetAllSensor),
    ]);
}

export default DeviceInfoSaga;