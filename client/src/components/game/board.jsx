import React, {useState, useEffect} from 'react';
import styles from './styles.module.css';
import Cell from './cell.jsx';

const Board = ({p1Coord}) => {

  const [currRow, setRow] = useState(10);
  const [currCol, setCol] = useState(10);
  const [direction,setDirection] = useState('ArrowDown')

  const getKey= (e) => {
      event.stopPropagation();
        setDirection(e.key);
  }

  // returns an 30 x 30 array
  const makeBoard = () => {

    const arr = [];
    for (let row = 0; row < 30; row++) {
        arr.push([]);
      for (let col = 0; col < 30; col++) {
        arr[row].push(1);
      }
    }
    return arr;
  }

  window.addEventListener('keydown',getKey);


  // constantly moving in the direction
  useEffect(()=>{

    if (currRow < 29 && currRow > 0 && currCol > 0 && currCol < 29) {
      var timer = setTimeout(()=>{
        switch (direction) {
          case 'ArrowDown':
            setRow(currRow=>currRow+1);
            break;
          case 'ArrowUp':
            setRow(currRow=>currRow-1);
            break;
          case 'ArrowRight':
            setCol(col=>col+1);
            break;
          case 'ArrowLeft':
            setCol(col=>col-1);
            break;
          default:
            console.log('not valid key!')
        }

        // console.log('row '+currRow, 'col ' + currCol);
      }, 200)
    } else {
      console.log('game over')
    }

    return ()=>{
      clearTimeout(timer);
      window.removeEventListener('keydown',getKey);
    }
  },[currRow,currCol,direction]);

  return (
    <div className={styles.grid}>
    {
      makeBoard().map((row,rowIndex)=>{
        return (
          <div key = {rowIndex} className={styles.row}>
            {row.map((cell,colIndex)=>{
              return <Cell color = {currCol === colIndex && currRow === rowIndex? 'red': 'white'} key = {colIndex} coord = {{rowIndex, colIndex}}/>
            })}
          </div>
        )
      })
    }
    </div>
  )
};

export default Board;