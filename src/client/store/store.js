import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware()

const loggerMiddleware = store => next => action => {
    console.log("STATE BEFORE", store.getState());
    console.log("ACTION DISPATCHED", action);
    next(action);
    console.log("STATE AFTER", store.getState());
};

const store = createStore(
    reducers,
    {}, 
    compose(
        applyMiddleware(sagaMiddleware),
        applyMiddleware(loggerMiddleware), 
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

sagaMiddleware.run(rootSaga);

export default store; 