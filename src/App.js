import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    const nextSquares = squares.slice();
    nextSquares[i] = "x";
    setSquares(nextSquares);
  }
  return (
    <>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        {/* 사각형이 클릭되면, => 뒤에 코드가 실행되어 handleClick(0)을 호출합니다. */}
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


// 이해못함 여러번 읽어볼것!
// Now that your state handling is in the Board component, the parent Board component passes props to the child Square components so that they can be displayed correctly. When clicking on a Square, the child Square component now asks the parent Board component to update the state of the board. When the Board’s state changes, both the Board component and every child Square re-renders automatically. Keeping the state of all squares in the Board component will allow it to determine the winner in the future.
// 이제 모든 state 관리는 Board에 있으므로, 부모 Board 컴포넌트는 자식 Square 컴포넌트가 올바르게 표시될 수 있도록 props를 전달합니다. Square를 클릭하면 자식 Square 컴포넌트가 부모 Board 컴포넌트에 보드의 state를 업데이트하도록 요청합니다. Board의 state가 변경되면, Board 컴포넌트와 모든 자식 Square 컴포넌트가 자동으로 다시 렌더링됩니다. Board 컴포넌트에 속한 모든 사각형의 state를 유지하면 나중에 승자를 결정할 수 있습니다..

// Let’s recap what happens when a user clicks the top left square on your board to add an X to it:
// 사용자가 보드의 왼쪽 상단 사각형을 클릭하여 X를 추가하면 어떤 일이 발생하는지 다시 한 번 정리해 보겠습니다:

// Clicking on the upper left square runs the function that the button received as its onClick prop from the Square. The Square component received that function as its onSquareClick prop from the Board. The Board component defined that function directly in the JSX. It calls handleClick with an argument of 0.
// handleClick uses the argument (0) to update the first element of the squares array from null to X.
// The squares state of the Board component was updated, so the Board and all of its children re-render. This causes the value prop of the Square component with index 0 to change from null to X.
// 왼쪽 상단 사각형을 클릭하면 button이 Square로부터 onClick prop로 받은 함수가 실행됩니다.
// handleClick은 인수(0)을 사용하여 squares 배열의 첫 번째 요소를 null에서 X로 업데이트합니다.
// Board 컴포넌트의 squares state가 업데이트되어, Board와 그 모든 자식이 다시 렌더링됩니다. 이로 인해 인덱스가 0인 Square 컴포넌트의 value prop가 null에서 X로 변경됩니다.
// In the end the user sees that the upper left square has changed from empty to having a X after clicking it.
// 결국 사용자는 왼쪽 상단 사각형을 클릭한 후 비어있는 사각형이 X가 표시된 상태로 변경된 것을 확인할 수 있습니다.

// Note
// The DOM <button> element’s onClick attribute has a special meaning to React because it is a built-in component. For custom components like Square, the naming is up to you. You could give any name to the Square’s onSquareClick prop or Board’s handleClick function, and the code would work the same. In React, it’s conventional to use onSomething names for props which represent events and handleSomething for the function definitions which handle those events.
//  DOM <button> 엘리먼트의 onClick 어트리뷰트는 빌트인 컴포넌트이기 때문에 React에서 특별한 의미를 갖습니다. 사용자 정의 컴포넌트, 예를 들어, 사각형과 같은 경우, 이름은 사용자가 원하는 대로 지을 수 있습니다. Square의 onSquareClick prop나 Board의 handleClick 함수에 어떠한 이름을 붙여도 코드는 동일하게 작동합니다. React에서는 이벤트를 나타내는 prop에는 on[Event] 이름을 사용하고 이벤트를 처리하는 함수 정의에는 handle[Event]를 사용하는 것이 관례입니다.