import React, { useState, useCallback, useEffect } from 'react';
import './index.css';
import WeaInfoToday from './childCpns/wea_today';
import WeaInfoHours from './childCpns/wea_hours';
import WeaInfoWeek from './childCpns/wea_week';

import {
  getWeatherInfo
} from '../../../service/weather'

const App: React.FC = () => {

  const [weaInfo, setWeaInfo] = useState(null);

  const getWeaInfo = useCallback(() => {
    if(!weaInfo) {
      getWeatherInfo().then(res => {
        console.log("request",res);
        setWeaInfo(res);
      })
    }
  }, []);

  useEffect(() => {
    getWeaInfo()
  }, [getWeaInfo]);
  
  return (
    <div id="weather_report">
      <WeaInfoToday {...weaInfo?.today}></WeaInfoToday>
      <WeaInfoHours {...weaInfo?.today}></WeaInfoHours>
      <WeaInfoWeek week={weaInfo?.week}></WeaInfoWeek>
    </div>
  );
};

export default App;
