import React from 'react';

const Landing = ({chooseMode}) => {
  return (
    <div>
      <button onClick={chooseMode}>Single Player</button>
      <button onClick={chooseMode}>Multi Player</button>
    </div>
  )
};

export default Landing;