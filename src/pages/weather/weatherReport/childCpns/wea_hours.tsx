import React, { useState } from 'react';
import './wea_hours.css'

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
    <div id="weather_hours">
      <div className='hum'>
        <span>{"风向: "+ props?.win}</span>
        <span>{"湿度: " + props?.hum}</span>
      </div>
      <div id='hours_container'>
        {
          props?.hours?.map((item,index) => {
            return index<=5 ? (
              <div className='hours_item' key={index}>
                <div className='hours_time hours_pos'>{index == 0 ? "现在": item.time}</div>
                <div className='hours_wea_img hours_pos'>
                  <img src={ require('../../../../assets/img/wea/'+item.wea_img + '.png') } alt="" />
                </div>
                <div className='hours_tem hours_pos'>{item.tem}</div>
              </div>
            ): null
          })
        }
      </div>
    </div>
  );
};

export default App;
