import React from 'react';

const ScoreBoard = ({ points, handleInputChange }) => {
  return (
    <div className="score-board">
      Points: 
      <input
        type="number" 
        value={points} 
        onChange={handleInputChange}
        min="0"
        placeholder="Enter points"
      />
    </div>
  );
};

export default ScoreBoard;

