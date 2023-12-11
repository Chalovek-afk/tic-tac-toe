import "./App.css";
import { useEffect } from "react";
import { Provider, connect, useDispatch } from "react-redux";
import store, { async_incrementCreator } from "./store";
import {fetchCountData} from "./sagas/sagaPost"

const mapStateToProps = (state) => {
  return {
    marks: state.marks,
    player: state.player,
    end: state.end,
    win: state.win,
    count: state.count
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setMarks: (marks) => {
      dispatch({ type: "SET_MARKS", payload: marks });
    },
    setPlayer: (player) => {
      dispatch({ type: "SET_PLAYER", payload: player });
    },
    setEnd: (end) => {
      dispatch({ type: "SET_ENDGAME", payload: end });
    },
    setWin: (win) => {
      dispatch({ type: "SET_WIN", payload: win });
    },
  };
};


const BoardContainer = connect(mapStateToProps, mapDispatchToProps)(Board);


function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BoardContainer></BoardContainer>
      </Provider>
    </div>
  );
}

function Board({marks, setMarks, player, setPlayer, end, setEnd, win, setWin, count}) {
  useEffect(() => {
    const winComb = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6],
    ];

    for (let a of winComb) {
      if (marks[a[0]] === 1 && marks[a[1]] === 1 && marks[a[2]] === 1) {
        const wn = win
        wn[a[0]] = 'win'
        wn[a[1]] = 'win'
        wn[a[2]] = 'win'
        setWin(wn)
        setEnd(true);
        setPlayer(1)
      }
      if (marks[a[0]] === 2 && marks[a[1]] === 2 && marks[a[2]] === 2) {
        const wn = win
        wn[a[0]] = 'win'
        wn[a[1]] = 'win'
        wn[a[2]] = 'win'
        setWin(wn)
        setEnd(true);
        setPlayer(2)
      }
    }
  }, [marks, setEnd, setPlayer, win, setWin]);

  const dispatch = useDispatch()
  const markChange = (arg) => {
    const mrk = [...marks];
    if (!end){
      if (mrk[arg] === 0) {
        dispatch(async_incrementCreator())
        mrk[arg] = player;
        setMarks(mrk);
        if (player === 1) {
          setPlayer(2);
        } else {
          setPlayer(1);
        }
      } else {
        alert("Click on empty cell!");
      }
    } else {
      alert(`Player ${player} won! Reload page for regame!`)
    }
  };

  return (
    <div className="Board">
      <div className="text">{count}</div>
      <div>
        <Block mark={marks[0]} markChange={markChange} position={0} winCls={win[0]}></Block>
        <Block mark={marks[1]} markChange={markChange} position={1} winCls={win[1]}></Block>
        <Block mark={marks[2]} markChange={markChange} position={2} winCls={win[2]}></Block>
      </div>
      <div>
        <Block mark={marks[3]} markChange={markChange} position={3} winCls={win[3]}></Block>
        <Block mark={marks[4]} markChange={markChange} position={4} winCls={win[4]}></Block>
        <Block mark={marks[5]} markChange={markChange} position={5} winCls={win[5]}></Block>
      </div>
      <div>
        <Block mark={marks[6]} markChange={markChange} position={6} winCls={win[6]}></Block>
        <Block mark={marks[7]} markChange={markChange} position={7} winCls={win[7]}></Block>
        <Block mark={marks[8]} markChange={markChange} position={8} winCls={win[8]}></Block>
      </div>
    </div>
  );
}

function Block({ mark, markChange, position, winCls }) {
  return (
    <div
      className={`Block mark${mark} ${winCls}`}
      onClick={(e) => markChange(position)}
    ></div>
  );
}

export default App;
