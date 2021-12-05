import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ name: 'ToDoList' }) 
    : compose;

const loggerMiddleware = store => next => action => {
    console.log("STATE BEFORE", store.getState());
    console.log("ACTION DISPATCHED", action);
    next(action);
    console.log("STATE AFTER", store.getState());
};

const store = createStore(
    reducers,
    {}, 
    composeEnhancers(
        applyMiddleware(sagaMiddleware),
        applyMiddleware(loggerMiddleware)
    )
);

sagaMiddleware.run(rootSaga);

export default store; 