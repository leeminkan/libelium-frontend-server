import { takeEvery, fork, put, all, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

// Login Redux States
import { GET_SETTING, UPDATE_SETTING } from './actionTypes';
import { getSettingError, getSettingSuccess, updateSettingError, updateSettingSuccess } from './actions';

import { apiSetting, apiUpdateSetting } from '../../helpers/api';

function* getSettingFlow({ payload: { history } }) {
    try {
        const response = yield call(apiSetting);
        yield put(getSettingSuccess(response.data.data));
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
                localStorage.clear();
                history.push('/login');
            } else if (error.response.data.error) {
                yield put(getSettingError(error.response.data.errors));
            }
        } else {
            yield put(getSettingError("Some thing was wrong!"));
            console.log(error);
        }
    }
}

function* updateSettingFlow({ payload: { history, data } }) {
    try {
        const response = yield call(apiUpdateSetting, data);
        toast("Save successfully !");
        yield put(updateSettingSuccess(response.data.data));
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
                localStorage.clear();
                history.push('/login');
            } else if (error.response.data.error) {
                yield put(updateSettingError(error.response.data.errors));
            }
        } else {
            yield put(updateSettingError("Some thing was wrong!"));
            console.log(error);
        }
    }
}


export function* watchGetSettings() {
    yield takeEvery(GET_SETTING, getSettingFlow)
}
export function* watchUpdateSettings() {
    yield takeEvery(GET_SETTING, getSettingFlow)
    yield takeEvery(UPDATE_SETTING, updateSettingFlow)
}

function* settingSaga() {
    yield all([
        fork(watchGetSettings),
        fork(watchUpdateSettings),
    ]);
}

export default settingSaga;