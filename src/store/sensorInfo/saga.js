import { takeEvery, fork, put, all, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

// Login Redux States
import { GET_SENSOR_INFO, UPDATE_SENSOR_INFO } from './actionTypes';
import { getSensorInfoError, getSensorInfoSuccess, updateSensorInfoError, updateSensorInfoSuccess } from './actions';

import { apiGetSensorInfo, apiUpdateSensorInfo } from '../../helpers/api';

function* getSensorInfoFlow({ payload: { history, id } }) {
    try {
        const response = yield call(apiGetSensorInfo, id);
        yield put(getSensorInfoSuccess(response.data.data));
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
                localStorage.clear();
                history.push('/login');
            } else if (error.response.data.error) {
                yield put(getSensorInfoError(error.response.data.errors));
            }
        } else {
            yield put(getSensorInfoError("Some thing was wrong!"));
            console.log(error);
        }
    }
}

function* updateSensorInfoFlow({ payload: { history, id, data } }) {
    try {
        console.log(data);
        const response = yield call(apiUpdateSensorInfo, id, data);
        toast("Update successfully !");
        yield put(updateSensorInfoSuccess(response.data.data));
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
                localStorage.clear();
                history.push('/login');
            } else if (error.response.data.error) {
                yield put(updateSensorInfoError(error.response.data.errors));
            }
        } else {
            yield put(updateSensorInfoError("Some thing was wrong!"));
            console.log(error);
        }
    }
}


export function* watchGetSensorInfos() {
    yield takeEvery(GET_SENSOR_INFO, getSensorInfoFlow)
}
export function* watchUpdateSensorInfos() {
    yield takeEvery(GET_SENSOR_INFO, getSensorInfoFlow)
    yield takeEvery(UPDATE_SENSOR_INFO, updateSensorInfoFlow)
}

function* SensorInfoSaga() {
    yield all([
        fork(watchGetSensorInfos),
        fork(watchUpdateSensorInfos),
    ]);
}

export default SensorInfoSaga;