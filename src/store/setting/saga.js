import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

// Login Redux States
import { GET_SETTING } from './actionTypes';
import { getSettingError, getSettingSuccess } from './actions';

import { apiSetting } from '../../helpers/api';

function* getSettingFlow({ payload: { history } }) {
    try {
        const response = yield call(apiSetting);
        yield put(getSettingSuccess(response.data.data));
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
                localStorage.clear();
                history.push('/dashboard-custom');
            } else if (error.response.data.error) {
                yield put(getSettingError(error.response.data.errors));
            }
        } else {
            yield put(getSettingError("Some thing was wrong!"));
            console.log(error);
        }
    }
}


export function* watchGetSettings() {
    yield takeEvery(GET_SETTING, getSettingFlow)
}

function* settingSaga() {
    yield all([
        fork(watchGetSettings),
    ]);
}

export default settingSaga;