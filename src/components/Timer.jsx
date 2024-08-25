import React, { useEffect } from 'react';

const Timer = ({ time, setTime, isGameOver, isGameStarted, isGameCleared }) => {
  useEffect(() => {
    let timer;

    if (isGameStarted && !isGameOver && !isGameCleared) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 0.1); 
      }, 100);
    }

    return () => clearInterval(timer);
  }, [isGameStarted, isGameOver, isGameCleared, setTime]);

  return (
    <div className="timer">
      Time: <span>{time.toFixed(1)}s</span> 
    </div>
  );
};


export default Timer;
