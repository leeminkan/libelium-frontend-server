import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

// Login Redux States
import { GET_ALL_ALGORITHM_PARAMETER } from './actionTypes';
import { getAllAlgorithmParameterSuccess, getAllAlgorithmParameterError } from './actions';

import { apiGetAllAlgorithmParameter } from '../../helpers/api';
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

export function* watchGetAllAlgorithmParameter() {
    yield takeEvery(GET_ALL_ALGORITHM_PARAMETER, getAllAlgorithmParameterFlow)
}

function* algorithmParameterSaga() {
    yield all([
        fork(watchGetAllAlgorithmParameter),
    ]);
}

export default algorithmParameterSaga;