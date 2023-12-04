import "./App.css";
import { useEffect } from "react";
import { Provider, connect } from "react-redux";
import { createStore } from "redux";

const initialState = {
  marks: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  player: 1,
};
const store = createStore(reducer);

function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_MARKS":
      return { ...state, marks: action.payload };
    case "SET_PLAYER":
      return { ...state, player: action.payload };

    default:
      return state;
  }
}
const mapStateToProps = (state) => {
  return {
    marks: state.marks,
    player: state.player,
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

function Board({marks, setMarks, player, setPlayer}) {
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
        console.log(marks);
        alert("Player 1 Wins");
      }
      if (marks[a[0]] === 2 && marks[a[1]] === 2 && marks[a[2]] === 2) {
        console.log(marks);
        alert("Player 2 Wins");
      }
    }
  }, [marks]);

  const markChange = (arg) => {
    const mrk = [...marks];
    if (mrk[arg] === 0) {
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
  };

  return (
    <div className="Board">
      <div>
        <Block mark={marks[0]} markChange={markChange} position={0}></Block>
        <Block mark={marks[1]} markChange={markChange} position={1}></Block>
        <Block mark={marks[2]} markChange={markChange} position={2}></Block>
      </div>
      <div>
        <Block mark={marks[3]} markChange={markChange} position={3}></Block>
        <Block mark={marks[4]} markChange={markChange} position={4}></Block>
        <Block mark={marks[5]} markChange={markChange} position={5}></Block>
      </div>
      <div>
        <Block mark={marks[6]} markChange={markChange} position={6}></Block>
        <Block mark={marks[7]} markChange={markChange} position={7}></Block>
        <Block mark={marks[8]} markChange={markChange} position={8}></Block>
      </div>
    </div>
  );
}

function Block({ mark, markChange, position }) {
  return (
    <div
      className={`Block mark${mark}`}
      onClick={(e) => markChange(position)}
    ></div>
  );
}

export default App;
