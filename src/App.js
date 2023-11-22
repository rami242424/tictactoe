import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  // 9개의 null배열을 기본값으로 하는 squares라는 state 변수를 선언
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(){
    const nextSquares = squares.slice();
    nextSquares[0] = "x";
    setSquares(nextSquares);
  }
  // handleClick함수는 자바스크립트의 slice()배열 메서드를 사용하여,
  // squares 배열의 사본(nextSquares)을 생성합니다. 
  // 그런 다음 handleClick 함수는 nextSquares 배열의 첫 번째 사각형에 x를 추가하여 업데이트 합니다.
  // **setSquares 함수를 호출**하면 React는 컴포넌트의 state가 변경되었음을 알 수 있습니다.
  // 그러면 squares의 state를 사용하는 컴포넌트와 그 하위 컴포넌트가 다시 렌더링 됩니다.
  // 즉, 위 handleClick 함수의 내용은 
  // 1. slice 배열 메서드를 사용하여 squares배열의 사본 배열 nextSquares를 정의(생성)한다.
  // 2. nextSquares 배열의 0번째 인덱스에 x값을 정의한다.
  // 3. setSquares 함수를 호출한다.
  // -> React가 컴포넌트의 state가 변경됨을 전달함
  // -> squares의 state를 사용하는 컴포넌트, 하위 컴포넌트들이 다시 렌더링된다.


  return (
    <>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={handleClick} />
        <Square value={squares[1]} />
        <Square value={squares[2]} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} />
        <Square value={squares[4]} />
        <Square value={squares[5]} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} />
        <Square value={squares[7]} />
        <Square value={squares[8]} />
      </div>
    </>
  );
}