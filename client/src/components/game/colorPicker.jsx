import React, {useState} from 'react';
import styles from './styles.module.css';

const colors = ['#181946', '#90C24D', '#E14375', '#EFAE08', '#16AECF'];

const ColorPicker = ({getColor}) => {
  const [index, setIndex] = useState(0);

  const getSelectedColor = (k) => {
    setIndex(k);
    console.log(colors[k])
    getColor(colors[k]);
  }

  return (
    <div className={styles.colorGroup}>
      Color
      {
        colors.map((color,k)=>{
          return (
            <button key={k} onClick={()=>getSelectedColor(k)} style={{backgroundColor:color, border: k === index? '5px solid #C1C3D8':null
            }}/>
          )
        })
      }
    </div>
  )
}

export default ColorPicker;