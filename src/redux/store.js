import { applyMiddleware, createStore, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

// Reducers
import counterReducer from './reducers/counter/counterSlice';
import collectorStatsReducer from './reducers/collector';

// Sagas
import collectorStatsSaga from './sagas/collectorSaga';

const rootReducer = combineReducers({
  counter: counterReducer,
  collectorStats: collectorStatsReducer
});

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(rootReducer, initialState, composedEnhancers);

  sagaMiddleware.run(collectorStatsSaga);
  return store;
}
