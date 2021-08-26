import { put, takeEvery } from 'redux-saga/effects';
import { FETCH_COLLECTOR_DATA, FETCH_COLLECTOR_DATA_RESPONSE } from '../actions';

const fetchCollectorData = function*(action) {
    yield put({type: FETCH_COLLECTOR_DATA_RESPONSE, payload: {foo: 'bar'}})
}

const collectorSaga = function*() {
    yield takeEvery(FETCH_COLLECTOR_DATA, fetchCollectorData);
};
export default collectorSaga;
