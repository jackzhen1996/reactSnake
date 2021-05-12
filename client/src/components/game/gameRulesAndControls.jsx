import React, { useState, useEffect, useContext } from "react";
import Board from "./board.jsx";
import styles from "./styles.module.css";
import ColorPicker from "./colorPicker.jsx";
import SocketContext from "../socketContext.jsx";

const GameRulesAndControls = ({ data, getStart }) => {
  const socket = useContext(SocketContext);
  const [roomId, setRoomId] = useState(null);
  const { mode, description } = data;
  const [start, setStart] = useState(false);
  const [p1Name, setP1Name] = useState("Python");
  const [p2Name, setP2Name] = useState("Anaconda");
  const [limit, setLimit] = useState(10);
  const [host, isHost] = useState(true);

  const [playerList, setPlayerList] = useState([]);

  const [p1Ready, setP1Ready] = useState(false);
  const [p2Ready, setP2Ready] = useState(false);

  const [p1Color, getColor1] = useState("#181946");
  const [p2Color, getColor2] = useState("#181946");

  const socket_send = (type, data) => {
    const obj = { data, roomId };
    socket.emit(type, obj);
  };

  const handleP1Ready = () => {
    socket_send("p1Ready", !p1Ready);
    socket_send('p1Name',p1Name);
  };

  const handleP2Ready = () => {
    socket_send("p2Ready", !p2Ready);
    socket_send('p2Name',p2Name);
  };

  const handleNameChange = (e, player) => {
    if (player === 1) {
      setP1Name(e.target.value);
    } else {
      setP2Name(e.target.value);
    }
  };

  const io_sendNames = (p1Name, p2name) => {
    socket_send("p1Name", p1Name);
    socket_send("p2name", p2Name);
  };

  const io_sendColor1 = (color) => {
    socket_send("p1Color", color);
  };

  const io_sendColor2 = (color) => {
    socket_send("p2Color", color);
  };

  const handleScore = (e) => {
    setLimit(e.target.value);
  };

  const handleStart = () => {
    // send these two names to server
    if (mode === "multi") {
      socket_send("start", true);
    } else {
      setStart(true);
    }
    getStart(true);
  };

  useEffect(() => {
    if (mode === "multi") {
      socket.on("roomId", (id) => {
        setRoomId(id);
      });

      socket.on("playerList", (data) => {
        // determine if you are the host, which is also player 1
        const parsedData = JSON.parse(data);
        isHost(parsedData[0] === socket.id);
        setPlayerList(parsedData);
      });

      socket.on("p1Ready", (ready) => {
        setP1Ready(ready);
      });
      socket.on("p2Ready", (ready) => {
        setP2Ready(ready);
      });
      socket.on("p1Name", (name) => {
        setP1Name(name);
      });
      socket.on("p2Name", (name) => {
        setP2Name(name);
      });
      socket.on("start", (start) => {
        getStart(true);
        setStart(true);
      });
      socket.on("p1Color", (color) => {
        getColor1(color);
      });
      socket.on("p2Color", (color) => {
        getColor2(color);
      });
    }
  }, [p1Name, p2Name, p1Ready, p2Ready, start, mode, p1Color, p2Color]);

  if (start) {
    return (
      <Board
        p1Name={p1Name}
        p2Name={p2Name}
        socket={socket}
        limit={limit}
        player={mode === "single" && p1Name}
        p1Color={p1Color}
        p2Color={p2Color}
        mode={mode}
        roomId={roomId}
        host ={host}
      />
    );
  } else {
    return (
      <div className={styles.gameRules}>
        {mode === "multi" && <div>Room ID: {roomId}</div>}
        <div className={styles.inputContainer}>
          <div className={styles.inputLeft}>

            {mode === "multi" ? (
              <>
                <div className={styles.input}>
                  <label>
                    {host ? (
                      <span>You Are Host</span>
                    ) : null}
                    Player 1 Name
                  </label>
                  <div className={styles.inputAndReady}>
                    {host?
                    <input
                      value={p1Name}
                      name="name"
                      onChange={(e) => handleNameChange(e, 1)}
                      required
                    />
                    :
                      <div>{p1Name}</div>
                    }
                    {host ? (
                    <button onClick={handleP1Ready} className={styles.ready}>
                      {p1Ready ? "Ready!" : "Not Ready"}
                    </button>
                    ):
                    (
                      <div>{p1Ready ? "Ready!" : "Not Ready"}
                      </div>
                    )
                    }
                    {" "}
                  </div>
                  {host ?
                  <ColorPicker getColor={io_sendColor1} />
                  :
                  <div style ={{height:'50px', width: '50px', backgroundColor:p1Color}}></div>
                  }
                </div>

                {playerList.length === 2 &&
                (
                <div className={styles.input}>
                  <label>
                    {!host ? (
                      <span>You are P2</span>
                    ) : null}
                    Player 2 Name
                  </label>
                  <div className={styles.inputAndReady}>
                    {!host ?
                    <input
                      value={p2Name}
                      name="name"
                      onChange={(e) => handleNameChange(e, 2)}
                      required
                    />
                    :
                      <div>{p2Name}</div>
                    }
                    {!host ?
                    <button onClick={handleP2Ready} className={styles.ready}>
                      {p2Ready ? "Ready!" : "Not Ready"}
                    </button>
                    :
                    <div>{p2Ready ? "Ready!" : "Not Ready"}
                    </div>
                    }
                  </div>
                  {!host ?
                  <ColorPicker getColor={io_sendColor2} />
                  :
                  <div style ={{height:'50px', width: '50px', backgroundColor:p2Color}}></div>
                  }
                </div>
                )}
              </>
            ):
            // single player inputs
            (
              <div className={styles.input}>
              <label>Player 1 Name</label>
              <div className={styles.inputAndReady}>
                <input
                  value={p1Name}
                  name="name"
                  onChange={(e) => handleNameChange(e, 1)}
                  required
                />
              </div>
              <ColorPicker getColor={getColor1} />
            </div>
            )
            }
          </div>
          <div className={styles.inputRight}>
            <div className={styles.input}>
              <label>Score Limit</label>
              <div>
                <input
                  style={{ width: "25%" }}
                  value={limit}
                  name="limit"
                  onChange={handleScore}
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.startContainer}>
          {" "}
          {(p1Ready && p2Ready) || mode === 'single'?
          <button onClick={handleStart}>Start Game</button>
          :
          <div>
            Everyone Ready?
          </div>
          }
        </div>
      </div>
    );
  }
};

export default GameRulesAndControls;
