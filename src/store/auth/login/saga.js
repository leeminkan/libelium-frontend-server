import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

// Login Redux States
import { LOGIN_USER, LOGOUT_USER } from './actionTypes';
import { loginSuccess, logoutUserSuccess, apiError, apiErrors } from './actions';

//AUTH related methods
import { login } from '../../../helpers/auth';

import { handlerError } from '../../../helpers/sagaUtils';


function* loginUser({ payload: { user, history } }) {
    try {
        const response = yield call(login, user);
        localStorage.setItem('token', response.data.data.access_token);
        yield put(loginSuccess(response));
        history.push('/dashboard');
    } catch (error) {
        const errors = handlerError(error, history);
        yield put(apiErrors(errors));
    }
}

function* logoutUser({ payload: { history } }) {
    try {
        yield put(logoutUserSuccess());
        localStorage.clear();
        history.push('/login');
    } catch (error) {
        const errors = handlerError(error, history);
        yield put(apiError(errors));
    }
}


export function* watchUserLogin() {
    yield takeEvery(LOGIN_USER, loginUser)
}

export function* watchUserLogout() {
    yield takeEvery(LOGOUT_USER, logoutUser)
}

function* authSaga() {
    yield all([
        fork(watchUserLogin),
        fork(watchUserLogout),
    ]);
}

export default authSaga;