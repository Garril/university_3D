import { Slider } from 'antd';
import React, { useState, useMemo }  from 'react';

interface AppProps {
  night_tem: string;
  day_tem: string;
  tem?: string;
}

const App: React.FC<AppProps>= (props) => {
  const [data, setData] = useState(props);
  const defaultValue = useMemo(() => {
    if(data) {
      let sum = parseInt(data.day_tem) + parseInt(data.night_tem);
      return sum/2;
    } else {
      return 20;
    }
  }, [data]);
  return (
    <>
      <Slider
        defaultValue={defaultValue}
        disabled={true}
        max={parseInt(data?.day_tem)}
        min={parseInt(data?.night_tem)}/>
    </>
  );
}

export default App;