import React from 'react';
import styles from './styles.module.css';

const title = ['S','N','A','K','E'];

const Title =()=> {
  return (
    <div className={styles.title}>
      {
        title.map((letter,k)=>{
          return (
            <div className={styles.letter} key={k}>{letter}</div>
          )
        })
      }
    </div>
  )
};

export default Title;