import { takeEvery } from 'redux-saga/effects';
import actionTypes from '../../constants/action.types';
import { getIcons } from '../actions/icon.actions';

function* iconWatcher() {
    yield takeEvery(actionTypes.GET_ICONS, getIcons);
}

export default iconWatcher;