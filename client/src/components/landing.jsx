import React from 'react';

const Landing = ({chooseMode}) => {
  return (
    <div>
      <button onClick={()=>chooseMode('single')}>Single Player</button>
      <button onClick={()=>chooseMode('multi')}>Multi Player</button>
    </div>
  )
};

export default Landing;