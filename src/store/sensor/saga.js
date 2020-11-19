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

function* getSensorFlow({ payload: { history, meta, sort, filter } }) {
    try {
        const response = yield call(apiSensors, meta, sort, filter);
        yield put(getSensorSuccess(response.data.data, response.data.meta));
        if (sort) {
            yield put(updateStateSensor({sort}));
        }
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
                localStorage.clear();
                history.push('/dashboard-custom');
            } else if (error.response.data.error) {
                yield put(getSensorError(error.response.data.errors));
            }
        } else {
            yield put(getSensorError("Some thing was wrong!"));
            console.log(error);
        }
    }
}

function* addSensorFlow({ payload: { history, data, additional } }) {
    try {
        yield call(apiAddSensor, data);
        toast("Add successfully !");
        yield put(addSensorSuccess());
        yield put(getSensor(history, additional.meta, additional.sort, additional.filter));
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
                localStorage.clear();
                history.push('/login');
            } else if (error.response.data.error) {
                yield put(addSensorError(error.response.data.errors));
            }
        } else {
            yield put(addSensorError("Some thing was wrong!"));
            console.log(error);
        }
    }
}

function* deleteSensorFlow({ payload: { history, id, additional } }) {
    try {
        yield call(apiDeleteSensor, id);
        toast("Delete successfully !");
        yield put(deleteSensorSuccess());
        yield put(getSensor(history, additional.meta, additional.sort, additional.filter));
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
                localStorage.clear();
                history.push('/login');
            } else if (error.response.data.error) {
                yield put(deleteSensorError(error.response.data.errors));
            }
        } else {
            yield put(deleteSensorError("Some thing was wrong!"));
            console.log(error);
        }
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