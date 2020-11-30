import { takeEvery, fork, put, all, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

// Login Redux States
import { 
    GET_SENSOR,
    ADD_SENSOR,
    DELETE_SENSOR,
 } from './actionTypes';
import { 
    getSensorError, 
    getSensorSuccess, 
    updateStateSensor,
    addSensorError,
    addSensorSuccess,
    getSensor,
    deleteSensorError,
    deleteSensorSuccess,
} from './actions';

import { 
    apiSensors,
    apiAddSensor,
    apiDeleteSensor
} from '../../helpers/api';

import { handlerError } from '../../helpers/sagaUtils';

function* getSensorFlow({ payload: { history, meta, sort, filter } }) {
    try {
        const response = yield call(apiSensors, meta, sort, filter);
        yield put(getSensorSuccess(response.data.data, response.data.meta));
        if (sort) {
            yield put(updateStateSensor({sort}));
        }
    } catch (error) {
        const errors = handlerError(error, history);
        yield put(getSensorError(errors));
    }
}

function* addSensorFlow({ payload: { history, data, additional } }) {
    try {
        yield call(apiAddSensor, data);
        toast("Add successfully !");
        yield put(addSensorSuccess());
        yield put(getSensor(history, additional.meta, additional.sort, additional.filter));
    } catch (error) {
        const errors = handlerError(error, history);
        yield put(addSensorError(errors));
    }
}

function* deleteSensorFlow({ payload: { history, id, additional } }) {
    try {
        yield call(apiDeleteSensor, id);
        toast("Delete successfully !");
        yield put(deleteSensorSuccess());
        yield put(getSensor(history, additional.meta, additional.sort, additional.filter));
    } catch (error) {
        const errors = handlerError(error, history);
        yield put(deleteSensorError(errors));
    }
}


export function* watchGetSensors() {
    yield takeEvery(GET_SENSOR, getSensorFlow)
}
export function* watchAddSensor() {
    yield takeEvery(ADD_SENSOR, addSensorFlow)
}
export function* watchDeleteSensor() {
    yield takeEvery(DELETE_SENSOR, deleteSensorFlow)
}

function* sensorSaga() {
    yield all([
        fork(watchGetSensors),
        fork(watchAddSensor),
        fork(watchDeleteSensor),
    ]);
}

export default sensorSaga;