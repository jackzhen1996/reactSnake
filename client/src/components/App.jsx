import React, {useState} from 'react';
import styles from './styles.module.css';
import Landing from './landing.jsx';
import RulesAndControls from './game/gameRulesAndControls.jsx';
import Title from './title.jsx';
import SocketContext from './socketContext.jsx';
const ENDPOINT = `http://localhost:${process.env.PORT}`;
import socketIOClient from 'socket.io-client';
const socket = socketIOClient(ENDPOINT,
    {
      withCredential:true,
      transportOptions: {
        polling: {
          extraHeaders: {
            'my-custom-header': 'abcd'
          }
        }
      }
    }
  );

const singlePlayer = {
  mode :'single',
  description: "You vs a computer controlled snake. You'll probably lose LOL. Use arrow keys to control",
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
    <SocketContext.Provider value={socket}>
    <div className = {styles.app}>
      <Title/>
      {
        !start?

        single?
        <div className={styles.description}>{singlePlayer.description}</div>
        :
        <div className={styles.description}>{multiPlayer.description}</div>

        :
        null
      }
      {!start?
        <Landing chooseMode={chooseMode}/>
        :
      null}
      {
        single?
        // description of game rules and controls for both modes, game starts after pressing start
        <RulesAndControls getStart={setStart} data={singlePlayer}/>
          :
        <RulesAndControls getStart={setStart} data={multiPlayer}/>
      }
    </div>
    </SocketContext.Provider>
  )
};

export default App;