import React from 'react';

const PlayButton = ({ isGameStarted, isGameOver, onPlay, onRestart }) => {
  // Hiển thị nút Restart khi trò chơi đã kết thúc  hoặc khi thắng
  if (isGameOver || isGameStarted ) {
    return (
      <button className="play-button" onClick={onRestart}>
        Restart
      </button>
    );
  }

  // Hiển thị nút Play khi trò chơi chưa bắt đầu (isGameStarted = false)
  return (
    <button className="play-button" onClick={onPlay}>
      Play
    </button>
  );
};

export default PlayButton;
