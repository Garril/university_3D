import React, { useState } from 'react';
import store from '../../store';
import {
  changeTabelOpenStatus
} from '../../store/actionCreators'
import './style.css'
import ClassList from './childComps/classList'

const App: React.FC = () => {
  
  const [open,setOpen] = useState(false);
  const handleCancel = () => {
    store.dispatch(changeTabelOpenStatus(false));
  };
  store.subscribe(() => {
    setOpen(store.getState().open)
  })

  return (
    <div id="class_container" className={open?'display_block':'display_none'}>
      <header onClick={handleCancel} className='header'>
        <span className='title'>教学一号楼</span>
        <span className='middle'></span>
        <span className='close'>×</span>
      </header>
      <ClassList></ClassList>
    </div>
  );
};

export default App;