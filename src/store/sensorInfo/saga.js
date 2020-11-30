import { takeEvery, fork, put, all, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

// Login Redux States
import { GET_SENSOR_INFO, UPDATE_SENSOR_INFO } from './actionTypes';
import { getSensorInfoError, getSensorInfoSuccess, updateSensorInfoError, updateSensorInfoSuccess } from './actions';

import { apiGetSensorInfo, apiUpdateSensorInfo } from '../../helpers/api';

import { handlerError } from '../../helpers/sagaUtils';

function* getSensorInfoFlow({ payload: { history, id } }) {
    try {
        const response = yield call(apiGetSensorInfo, id);
        yield put(getSensorInfoSuccess(response.data.data));
    } catch (error) {
        const errors = handlerError(error, history);
        yield put(getSensorInfoError(errors));
    }
}

function* updateSensorInfoFlow({ payload: { history, id, data } }) {
    try {
        console.log(data);
        const response = yield call(apiUpdateSensorInfo, id, data);
        toast("Update successfully !");
        yield put(updateSensorInfoSuccess(response.data.data));
    } catch (error) {
        const errors = handlerError(error, history);
        yield put(updateSensorInfoError(errors));
    }
}


export function* watchGetSensorInfos() {
    yield takeEvery(GET_SENSOR_INFO, getSensorInfoFlow)
}
export function* watchUpdateSensorInfos() {
    yield takeEvery(UPDATE_SENSOR_INFO, updateSensorInfoFlow)
}

function* SensorInfoSaga() {
    yield all([
        fork(watchGetSensorInfos),
        fork(watchUpdateSensorInfos),
    ]);
}

export default SensorInfoSaga;