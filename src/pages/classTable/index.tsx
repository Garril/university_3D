import React, { useState } from 'react';
import store from '../../store';
import {
  changeTabelOpenStatus
} from '../../store/actionCreators'
import './style.css'
import ClassList from './childComps/classList'

import {
  translateWeek
} from '../../utils/date'

const App: React.FC = () => {
  
  const [open,setOpen] = useState(false);
  const [cur_bid,setCurBid] = useState('0');
  const [cur_week,setCurWeek] = useState('一');

  const handleCancel = () => {
    store.dispatch(changeTabelOpenStatus(false));
  };
  store.subscribe(() => {
    let data = store.getState();
    setOpen(data.open);
    setCurBid(data.cur_bid);
    setCurWeek(data.cur_week);
    // console.log("data:",data);
    // console.log("data.cur_bid:",data.cur_bid);
  })

  return (
    <div id="container" className={open?'display_block':'display_none'}>
      <header onClick={handleCancel} className='header'>
      <span className='title'>{parseInt(cur_bid) <= 6 ? ('教' + cur_bid + '-周' + translateWeek(cur_week) + '-课表') : ((parseInt(cur_bid) - 6) + "号大教室" + '-周' + translateWeek(cur_week) + '-课表')}</span>
        <span className='middle'></span>
        <span className='close'>×</span>
      </header>
      <div id='list'>
        <ClassList></ClassList>
      </div>
    </div>
  );
};

export default App;