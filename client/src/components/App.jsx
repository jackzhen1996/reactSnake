import React, {useState} from 'react';
import styles from './styles.module.css';
import Board from './game/board.jsx';
import Landing from './landing.jsx';

const App = () => {
  // 0 for single, 1 for double
  const [single,changeMode] = useState(true);

  const chooseMode = () => {
    changeMode(false);
  }


  return (
    <div className = {styles.app}>
      <Landing chooseMode={chooseMode}/>
      {
        single? 'single player': 'multiplayer'
      }
      <Board />
    </div>
  )
};

export default App;