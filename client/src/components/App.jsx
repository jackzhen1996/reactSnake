import React, {useState} from 'react';
import styles from './styles.module.css';
import Landing from './landing.jsx';
import RulesAndControls from './game/gameRulesAndControls.jsx';

const singlePlayer = {
  mode :'single',
  description: 'You vs a conmputer controlled snake',
}

const multiPlayer = {
  mode :'multi',
  description: 'You vs another player',
}

const App = () => {
  // 0 for single, 1 for double
  const [single,changeMode] = useState(true);
  const [start, setStart] = useState(false);

  const chooseMode = (mode) => {
    changeMode(mode==='single'?true:false);
  }

  return (
    <div className = {styles.app}>
      <Landing chooseMode={chooseMode}/>
      {
        single?
        // description of game rules and controls for both modes, game starts after pressing start
        <RulesAndControls data={singlePlayer}/>
          :
        <RulesAndControls data={multiPlayer}/>
      }
    </div>
  )
};

export default App;