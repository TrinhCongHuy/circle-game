/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Circle from './Circle';

const GameBoard = ({ points, onCircleClick, circlePositions, circleOrder, restartTrigger }) => {
  const [clickedCircles, setClickedCircles] = useState([]);

  // Khi restartTrigger thay đổi, khởi tạo lại mảng clickedCircles để đảm bảo tất cả các circle đều chưa được click
  useEffect(() => {
    setClickedCircles(new Array(points).fill(false)); 
  }, [restartTrigger]); 

  // Xử lý sự kiện khi người dùng click vào một circle
  const handleCircleClick = (value) => {
    // Nếu giá trị của circle click đúng thứ tự thì tiếp tục
    if (value === clickedCircles.filter(Boolean).length + 1) {
      const updatedClickedCircles = [...clickedCircles];
      updatedClickedCircles[circleOrder.indexOf(value)] = true;
      setClickedCircles(updatedClickedCircles);

      // Kiểm tra nếu người dùng đã click đúng tất cả các circle
      if (value === points) {
        onCircleClick(true); // Người chơi thắng
      }
    } else {
      onCircleClick(false); // Người chơi thua
    }
  };

  return (
    <div className="game-board">
      {circlePositions.map((position, index) => (
        !clickedCircles[index] && (
          <Circle
            key={index}
            value={circleOrder[index]}
            onClick={() => handleCircleClick(circleOrder[index])}
            style={position}
          />
        )
      ))}
    </div>
  );
};

export default GameBoard;
