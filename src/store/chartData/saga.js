import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

// Login Redux States
import { 
    GET_CHART_DATA,
 } from './actionTypes';
import { getChartDataError, getChartDataSuccess } from './actions';

import { apiDataCollections } from '../../helpers/api';

import { handlerError } from '../../helpers/sagaUtils';

function* getChartDataFlow({ payload: { history, waspmote_id, sensor_key } }) {
    try {
        const response = yield call(apiDataCollections, {
            per_page: 10
        }, {
            order_by: 'created_at',
            order: 'asc'
        }, {
            waspmote_id: {
                column: 'Waspmote ID',
                value: waspmote_id
            },
            sensor_key: {
                column: 'Sensor Key',
                value: sensor_key
            }
        });
        yield put(getChartDataSuccess(waspmote_id, sensor_key, response.data.data));
    } catch (error) {
        const errors = handlerError(error, history);
        yield put(getChartDataError(errors));
    }
}

export function* watchGetDataCollections() {
    yield takeEvery(GET_CHART_DATA, getChartDataFlow)
}

function* dataCollectionSaga() {
    yield all([
        fork(watchGetDataCollections),
    ]);
}

export default dataCollectionSaga;