import { call, put, takeEvery, takeLeading } from 'redux-saga/effects';
import { getCollectorStatsById, getEncountersinIdArray } from '../../apis/gw2rba';
import {
    FETCH_COLLECTOR_DATA,
    FETCH_COLLECTOR_DATA_RESPONSE,
    FETCH_ENCOUNTERS_FOR_TIMELINE_DETAILS,
    FETCH_ENCOUNTERS_FOR_TIMELINE_DETAILS_RESPONSE
} from '../actions';

const fetchCollectorData = function*(action) {
    const stats = yield call(getCollectorStatsById, action.payload);
    yield put({type: FETCH_COLLECTOR_DATA_RESPONSE, payload: { stats }});
};

const fetchEncountersForTimeline = function*(action) {
    const encounters = yield call(getEncountersinIdArray, action.payload);
    yield put({type: FETCH_ENCOUNTERS_FOR_TIMELINE_DETAILS_RESPONSE, payload: { encounters }});
};

const collectorSaga = function*() {
    yield takeEvery(FETCH_COLLECTOR_DATA, fetchCollectorData);
    yield takeLeading(FETCH_ENCOUNTERS_FOR_TIMELINE_DETAILS, fetchEncountersForTimeline);
};
export default collectorSaga;
