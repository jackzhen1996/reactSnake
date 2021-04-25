import React, {useState} from 'react';
import styles from './styles.module.css';

// cell changes based on what coordinate the snake is
const Cell = ({food,snake1, snake2, currCoordinates, cellCoordinates}) => {
  const {currRow,currCol} = currCoordinates;
  let color = 'white';

  if (snake1) {
    color = 'red';
  }
  else if (snake2) {
    color ='blue';
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