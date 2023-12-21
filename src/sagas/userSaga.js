import {put, takeEvery, call} from "redux-saga/effects"
import { FETCH_USERS } from "../store"
import { setUsers } from "../store"

const fetchUsers = () => fetch('https://jsonplaceholder.typicode.com/users?_limit=5')

function* fetchUserWorker() {
    const data = yield call(fetchUsers)
    const json = yield call( () => new Promise(res => res(data.json())))
    yield put(setUsers(json))
}

export function* fetchUserWatcher() {
    yield takeEvery(FETCH_USERS, fetchUserWorker)
}
