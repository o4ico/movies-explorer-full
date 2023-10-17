import React from 'react';
import './Background.css';

function Background({
  children,
  style
}) {
  return (
    <div className="background" style={style}>
      {children}
    </div>
  );
}

export default Background;