import {all} from 'redux-saga/effects'
import { countWatcher } from './sagaCount'
import { fetchUserWatcher } from './userSaga'

export function* rootWatcher() {
    yield all([countWatcher(), fetchUserWatcher()])
}