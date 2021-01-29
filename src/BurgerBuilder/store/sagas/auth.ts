import { put } from 'redux-saga/effects';
import { AUTH_LOGOUT } from "../actions/actionTypes";

export function* logoutSaga(action: any) {
    yield localStorage.removeItem('token');
    yield put({
        type: AUTH_LOGOUT,
    });
}