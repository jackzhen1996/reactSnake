import React, {useState} from 'react';
import Board from './board.jsx';
import styles from './styles.module.css';
import ColorPicker from './colorPicker.jsx';

const GameRulesAndControls = ({data, getStart}) => {
  const {mode, description} = data;
  const [start, setStart] = useState(false);
  const [p1Name,setP1Name] = useState('Python');
  // const [p1Confirmed,setConfirmed] = useState(false);
  // const [p2Confirmed,setConfirmed2] = useState(false);
  // const [scoreConfirm,setScoreConfirm] = useState(false);
  const [p2Name,setP2Name] = useState('');
  const [limit, setLimit] = useState(10);

  const [p2Color, getColor] = useState('#181946');

  // Single player
  // player name and color

  // score limit

  // color picker

  // Mutiplayer
  // player 1 name and color
  // player 2 name and color
  // score limit

  const handleNameChange = (e,player) => {
    if (player === 1) {
      setP1Name(e.target.value);
      console.log(p1Name)
    } else {
      setP2Name(e.target.value);
      console.log(p2Name)

    }
  };

  const handleScore = (e) => {
    setLimit(e.target.value);
  }


  const handleStart = () => {
    setStart(true);
    getStart(true);
  };


  if (start) {
    return (
    <Board limit={limit} player={mode==='single' && p1Name} p2Color={p2Color} mode={mode}/>
    )

  } else {
    return (
      <div className={styles.gameRules}>
        <div className={styles.inputContainer}>
          <div className={styles.inputLeft}>
          <div className={styles.input}>
            <label>Player 1 Name</label>
            <input value={p1Name} name='name' onChange={(e)=>handleNameChange(e,1)} required/>
            <ColorPicker getColor={getColor}/>
          </div>
        {mode === 'multi'&&
          <div className={styles.input}>
            <label>Player 2 Name</label>
            <input value={p2Name} name='name' onChange={(e)=>handleNameChange(e,2)} required/>
          </div>

        }
        </div>
        <div className={styles.inputRight}>
        <div className={styles.input}>
          <label>Score Limit</label>
          <div>
              <input style={{width:'25%'}} value={limit} name='limit' onChange={handleScore} required/>
          </div>
        </div>
        </div>
        </div>
          <div className={styles.startContainer}><button onClick={handleStart}>Start Game</button></div>
      </div>
    )
  };
};

export default GameRulesAndControls;