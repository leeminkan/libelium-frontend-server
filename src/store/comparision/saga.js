import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

// Login Redux States
import { 
    GET_COMPARISION_PAGE_SETTING, 
    GET_ERROR_RATES 
} from './actionTypes';
import { 
    getComparisionPageSettingSuccess, 
    getComparisionPageSettingError,
    getErrorRatesSuccess,
    getErrorRatesError,
    getErrorRates
} from './actions';

import { 
    apiComparisionPageSetting,
    apiErrorRates
 } from '../../helpers/api';

import { handlerError } from '../../helpers/sagaUtils';

function* getComparisionPageSettingFlow({ payload: { history } }) {
    try {
        const response = yield call(apiComparisionPageSetting);
        const { waspmote_ids, waspmote_algorithm } = response.data.data;
        // Get error rates
        let waspmote_not_algorithm = waspmote_ids.find((waspmote_id) => { return waspmote_id !== waspmote_algorithm});
        yield put(getErrorRates(history, waspmote_algorithm, waspmote_not_algorithm));
        yield put(getComparisionPageSettingSuccess(response.data.data));
    } catch (error) {
        const errors = handlerError(error, history);
        yield put(getComparisionPageSettingError(errors));
    }
}

function* getErrorRatesFlow({ payload: { history, waspmote_algorithm, waspmote_not_algorithm } }) {
    try {
        const filter = {
            waspmote_algorithm: {
                value: waspmote_algorithm,
                operator: "="
            },
            waspmote_not_algorithm: {
                value: waspmote_not_algorithm,
                operator: "="
            },
        };

        const response = yield call(apiErrorRates, {}, {
            order_by: 'created_at',
            order: 'desc'
        }, filter);
        yield put(getErrorRatesSuccess(response.data.data));
    } catch (error) {
        const errors = handlerError(error, history);
        yield put(getErrorRatesError(errors));
    }
}

export function* watchGetSettings() {
    yield takeEvery(GET_COMPARISION_PAGE_SETTING, getComparisionPageSettingFlow)
}

export function* watchGetErrorRates() {
    yield takeEvery(GET_ERROR_RATES, getErrorRatesFlow)
}

function* comparisionSaga() {
    yield all([
        fork(watchGetSettings),
        fork(watchGetErrorRates),
    ]);
}

export default comparisionSaga;