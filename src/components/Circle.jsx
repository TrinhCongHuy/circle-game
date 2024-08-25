import React from 'react';

const Circle = ({ value, onClick, style }) => {
  return (
    <div
      className="circle"
      style={style}
      onClick={onClick}
    >
      {value}
    </div>
  );
};

export default Circle;
