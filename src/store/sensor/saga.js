import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

// Login Redux States
import { GET_SENSOR } from './actionTypes';
import { getSensorError, getSensorSuccess, updateStateSensor } from './actions';

import { apiSensors } from '../../helpers/api';

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


export function* watchGetSensors() {
    yield takeEvery(GET_SENSOR, getSensorFlow)
}

function* sensorSaga() {
    yield all([
        fork(watchGetSensors),
    ]);
}

export default sensorSaga;