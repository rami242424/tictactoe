import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// Board컴포넌트가 props에 의해 제어되도록 만들기
// 3개의 props추가하기(플레이어가 움직일 때마다 업데이트된 squares배열로 Board가 호출할 수 있는 새로운 onPlay함수가 추가되도록하기)
function Board({ xIsNext, squares, onPlay }) {
  // 제거하기-1
  // const [xIsNext, setXIsNext] = useState(true);
  // const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    // calculateWinner를 호출하여 플레이어가 이겼는지 확인
    // 사용자가 이미 X또는 O를 클릭했는지 동시에 확인 가능(해당되면 조기 반환)
    // if (squares[i] || calculateWinner(squares)) {
    // if (squares[i] || calculateWinner(squares) || squares[i]) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    // 위에 제거하기-1에 의해 제거 및 onPlay추가
    // setSquares(nextSquares);
    // setXIsNext(!xIsNext);
    // 사용자가 square를 클릭할때, Game 컴포넌트가 Board를 업데이트 한다.
    onPlay(nextSquares);
  }

  // status 섹션을 추가하여 winner:x or o를 표시하고, 게임중인 경우에는 다음 플레이어의 차례를 표시
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function Game(){
  // 다음 플레이어와 이동 history를 추적하기 위해 state추가
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  // 현재 이동에 대한 squares를 렌더링하기 위해 history에서 마지막 squares 배열을 읽어야한다(렌더링중에 계산할 수 있는 충분한 정보가 이미 있으므로 useState는 필요하지않다.)
  const currentSquares = history[history.length - 1];

  // Board 컴포넌트가 게임을 업데이트할 때 호출한(할) 함수
  // handlePlay가 호출되면 > 업데이튼 된 squares 배열을 onPlay로 전달한다. 
  function handlePlay(nextSquares) {
    setHistory([...history, nextSquares]); // history에 있는 모든 항목을 포함하는 새 배열을 만들고, 그 뒤에 nextSquares를 만든다.(...history 는 history의 모든 항목 열거 라고 이해하면 된다.)
    setXIsNext(!xIsNext);
  }

  return(
    <div className="game">
      <div className="game-board">
        {/* xIsNext, currentSquares, handlePlay를 Board 컴포넌트에 props로 전달 */}
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>
          {/* {TODO} */}
        </ol>
      </div>
    </div>
  );
}