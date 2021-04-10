import React, {useState} from 'react';
import styles from './styles.module.css';

const Cell = ({color}) => {

  const coloredCell = {
    backgroundColor: color,
    border: '1px solid black',
    flex:1
  };

  return (
    <div style={coloredCell}></div>
  )
};

export default Cell;