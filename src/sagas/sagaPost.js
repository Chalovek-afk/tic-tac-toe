import axios from "axios";
import { takeEvery, put, call } from "redux-saga/effects";
import { all } from "redux-saga/effects";
import { handleRequests } from "redux-saga-requests";
import { createDriver } from "redux-saga-requests-axios";
import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga"

const FETCH_COUNT = "FETCH_COUNT";
const FETCH_COUNT_SUCCESS = "FETCH_COUNT_SUCCES";
const FETCH_COUNT_ERROR = "FETCH_COUNT_ERROR";

const fetchCount = () => ({ type: FETCH_COUNT });
const fetchCountSuccess = (data) => ({ type: FETCH_COUNT_SUCCESS, data });
const fetchCountError = (error) => ({ type: FETCH_COUNT_ERROR, error });

const fetchBooks = () => ({
  type: FETCH_COUNT,
  request: {
    url: "https://http://localhost:3001/api/",
  },
});

const defaultState = {
  data: null,
  pending: 0, // number of pending FETCH_BOOKS requests
  error: null,
};

const booksReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_COUNT:
      return { ...defaultState, pending: state.pending + 1 };
    case FETCH_COUNT_SUCCESS:
      return { ...defaultState, data: action.data, pending: state.pending - 1 };
    case FETCH_COUNT_ERROR:
      return {
        ...defaultState,
        error: action.error,
        pending: state.pending - 1,
      };
    default:
      return state;
  }
};

const fetchCountApi = () => axios.get("https://http://localhost:3001/api/");

function* fetchCountSaga() {
  try {
    const response = yield call(fetchCountApi);
    yield put(fetchCountSuccess(response.data));
  } catch (e) {
    yield put(fetchCountError(e));
  }
}

const configureStore = () => {
  const { requestsReducer, requestsSagas } = handleRequests({
    driver: createDriver(axios),
  });

  const reducers = combineReducers({
    count: countReducer,
    requests: requestsReducer,
  });

  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(reducers, applyMiddleware(sagaMiddleware));

  function* rootSaga() {
    yield takeEvery(FETCH_COUNT, fetchCountSaga);
    yield all(requestsSagas);
  }

  sagaMiddleware.run(rootSaga);
  return store;
};
