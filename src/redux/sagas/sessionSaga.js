import { call, put, takeEvery } from '@redux-saga/core/effects';
import { postUser, getUserById, getUserByUsernameAndPassword, getUserBySessionToken, removeSessionToken, verifyApiKey } from '../../apis/gw2rba';
import {
    SIGN_IN,
    SIGN_IN_SUCCESS,
    SIGN_IN_FAIL,
    SIGN_UP,
    SIGN_UP_FAIL,
    SIGN_UP_SUCCESS,
    SIGN_OUT,
    FETCH_USER_BY_SESSION_TOKEN,
    FETCH_USER_BY_SESSION_TOKEN_RESPONSE,
    VERIFY_API_KEY,
    VERIFY_API_KEY_RESPONSE,
    CLEAR_ENCOUNTERS_LIST
} from '../actions';

const signUp = function*(action) {
    const postUserResponse = yield call(postUser, action.payload);
    if (postUserResponse.success) {
        const newUser = yield call(getUserById, postUserResponse.data);
        yield put({type: SIGN_UP_SUCCESS, payload: {
            _id: newUser._id,
            username: newUser.username,
            accounts: newUser.accounts,
            sessionToken: newUser.sessionTokens[0]
        }});
    }
    else {
        yield put({type: SIGN_UP_FAIL, payload: postUserResponse});
    }
};

const signIn = function*(action) {
    const getUserResponse = yield call(getUserByUsernameAndPassword, action.payload);
    if (getUserResponse.success) {
        const user = getUserResponse.data.user;
        yield put({type: SIGN_IN_SUCCESS, payload: {
            _id: user._id,
            username: user.username,
            accounts: user.accounts,
            sessionToken: getUserResponse.data.sessionToken
        }})
    }
    else {
        yield put({type: SIGN_IN_FAIL, payload: getUserResponse});
    }
};

const signOut = function*(action) {
    yield call(removeSessionToken, action.payload);
    yield put({type: CLEAR_ENCOUNTERS_LIST})
};

const fetchBySessionToken = function*(action) {
    const getUserResponse = yield call(getUserBySessionToken, action.payload);
    if (getUserResponse) {
        yield put({type: FETCH_USER_BY_SESSION_TOKEN_RESPONSE, payload: {
            _id: getUserResponse._id,
            username: getUserResponse.username,
            accounts: getUserResponse.accounts,
            sessionToken: action.payload
        }});
    }
};

const verifyKey = function*(action) {
    const verified = yield call(verifyApiKey, action.payload);
    yield put({type: VERIFY_API_KEY_RESPONSE, payload: verified});
};

const sessionSaga = function*() {

    yield takeEvery(SIGN_UP, signUp);
    yield takeEvery(SIGN_IN, signIn);
    yield takeEvery(FETCH_USER_BY_SESSION_TOKEN, fetchBySessionToken);
    yield takeEvery(SIGN_OUT, signOut);
    yield takeEvery(VERIFY_API_KEY, verifyKey);
};

export default sessionSaga;
