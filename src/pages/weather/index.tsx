import React, { useState } from 'react';
import './style.css'
import { RightOutlined, LeftOutlined } from '@ant-design/icons';

import WeatherReport from './weatherReport/index'

const App: React.FC = () => {
  const [isLeft,setIsLeft] = useState(false);

  const changeWeatherShow = (sign) => {
    setIsLeft(sign);
  }
  return (
    <div id="wea_container"
      className={isLeft ? 'web_not_show' : 'web_is_show'}>
      <div id='wea_report'>
        <WeatherReport></WeatherReport>
      </div>
      <span id='arrow' 
        onClick={() => changeWeatherShow(!isLeft)}
        className={isLeft ? 'left_is_show' : 'left_not_show'}>
        {
            isLeft ? 
            <LeftOutlined></LeftOutlined> 
          : <div>
              <span>天气</span>
              <RightOutlined></RightOutlined>
            </div>
        }
      </span>
    </div>
  );
};

export default App;
