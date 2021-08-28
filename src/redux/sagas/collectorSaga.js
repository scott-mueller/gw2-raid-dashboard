import { call, put, takeEvery } from 'redux-saga/effects';
import { getCollectorStatsById } from '../../apis/gw2rba';
import { FETCH_COLLECTOR_DATA, FETCH_COLLECTOR_DATA_RESPONSE } from '../actions';

const fetchCollectorData = function*(action) {
    const stats = yield call(getCollectorStatsById, action.payload)
    yield put({type: FETCH_COLLECTOR_DATA_RESPONSE, payload: { stats }})
}

const collectorSaga = function*() {
    yield takeEvery(FETCH_COLLECTOR_DATA, fetchCollectorData);
};
export default collectorSaga;
