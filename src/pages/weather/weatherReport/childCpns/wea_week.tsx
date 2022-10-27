import React, { useState } from 'react';
import './wea_week.css'

import WeaSlide from './wea_slide'

interface weekItem {
  week: string;
  day_tem: string;
  night_tem: string;
  day_wea_img: string;
}
interface AppProps {
  week: Array<weekItem>;
}
const App: React.FC<AppProps> = (props) => {

  // console.log("props_week",props.week)
  return (
    <div id="weather_week">
      <div className='week_title'>{props?.week?.length + "日天气预报"}</div>
      <div className='week_list'>
        {
          props?.week?.map((item,index) => {
            return (
              <div className='week_item' key={index}>
                <div className='week_left'>
                  <span className='week'>{item.week}</span>
                  <span className='day_wea_img'>
                    <img src={require('../../../../assets/img/wea/'+item.day_wea_img + '.png')} alt="" />
                  </span>
                </div>
                <div className='week_right'>
                  <span className='night_tem'>{item.night_tem+'°'}</span>
                  <span className='tem_mid_line'>
                    <WeaSlide {...item}></WeaSlide>
                  </span>
                  <span className='day_tem'>{item.day_tem+'°'}</span>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default App;
