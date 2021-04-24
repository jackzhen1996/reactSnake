import React, {useState} from 'react';
import styles from './styles.module.css';

// cell changes based on what coordinate the snake is
const Cell = ({food,snake, currCoordinates, cellCoordinates}) => {
  const {currRow,currCol} = currCoordinates;
  let color = 'white';

  if (snake) {
    color = 'red';
  }
  else if (food) {
    color = 'green';
  }

  const cellStyle= {
    backgroundColor: color,
    border: '1px solid black',
    flex:1
  };

  return (
    <div style={cellStyle}></div>
  )
};

export default Cell;