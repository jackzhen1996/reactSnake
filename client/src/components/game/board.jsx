import React, {useState, useEffect, useRef} from 'react';
import styles from './styles.module.css';
import Cell from './cell.jsx';
import Snake from './snake.jsx';

const Board = ({p1Coord}) => {

  const [currRow, setRow] = useState(10);
  const [currCol, setCol] = useState(10);
  const [direction,setDirection] = useState('ArrowDown');
  const [node, setNode] = useState(0);


  const [score,setScore] = useState(0);
  const [over,setOver] = useState(false)

  const [ateFood, setAteFood] = useState(false);

  const [food,setFood] = useState(new Set(['15,15','16,15','15,16','16,16']));

  const [moves,setMoves] = useState(['10,10','11,10','12,10', '13,10', '14,10','15,10','16,10']);

  const [snake,setSnake] = useState(new Set());

  // get the current direction when key pressed
  const getKey= (e) => {
      event.stopPropagation();
      setDirection(e.key);
  }

  // randomize food location
  const randomizeFoodLoc = () => {
    const row = Math.floor(Math.random()*30).toFixed(0);
    const col = Math.floor(Math.random()*30).toFixed(0);
    // set a new set of coordinates
    setFood(new Set([`${row},${col}`,`${Number(row)+1},${col}`,`${row},${Number(col)+1}`,`${Number(row)+1},${Number(col)+1}`]));
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
    const currXY = `${currRow},${currCol}`;
    // get the moves
    // push the new move
    // get rid of the oldest move
    let addMoves = [...moves];
    // convert moves to strings
    addMoves.push(currXY);
    addMoves = addMoves.slice(1);
    setMoves(addMoves);
    setSnake(new Set(moves));

    // check if head touches food
    if (food.has(currXY)) {
      setAteFood(true);
      // increase point
      setScore(score=>score+1);

      // randomize food location
      randomizeFoodLoc();

    }

    const foodRow = Array.from(food)[0].split(',')[0];
    const foodCol = Array.from(food)[0].split(',')[1];
    let deltaRow = Number(currRow) - Number(foodRow);
    let deltaCol =  Number(currCol) - Number(foodCol);

    // temp fix for "not reaching the bounds and ended" bug
    if (currRow <= 29 && currRow >= 0 && currCol >= 0 && currCol <= 29 && score < 10) {
      var timer = setTimeout(()=>{
        // switch (direction) {
        //   case 'ArrowDown':
        //     setRow(currRow=>currRow+1);
        //     break;
        //   case 'ArrowUp':
        //     setRow(currRow=>currRow-1);
        //     break;
        //   case 'ArrowRight':
        //     setCol(col=>col+1);
        //     break;
        //   case 'ArrowLeft':
        //     setCol(col=>col-1);
        //     break;
        //   default:
        //     console.log('not valid key!')
        // }

        // computer snake movements
        if (deltaRow > 0) {
          setRow(row=>row-1);
        }
        else if (deltaRow < 0) {
          setRow(row=>row+1);
        }

        else if (deltaCol > 0) {
          setCol(col=>col-1);
        }

        else if (deltaCol < 0) {
          setCol(col=>col+1);
        }

      }, 50)
    } else {
      setOver(true);
      console.log('game over')
    }

    // prevRow.current = currRow;
    // prevCol.current = currCol;

    return ()=>{
      clearTimeout(timer);
      window.removeEventListener('keydown',getKey);
    }
  },[currRow,currCol,direction,food]);

  if (over) {
    return (
      <div className={styles.grid}>
        <h2>Game Over!</h2>
      </div>
    )
  } else {
    return (
      <>
      <div>score: {score}</div>
      <div className={styles.grid}>
      {
        makeBoard().map((row,rowIndex)=>{
          return (
            <div key = {rowIndex} className={styles.row}>
              {row.map((cell,colIndex)=>
                // return <Snake key={rowIndex+colIndex} direction ={direction} boardState = {{currRow,currCol}} position = {{rowIndex, colIndex}}/>
                <Cell  food = {food.has(`${rowIndex},${colIndex}`)} snake = {snake.has(`${rowIndex},${colIndex}`)} currCoordinates = {{currRow,currCol}} cellCoordinates={`${rowIndex},${colIndex}`} key={colIndex+rowIndex}/>
              )}
            </div>
          )
        })
      }
      </div>
      </>
    )
  }
}

export default Board;