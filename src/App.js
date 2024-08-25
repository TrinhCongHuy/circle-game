import React, { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard';
import ScoreBoard from './components/ScoreBoard';
import Timer from './components/Timer';
import PlayButton from './components/PlayButton';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  // Khai báo các state để quản lý trạng thái trò chơi
  const [inputPoints, setInputPoints] = useState(0);
  const [points, setPoints] = useState(0);
  const [time, setTime] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameCleared, setIsGameCleared] = useState(false);
  const [circlePositions, setCirclePositions] = useState([]);
  const [circleOrder, setCircleOrder] = useState([]);
  const [restartTrigger, setRestartTrigger] = useState(0); 

  // Xử lý sự kiện khi người dùng thay đổi giá trị input
  const handleInputChange = (e) => {
    const points = Number(e.target.value);
    setInputPoints(points);
  };

  // Xử lý khi người dùng click vào một circle
  const handleCircleClick = (success) => {
    if (success) {
      setIsGameCleared(true);
      setIsGameStarted(false);
    } else {
      setIsGameOver(true);
      setIsGameStarted(false);
    }
  };

  // Xử lý khi người dùng nhấn nút Play
  const handlePlay = () => {
    if (inputPoints <= 0) {
      toast.error('Please enter a valid number of points.', {
        theme: 'colored',
      });
      return;
    }
    setPoints(inputPoints);
    setIsGameStarted(true);
    setIsGameOver(false);
    setIsGameCleared(false);
    setTime(0);

    generateCirclePositions(inputPoints);
  };

  // Xử lý khi người dùng nhấn nút Restart
  const handleRestart = () => {
    setIsGameStarted(true);
    setIsGameOver(false);
    setIsGameCleared(false);
    setTime(0);
  
    generateCirclePositions(inputPoints);
    // Thay đổi restartTrigger để kích hoạt useEffect mỗi lần restart để quay về trạng thái ban đầu
    setRestartTrigger(prev => prev + 1); 
  };

  // Hàm tạo vị trí và thứ tự ngẫu nhiên cho các circle
  const generateCirclePositions = (count) => {
    const positions = Array.from({ length: count }, () => ({
      top: `${Math.floor(Math.random() * 90)}%`,
      left: `${Math.floor(Math.random() * 90)}%`,
    }));

    const order = Array.from({ length: count }, (_, i) => i + 1);
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]]; 
    }

    setCirclePositions(positions);
    setCircleOrder(order);
  };

  // Theo dõi trạng thái kết thúc trò chơi
  useEffect(() => {
    if (isGameOver) {
      setIsGameStarted(false);
    }
  }, [isGameOver]);

  return (
    <div className="app-container">
      <ToastContainer />
      {isGameOver && !isGameCleared ? (
        <div className="game-over">GAME OVER</div>
      ) : isGameCleared ? (
        <div className="all-cleared">ALL CLEARED</div>
      ) : (
        <div className="let-play">LET'S PLAY</div>
      )}
      <ScoreBoard points={inputPoints} handleInputChange={handleInputChange} />
      <Timer time={time} setTime={setTime} isGameOver={isGameOver} isGameStarted={isGameStarted} />
      <PlayButton
        isGameStarted={isGameStarted}
        isGameOver={isGameOver}
        onPlay={handlePlay}
        onRestart={handleRestart}
      />
      <GameBoard
        points={points}
        circlePositions={circlePositions}
        circleOrder={circleOrder}
        onCircleClick={handleCircleClick}
        restartTrigger={restartTrigger}
      />
    </div>
  );
};

export default App;
