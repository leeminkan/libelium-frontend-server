import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

// Login Redux States
import { LOGIN_USER, LOGOUT_USER } from './actionTypes';
import { loginSuccess, logoutUserSuccess, apiError, apiErrors } from './actions';

//AUTH related methods
import { login } from '../../../helpers/auth';


function* loginUser({ payload: { user, history } }) {
    try {
        const response = yield call(login, user);
        localStorage.setItem('token', response.data.data.access_token);
        yield put(loginSuccess(response));
        history.push('/dashboard-custom');
    } catch (error) {
        if (error.response && error.response.data.error) {
            yield put(apiErrors(error.response.data.errors));
        } else {
            yield put(apiErrors("Some thing was wrong!"));
            console.log(error);
        }
    }
}

function* logoutUser({ payload: { history } }) {
    try {
        yield put(logoutUserSuccess());
        localStorage.clear();
        history.push('/login');
    } catch (error) {
        yield put(apiError(error));
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