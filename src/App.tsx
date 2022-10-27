import React, { memo, Fragment } from 'react';

// 组件
import Build from './pages/build/index'
import Modal from './pages/classTable/index'
import Weather from './pages/weather/index'

const App = memo(() => {
  return (
    <>
      <Build></Build>
      <Modal></Modal>
      <Weather></Weather>
    </>
  )
})

export default App;