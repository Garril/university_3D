import React from 'react';
import './App.css';
import Mode from './components/Mode'

//机房对象
let room: Mode
//canvas画布
let canvas:HTMLCanvasElement
class App extends React.Component {

  componentDidMount() {
    if (!canvas) { return }
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    room=new Mode(canvas)
    room.loadGLTF('university.gltf')
    room.animate()
  }
  // 建立canvas 画布，并通过ref 获取其HTMLCanvasElement对象
  render() {
    return <div className="App">
      <canvas
        id='canvas'
        ref={ele => canvas = ele}
      ></canvas>
    </div>
  }
}

export default App;