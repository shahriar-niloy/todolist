import { all } from 'redux-saga/effects';
import authenticateSaga from './authenticate.saga';

export default function* rootSaga() {
    yield all([authenticateSaga]);
}