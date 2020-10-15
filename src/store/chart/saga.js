import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

// Login Redux States
import { GET_TEMPERATURE } from './actionTypes';
import { getTemperatureError, getTemperatureSuccess } from './actions';

import { apiGetTemperature } from '../../helpers/api';

function* GetTemperatureFlow({ payload: { history } }) {
    try {
        const response = yield call(apiGetTemperature);
        yield put(getTemperatureSuccess(response.data.data, response.data.meta));
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
                localStorage.clear();
                history.push('/dashboard-custom');
            } else if (error.response.data.error) {
                yield put(getTemperatureError(error.response.data.errors));
            }
        } else {
            yield put(getTemperatureError("Some thing was wrong!"));
            console.log(error);
        }
    }
}


export function* watchGetTemperatures() {
    yield takeEvery(GET_TEMPERATURE, GetTemperatureFlow)
}

function* dataCollectionSaga() {
    yield all([
        fork(watchGetTemperatures),
    ]);
}

export default dataCollectionSaga;