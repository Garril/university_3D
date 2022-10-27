import React, { useState } from 'react';
import './wea_today.css'

interface AppProps {
  city: string;
  tem: string;
  hum: string;
  wea: string;
  wea_img: string;
  day_tem: string;
  night_tem: string;
  win: string;
  hours: Array<any>;
  week: string;
}
const App: React.FC<AppProps> = (props) => {
  // console.log("props_today",props)
  return (
    <div id="weather_today">
      <div className='title'>{props?.city + '区'}</div>
      <span className='tem'>{props?.day_tem+'°'}</span>
      <div className='wea'>{props?.wea}</div>
      <div className='range'>{"最高" + props?.day_tem + '°' + "最低" + props?.night_tem + '°' }</div>
    </div>
  );
};

export default App;
