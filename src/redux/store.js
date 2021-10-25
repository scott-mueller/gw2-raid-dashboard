import { applyMiddleware, createStore, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

// Reducers
import collectorStatsReducer from './reducers/collector';
import sessionReducer from './reducers/session';

// Sagas
import collectorStatsSaga from './sagas/collectorSaga';
import sessionSaga from './sagas/sessionSaga';

const rootReducer = combineReducers({
  collectorStats: collectorStatsReducer,
  session: sessionReducer
});

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(rootReducer, initialState, composedEnhancers);

  sagaMiddleware.run(collectorStatsSaga);
  sagaMiddleware.run(sessionSaga);
  return store;
}
