import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga"
import { rootWatcher } from "./sagas/index";


const sagaMiddleware = createSagaMiddleware()




const initialState = {
  marks: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  player: 1,
  end: false,
  win: ["", "", "", "", "", "", "", "", ""],
  count: 0,
  users: []
};

const SET_MARKS = "SET_MARKS";

const SET_PLAYER = "SET_PLAYER";

const SET_ENDGAME = "SET_ENDGAME";

const SET_WIN = "SET_WIN";

const SET_USERS = "SET_USERS"

export const FETCH_USERS = "FETCH_USERS"
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
    case SET_USERS:
      return {...state, users: action.payload}
    default:
      return state;
  }
}
const store = createStore(reducer, applyMiddleware(sagaMiddleware));

export const fetchUsers = () => ({type: FETCH_USERS})
export const setUsers = payload => ({type: SET_USERS, payload})
export const incrementCreator = () => ({type: INCREMENT})
export const async_incrementCreator = () => ({type: ASYNC_INCREMENT})
export default store;

sagaMiddleware.run(rootWatcher)