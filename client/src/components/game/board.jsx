import React, {useState, useEffect, useRef} from 'react';
import styles from './styles.module.css';
import Cell from './cell.jsx';
import Snake from './snake.jsx';

const originalFood= ['15,15','16,15','15,16','16,16'];
const originalSnake1 = ['10,10','11,10','12,10', '13,10', '14,10','15,10','16,10'];
const originalSnake2 = ['10,20','11,20','12,20','13,20','14,20','15,20','16,20'];

const Board = ({mode, player1, player2}) => {

  // single player:
  // currRow1, currCol1 belongs to computer
  // currRow2, currCol2 belongs to player2

  // first snake current positions
  const [currRow1, setRow1] = useState(10);
  const [currCol1, setCol1] = useState(10);

  // second snake current positions
  const [currRow2, setRow2] = useState(10);
  const [currCol2, setCol2] = useState(20);

  // p1 direction1
  const [direction2,setdirection2] = useState('ArrowDown');

  const [countDown,setCountdDown] = useState(3);

  const [score1,setScore1] = useState(0);
  const [score2,setScore2] = useState(0);


  const [over,setOver] = useState(false)

  const [ateFood, setAteFood] = useState(false);

  const [food,setFood] = useState(new Set(originalFood));

  const [moves1,setMoves1] = useState(originalSnake1);
  const [moves2,setMoves2] = useState(originalSnake2);

  const [snake1,setSnake1] = useState(new Set());
  const [snake2,setSnake2] = useState(new Set());

  const [won,setWon] = useState(null);

  // get the current direction1 when key pressed
  const getKey= (e) => {
      event.stopPropagation();
      setdirection2(e.key);
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

  // increase score if player eats food
  const incrementScore = (player1,player2) => {
    if (food.has(player1)) {
      setScore1(score1=>score1+1);
    }
    if (food.has(player2)) {
      setScore2(score2=>score2+1);
    }
  }

  // evaluate winner
  const whoWon = (score1,score2) => {

    if (score1 > score2) {
      setWon(1);
    }
    else if (score2 > score1) {
      setWon(2);
    }
    else {
      setWon(0);
    }

  }

  // constantly moving in the direction1
  useEffect(()=>{

    if (countDown > 0) {
      var countDownTimer = setTimeout(()=>{
          setCountdDown(countDown=>countDown-1);
      },1000)
    }

    if (countDown === 0) {

        // snake1
        const currXY1 = `${currRow1},${currCol1}`;
        // get the moves
        // push the new move
        // get rid of the oldest move
        let addMoves1 = [...moves1];
        // convert moves to strings
        addMoves1.push(currXY1);
        addMoves1 = addMoves1.slice(1);
        setMoves1(addMoves1);
        setSnake1(new Set(moves1));

        // snake2
        const currXY2 = `${currRow2},${currCol2}`;
        // get the moves
        // push the new move
        // get rid of the oldest move
        let addMoves2 = [...moves2];
        // convert moves to strings
        addMoves2.push(currXY2);
        addMoves2 = addMoves2.slice(1);
        setMoves2(addMoves2);
        setSnake2(new Set(moves2));

    // check if head touches food
    if (food.has(currXY1) || food.has(currXY2)) {
      incrementScore(currXY1,currXY2);
      // randomize food location
      randomizeFoodLoc();
    }

    // this is calculation for relative position of computer snake head from food
    const foodRow = Array.from(food)[0].split(',')[0];
    const foodCol = Array.from(food)[0].split(',')[1];
    let deltaRow = Number(currRow1) - Number(foodRow);
    let deltaCol =  Number(currCol1) - Number(foodCol);

    // temp fix for "not reaching the bounds and ended" bug
    if (currRow1 <= 29 && currRow1 >= 0 && currCol1 >= 0 && currCol1 <= 29 && currRow2 <= 29 && currRow2 >= 0 && currCol2 >= 0 && currCol2 <= 29 && (score1 < 5 || score2 < 5)) {
      var timer1 = setTimeout(()=>{
        // computer snake movements
        if (deltaRow > 0) {
          setRow1(row=>row-1);
        }
        else if (deltaRow < 0) {
          setRow1(row=>row+1);
        }

        else if (deltaCol > 0) {
          setCol1(col=>col-1);
        }

        else if (deltaCol < 0) {
          setCol1(col=>col+1);
        }

      }, 50)

      var timer2 = setTimeout(()=>{
        switch (direction2) {
          case 'ArrowDown':
            setRow2(currRow2=>currRow2+1);
            break;
          case 'ArrowUp':
            setRow2(currRow2=>currRow2-1);
            break;
          case 'ArrowRight':
            setCol2(currCol2=>currCol2+1);
            break;
          case 'ArrowLeft':
            setCol2(currCol2=>currCol2-1);
            break;
          default:
            console.log('not valid key!')
        }

      },50)


    } else {
      // evaluate who won
      setOver(true);
      whoWon(score1,score2)
      console.log('game over')
    }

    return ()=>{
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(countDownTimer);
      window.removeEventListener('keydown',getKey);
    }
  }
  },[currRow1,currCol1,direction2,food, countDown]);

  if (over) {
    let message = '';
    if (won === 1) {
      message = 'Player 1 won';
    }
    if (won === 2) {
      message = 'Player 2 won';
    }
    if (won === 0) {
      message = 'Tie Game'
    }
    return (
      <div className={styles.grid}>
        <h2>{message}</h2>
      </div>
    )
  } else {
    return (
      <>
      <div className={styles.scoreContainer}>{player1} score: {score1} {player2} score2: {score2}</div>

      {countDown === 0?
      <div className={styles.grid}>
      {
        makeBoard().map((row,rowIndex)=>{
          return (
            <div key = {rowIndex} className={styles.row}>
              {row.map((cell,colIndex)=>
                <Cell  food = {food.has(`${rowIndex},${colIndex}`)} snake2 = {snake2.has(`${rowIndex},${colIndex}`)} snake1 = {snake1.has(`${rowIndex},${colIndex}`)} currCoordinates = {{currRow1,currCol1}} cellCoordinates={`${rowIndex},${colIndex}`} key={colIndex+rowIndex}/>
              )}
            </div>
          )
        })
      }
      </div>
      :
      <div className={styles.countDown}>{countDown}</div>
      }
      </>
    )
  }
}

export default Board;