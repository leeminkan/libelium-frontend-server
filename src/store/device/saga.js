import { takeEvery, fork, put, all, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

// Login Redux States
import { 
    GET_DEVICE,
    GET_ALL_SENSOR_FOR_DEVICE_PAGE,
    ADD_DEVICE,
    DELETE_DEVICE
} from './actionTypes';
import { 
    getDevice,
    getDeviceError, 
    getDeviceSuccess, 
    updateStateDevice,
    getAllSensorForDevicePageSuccess,
    getAllSensorForDevicePageError,
    addDeviceError,
    addDeviceSuccess,
    deleteDeviceError,
    deleteDeviceSuccess,
} from './actions';

import { 
    apiDevices,
    apiGetAllSensor,
    apiAddDevice,
    apiDeleteDevice
} from '../../helpers/api';

import { handlerError } from '../../helpers/sagaUtils';

function* getDeviceFlow({ payload: { history, meta, sort, filter } }) {
    try {
        const response = yield call(apiDevices, meta, sort, filter);
        yield put(getDeviceSuccess(response.data.data, response.data.meta));
        if (sort) {
            yield put(updateStateDevice({sort}));
        }
    } catch (error) {
        const errors = handlerError(error, history);
        yield put(getDeviceError(errors));
    }
}

function* getAllSensorForDevicePageFlow({ payload: { history } }) {
    try {
        const response = yield call(apiGetAllSensor);
        yield put(getAllSensorForDevicePageSuccess(response.data.data));
    } catch (error) {
        const errors = handlerError(error, history);
        yield put(getAllSensorForDevicePageError(errors));
    }
}

function* addDeviceFlow({ payload: { history, data, additional } }) {
    try {
        yield call(apiAddDevice, data);
        toast("Add successfully !");
        yield put(addDeviceSuccess());
        yield put(getDevice(history, additional.meta, additional.sort, additional.filter));
    } catch (error) {
        const errors = handlerError(error, history);
        yield put(addDeviceError(errors));
    }
}

function* deleteDeviceFlow({ payload: { history, id, additional } }) {
    try {
        yield call(apiDeleteDevice, id);
        toast("Delete successfully !");
        yield put(deleteDeviceSuccess());
        yield put(getDevice(history, additional.meta, additional.sort, additional.filter));
    } catch (error) {
        const errors = handlerError(error, history);
        yield put(deleteDeviceError(errors));
    }
}


export function* watchGetDevices() {
    yield takeEvery(GET_DEVICE, getDeviceFlow)
}
export function* watchGetAllSensorForDevicePage() {
    yield takeEvery(GET_ALL_SENSOR_FOR_DEVICE_PAGE, getAllSensorForDevicePageFlow)
}
export function* watchAddDevice() {
    yield takeEvery(ADD_DEVICE, addDeviceFlow)
}
export function* watchDeleteDevice() {
    yield takeEvery(DELETE_DEVICE, deleteDeviceFlow)
}

function* deviceSaga() {
    yield all([
        fork(watchGetDevices),
        fork(watchGetAllSensorForDevicePage),
        fork(watchAddDevice),
        fork(watchDeleteDevice),
    ]);
}

export default deviceSaga;