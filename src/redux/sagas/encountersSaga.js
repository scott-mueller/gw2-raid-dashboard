import { put, takeEvery } from "@redux-saga/core/effects";
import { call } from "ramda";
import { getEncountersByAccountName } from "../../apis/gw2rba";
import { FETCH_ENCOUNTERS_BY_ACCOUNT_NAME, FETCH_ENCOUNTERS_BY_ACCOUNT_NAME_RESPONSE } from "../actions";

const fetchEncountersByAccountName = function*(action) {
    const encounters = yield call(getEncountersByAccountName, action.payload);
    yield put({type: FETCH_ENCOUNTERS_BY_ACCOUNT_NAME_RESPONSE, payload: encounters});
};

const encountersSaga = function*() {
    yield takeEvery(FETCH_ENCOUNTERS_BY_ACCOUNT_NAME, fetchEncountersByAccountName);
};
export default encountersSaga;