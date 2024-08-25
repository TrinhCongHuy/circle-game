import React from 'react';

const PlayButton = ({ isGameStarted, onPlay, onRestart, isGameOver }) => {
  if (isGameOver) {
    return (
      <button className="play-button" onClick={onRestart}>
        Restart
      </button>
    );
  }
  return (
    <button className="play-button" onClick={isGameStarted ? onRestart : onPlay}>
      {isGameStarted ? 'Restart' : 'Play'}
    </button>
  );
};

export default PlayButton;
