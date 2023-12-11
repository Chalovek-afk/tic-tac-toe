import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga"
import { countWatcher } from "./sagas/sagaCount";


const sagaMiddleware = createSagaMiddleware()

const FETCH_COUNT = "FETCH_COUNT";
const FETCH_COUNT_SUCCESS = "FETCH_COUNT_SUCCES";
const FETCH_COUNT_ERROR = "FETCH_COUNT_ERROR";




const initialState = {
  marks: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  player: 1,
  end: false,
  win: ["", "", "", "", "", "", "", "", ""],
  count: 0,
};

const SET_MARKS = "SET_MARKS";

const SET_PLAYER = "SET_PLAYER";

const SET_ENDGAME = "SET_ENDGAME";

const SET_WIN = "SET_WIN";

const INCREMENT = "INCREMENT";
export const ASYNC_INCREMENT = "ASYNC_INCREMENT";


function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_MARKS:
      return { ...state, marks: action.payload };
    case SET_PLAYER:
      return { ...state, player: action.payload };
    case SET_ENDGAME:
      return { ...state, end: action.payload };
    case SET_WIN:
      return { ...state, win: action.payload };
    case INCREMENT:
      return { ...state, count: state.count + 1 };
    default:
      return state;
  }
}
const store = createStore(reducer, applyMiddleware(sagaMiddleware));

export const incrementCreator = () => ({type: INCREMENT})
export const async_incrementCreator = () => ({type: ASYNC_INCREMENT})

const fetchCount = () => ({ type: FETCH_COUNT });
const fetchCountSuccess = (data) => ({ type: FETCH_COUNT_SUCCESS, data });
const fetchCountError = (error) => ({ type: FETCH_COUNT_ERROR, error });

export default store;

sagaMiddleware.run(countWatcher)