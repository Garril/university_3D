import React, { memo, Fragment } from 'react';

// 组件
import Build from './pages/build/index'
import Modal from './pages/classTable/index'
import Weather from './pages/weather/index'
import ExitButton from './components/exitButton/index'

const App = memo(() => {
  return (
    <>
      <Build></Build>
      <Modal></Modal>
      <Weather></Weather>
      <ExitButton></ExitButton>
    </>
  )
})

export default App;