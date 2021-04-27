import React, {useState, useEffect, useContext} from 'react';
import Board from './board.jsx';
import styles from './styles.module.css';
import ColorPicker from './colorPicker.jsx';
import SocketContext from '../socketContext.jsx';

const GameRulesAndControls = ({data, getStart}) => {
  const socket = useContext(SocketContext);
  const {mode, description} = data;
  const [start, setStart] = useState(false);
  const [p1Name,setP1Name] = useState('Python');
  // const [p1Confirmed,setConfirmed] = useState(false);
  // const [p2Confirmed,setConfirmed2] = useState(false);
  // const [scoreConfirm,setScoreConfirm] = useState(false);
  const [p2Name,setP2Name] = useState('Anaconda');
  const [limit, setLimit] = useState(10);

  const [p1Ready, setP1Ready] = useState(false);
  const [p2Ready, setP2Ready] = useState(false);

  const [p2Color, getColor] = useState('#181946');

  // Single player
  // player name and color

  // score limit

  // color picker

  // Mutiplayer
  // player 1 name and color
  // player 2 name and color
  // score limit

  const handleP1Ready = () => {
    socket.emit('p1Ready', !p1Ready);
  };

  const handleP2Ready = () => {
    socket.emit('p2Ready', !p2Ready);
  };

  const handleNameChange = (e,player) => {
    if (player === 1) {
      setP1Name(e.target.value);
      console.log(p1Name)
    } else {
      setP2Name(e.target.value);
      console.log(p2Name)

    }
  };

  const io_sendNames= (p1Name,p2name) => {
      socket.emit('p1Name', p1Name);
      socket.emit('p2Name', p2Name);
  }

  const handleScore = (e) => {
    setLimit(e.target.value);
  }


  const handleStart = () => {
    // send these two names to server
    if (mode === 'multi') {
      io_sendNames(p1Name,p2Name);
      socket.emit('start', true);
    } else {
      setStart(true);
    }
    getStart(true);

  };

  useEffect(()=>{
    if (mode === 'multi') {
      socket.on('p1Ready', ready=>{
        setP1Ready(ready);
      });
      socket.on('p2Ready', ready=>{
        setP2Ready(ready);
      });
      socket.on('p1Name', name=>{
        setP1Name(name);
      });
      socket.on('p2Name', name=>{
        setP2Name(name);
      });
      socket.on('start', start=>{
        setStart(true);
      });
    }

  },[p1Name,p2Name,p1Ready,p2Ready,start,mode])


  if (start) {
    return (
    <Board socket={socket} limit={limit} player={mode==='single' && p1Name} p2Color={p2Color} mode={mode}/>
    )

  } else {
    return (
      <div className={styles.gameRules}>
        <div className={styles.inputContainer}>
          <div className={styles.inputLeft}>
          <div className={styles.input}>
            <label>Player 1 Name</label>
            <div className={styles.inputAndReady}>
              <input value={p1Name} name='name' onChange={(e)=>handleNameChange(e,1)} required/>
              {mode === 'multi' &&
              <button onClick={handleP1Ready} className={styles.ready}>{p1Ready? 'Not Ready':'Ready!'}</button>
              }
            </div>
            <ColorPicker getColor={getColor}/>
          </div>
        {mode === 'multi'&&
          <div className={styles.input}>
            <label>Player 2 Name</label>
            <div className={styles.inputAndReady}>
              <input value={p2Name} name='name' onChange={(e)=>handleNameChange(e,2)} required/>
              {mode === 'multi' &&
                <button onClick={handleP2Ready} className={styles.ready}>{p2Ready? 'Not Ready':'Ready!'}</button>
               }
            </div>
            <ColorPicker getColor={getColor}/>
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
          <div className={styles.startContainer}> <button onClick={handleStart} >Start Game</button></div>
      </div>
    )
  };
};

export default GameRulesAndControls;