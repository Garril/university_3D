import React, { memo, Fragment } from 'react';

// 组件
import Build from './pages/build/index'
import Modal from './pages/modal/index'

const App = memo(() => {
  return (
    <>
      <Build></Build>
      <Modal></Modal>
    </>
  )
})

export default App;