import React, {useState, useContext} from 'react';
import RulesAndControls from './gameRulesAndControls.jsx';
import { v4 as uuidv4 } from 'uuid';
import SocketContext from '../socketContext.jsx';
import styles from './styles.module.css';

const Room = ({data, getStart}) => {
  const socket = useContext(SocketContext);
  const [newRoom,showRoom] = useState(false);
  const [roomId, setRoomId] = useState('');

  const createRoomAndId = () => {
    const newId = uuidv4();
    // send the uuid to server
    const obj = {host: socket.id, roomId: newId};
    socket.emit('createRoom',obj);
    // send uuid to the next screen
    // flip newRoom to true
    showRoom(true);
  };

  const handleChange =(e)=>{
    setRoomId(e.target.value);
  };

  const joinRoom = () => {
    const obj = {guest: socket.id, roomId: roomId};
    socket.emit('joinRoom',obj);
    showRoom(true);
  };

  if (newRoom) {
    return (<RulesAndControls data={data} getStart={getStart}/>);
  } else {
    return (
      <div>
        <h2>Room Setup</h2>
        <div className={styles.input}>
          <label>Enter room id</label>
          <button onClick={joinRoom}>Join Room</button>
          <input type='text' value={roomId} onChange={handleChange}></input>
        </div>
        <div>
          <button onClick={createRoomAndId}>Create Room</button>
        </div>
      </div>
    )
};
}

export default Room;