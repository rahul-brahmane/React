import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  const winner = checkWinner(board);

  useEffect(() => {
    if (winner) {
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
  }, [winner]);

  function checkWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let [a, b, c] of lines) {
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";
    setBoard(newBoard);
    setIsXTurn(!isXTurn);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
    setShowPopup(false);
  };

  return (
    <div className="container">
      <div className="game-box">
        <h1>Tic Tac Toe</h1>
        <h2>{winner ? `Winner: ${winner}` : `Turn: ${isXTurn ? "X" : "O"}`}</h2>

        {showPopup && <div className="popup">🎉 {winner} Wins!</div>}

        <div className="board">
          {board.map((value, i) => (
            <div
              key={i}
              className={`cell ${
                value === "X" ? "x" : value === "O" ? "o" : ""
              }`}
              onClick={() => handleClick(i)}
            >
              {value}
            </div>
          ))}
        </div>
        <button onClick={resetGame}>Restart</button>
      </div>
    </div>
  );
};

export default App;
