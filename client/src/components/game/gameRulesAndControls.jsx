import React, {useState} from 'react';
import Board from './board.jsx';

const GameRulesAndControls = ({data}) => {
  const {mode, description} = data;
  const [start, setStart] = useState(false);
  const [p1Name,setP1Name] = useState('');
  const [p1Confirmed,setConfirmed] = useState(false);
  const [p2Confirmed,setConfirmed2] = useState(false);
  const [p2Name,setP2Name] = useState('');
  const [limit, setLimit] = useState(10);

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
  };

  const confirmName = (player) => {
    if (player === 1) {
      setConfirmed(true);
    } else {
      setConfirmed2(true);
    }
  }

  const cancelName = (player) => {
    if (player === 1) {
      setConfirmed(false);
    } else {
      setConfirmed2(false);
    }
  }

  return (
    <div>
      <h2>{mode}</h2>
      <p>{description}</p>
      {p1Confirmed?
      <>
        {p1Name}
        <button onClick={()=>cancelName(1)}>Cancel</button>
      </>
        :
        <div>
          <label>Player 1 Name</label>
          <input value={p1Name} name='name' onChange={(e)=>handleNameChange(e,1)}/>
          <button onClick={()=>confirmName(1)}>Enter</button>
        </div>
      }
      {mode === 'multi'?
        <div>
          <label>Player 2 Name</label>
          <input value={p2Name} name='name' onChange={(e)=>handleNameChange(e,2)}/>
          <button onClick={()=>confirmName(2)}>Enter</button>
        </div>
        :
        <div>Your opponent is Computer Snake, and he is quite fast</div>
      }
      <label>Score Limit</label>
      <input value={limit} name='limit' onChange={handleScore}/>
      <button onClick={confirmName}>Enter</button>
      <button onClick={handleStart}>Start Game</button>
      {start &&
        <Board mode={mode}/>
      }
    </div>
  )
};

export default GameRulesAndControls;