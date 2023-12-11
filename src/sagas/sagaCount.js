import {put, takeEvery} from "redux-saga/effects"
import {ASYNC_INCREMENT, incrementCreator} from "../store"


function* incrementWorker() {
    yield put(incrementCreator())
}

export function* countWatcher() {
    yield takeEvery(ASYNC_INCREMENT, incrementWorker)
}