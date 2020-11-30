import { takeEvery, fork, put, all, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

// Login Redux States
import { GET_SETTING, UPDATE_SETTING } from './actionTypes';
import { getSettingError, getSettingSuccess, updateSettingError, updateSettingSuccess } from './actions';

import { apiSetting, apiUpdateSetting } from '../../helpers/api';
import { handlerError } from '../../helpers/sagaUtils';

function* getSettingFlow({ payload: { history } }) {
    try {
        const response = yield call(apiSetting);
        yield put(getSettingSuccess(response.data.data));
    } catch (error) {
        const errors = handlerError(error, history);
        yield put(getSettingError(errors));
    }
}

function* updateSettingFlow({ payload: { history, data } }) {
    try {
        const response = yield call(apiUpdateSetting, data);
        toast("Save successfully !");
        yield put(updateSettingSuccess(response.data.data));
    } catch (error) {
        const errors = handlerError(error, history);
        yield put(updateSettingError(errors));
    }
}


export function* watchGetSettings() {
    yield takeEvery(GET_SETTING, getSettingFlow)
}
export function* watchUpdateSettings() {
    yield takeEvery(UPDATE_SETTING, updateSettingFlow)
}

function* settingSaga() {
    yield all([
        fork(watchGetSettings),
        fork(watchUpdateSettings),
    ]);
}

export default settingSaga;