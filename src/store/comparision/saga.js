import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

// Login Redux States
import { GET_COMPARISION_PAGE_SETTING } from './actionTypes';
import { getComparisionPageSettingSuccess, getComparisionPageSettingError } from './actions';

import { apiComparisionPageSetting } from '../../helpers/api';
import { handlerError } from '../../helpers/sagaUtils';

function* getComparisionPageSettingFlow({ payload: { history } }) {
    try {
        const response = yield call(apiComparisionPageSetting);
        yield put(getComparisionPageSettingSuccess(response.data.data));
    } catch (error) {
        const errors = handlerError(error, history);
        yield put(getComparisionPageSettingError(errors));
    }
}

export function* watchGetSettings() {
    yield takeEvery(GET_COMPARISION_PAGE_SETTING, getComparisionPageSettingFlow)
}

function* comparisionSaga() {
    yield all([
        fork(watchGetSettings),
    ]);
}

export default comparisionSaga;