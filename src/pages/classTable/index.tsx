import React, { useState } from 'react';
import './style.css'

// store
import store from '../../store';
import {
  changeTabelOpenStatus,
  changeEmptyTableStatus
} from '../../store/actionCreators'

// 组件
import ClassList from './classList/classList'

import { // 工具函数
  translateWeek
} from '../../utils/date'

const App: React.FC = () => {
  
  const [open,setOpen] = useState(false);
  const [cur_bid,setCurBid] = useState('0');
  const [cur_week,setCurWeek] = useState('一');

  const handleCancel = () => {
    store.dispatch(changeTabelOpenStatus(false));
  };
  const changeIsEmpty = (sign) => {
    store.dispatch(changeEmptyTableStatus(sign))
  }
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
      <header className='header'>
        <span className='title add_border add_hover' onClick={() => changeIsEmpty(false)}>{parseInt(cur_bid) <= 6 ? ('教' + cur_bid + '-周' + translateWeek(cur_week) + '-课表') : ((parseInt(cur_bid) - 6) + "号大教室" + '-周' + translateWeek(cur_week) + '-课表')}</span>
        <span className='title add_border add_hover' onClick={() => changeIsEmpty(true)}>空闲教室</span>
        <span className='middle'></span>
        <span className='close' onClick={handleCancel}>×</span>
      </header>
      <div id='list'>
        <ClassList></ClassList>
      </div>
    </div>
  );
};

export default App;