import React, { useEffect } from 'react';

const Timer = ({ time, setTime, isGameOver, isGameStarted }) => {
  useEffect(() => {
    let timer;
    if (isGameStarted && !isGameOver) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 0.1);
      }, 100);
    } else if (isGameOver) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isGameStarted, isGameOver, setTime]);

  return (
    <div className="timer">
      Time: <span>{time.toFixed(1)}s</span>
    </div>
  );
};

export default Timer;
