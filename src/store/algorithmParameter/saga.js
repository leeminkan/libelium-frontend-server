import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

// Login Redux States
import {
    GET_ALL_ALGORITHM_PARAMETER, 
    ADD_ALGORITHM_PARAMETER,
    GET_ALGORITHM_PARAM_PAGE_SETTING 
} from './actionTypes';
import { 
    getAllAlgorithmParameterSuccess, 
    getAllAlgorithmParameterError,
    addAlgorithmParameterSuccess, 
    addAlgorithmParameterError,
    getAlgorithmParamPageSettingSuccess,
    getAlgorithmParamPageSettingError,
} from './actions';

import { 
    apiGetAllAlgorithmParameter, 
    apiAddAlgorithmParameter,
    apiAlgorithmParamPageSetting,
} from '../../helpers/api';
import { handlerError } from '../../helpers/sagaUtils';

function* getAllAlgorithmParameterFlow({ payload: { history } }) {
    try {
        const response = yield call(apiGetAllAlgorithmParameter);
        yield put(getAllAlgorithmParameterSuccess(response.data.data));
    } catch (error) {
        const errors = handlerError(error, history);
        yield put(getAllAlgorithmParameterError(errors));
    }
}

function* addAlgorithmParameterFlow({ payload: { history, data, waspmote_id } }) {
    try {
        const response = yield call(apiAddAlgorithmParameter, data);
        yield put(addAlgorithmParameterSuccess(response.data.data, waspmote_id));
    } catch (error) {
        const errors = handlerError(error, history);
        yield put(addAlgorithmParameterError(errors, waspmote_id));
    }
}

function* getAlgorithmParamPageSettingFlow({ payload: { history } }) {
    try {
        const response = yield call(apiAlgorithmParamPageSetting);
        yield put(getAlgorithmParamPageSettingSuccess(response.data.data));
    } catch (error) {
        const errors = handlerError(error, history);
        yield put(getAlgorithmParamPageSettingError(errors));
    }
}

export function* watchGetAllAlgorithmParameter() {
    yield takeEvery(GET_ALL_ALGORITHM_PARAMETER, getAllAlgorithmParameterFlow)
}

export function* watchAddAlgorithmParameter() {
    yield takeEvery(ADD_ALGORITHM_PARAMETER, addAlgorithmParameterFlow)
}

export function* watchGetAlgorithmParamPageSetting() {
    yield takeEvery(GET_ALGORITHM_PARAM_PAGE_SETTING, getAlgorithmParamPageSettingFlow)
}

function* algorithmParameterSaga() {
    yield all([
        fork(watchGetAllAlgorithmParameter),
        fork(watchAddAlgorithmParameter),
        fork(watchGetAlgorithmParamPageSetting),
    ]);
}

export default algorithmParameterSaga;