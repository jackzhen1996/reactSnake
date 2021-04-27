import React, {useState} from 'react';
import styles from './styles.module.css';

const Landing = ({chooseMode}) => {
  const [toggle, setToggle] = useState('single');

  const handleClick = (mode) => {
    if (mode === 'single') {
      setToggle('single');
    } else {
      setToggle('multi');
    }
    chooseMode(mode);
  }

  const regularStyle={
    color: '#181946'
  }

  const focusStyle = {
    borderBottom: '10px solid #181946',
    color: '#181946'
  };

  return (
    <div className={styles.landing}>
      <button style={toggle==='single'? focusStyle: regularStyle} onClick={()=>handleClick('single')}>Single Player</button>
      <button style={toggle==='multi'? focusStyle: regularStyle} onClick={()=>handleClick('multi')}>Two Players<span style={{fontSize:'12px'}}> (In progress)</span></button>
    </div>
  )
};

export default Landing;