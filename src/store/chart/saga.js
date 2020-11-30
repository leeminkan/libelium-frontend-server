import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

// Login Redux States
import { GET_TEMPERATURE } from './actionTypes';
import { getTemperatureError, getTemperatureSuccess } from './actions';

import { apiGetTemperature } from '../../helpers/api';

import { handlerError } from '../../helpers/sagaUtils';

function* GetTemperatureFlow({ payload: { history } }) {
    try {
        const response = yield call(apiGetTemperature);
        yield put(getTemperatureSuccess(response.data.data, response.data.meta));
    } catch (error) {
        const errors = handlerError(error, history);
        yield put(getTemperatureError(errors));
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