import React from 'react';
import './App.css';
import Mode from './components/Mode'

//建筑对象
let room: Mode
//canvas画布
let canvas:HTMLCanvasElement
class App extends React.Component {

  state = {
  	//信息面板的位置
    buildPos: {
      left: 0,
      top:0
    },
    //信息面板的可见性
    buildDisplay: 'none',
    //建筑信息
    curBuild: {
      bname:'未命名',
    }
  }

  componentDidMount() {
    if (!canvas) { return }
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    room = new Mode(canvas)
    room.loadGLTF('university.gltf')
    room.animate()
    // 显示信息面板
    room.onMouseOverBuild = (e) => {
      const curName = e.parent.name;
      switch (curName) {
        case 'build_01':
          this.setState({ buildDisplay:'block', curBuild:{ bname: '教一'} });
          break;
        case 'build_02':
          this.setState({ buildDisplay:'block', curBuild:{ bname: '教二'} })
          break;
        case 'build_03':
          this.setState({ buildDisplay:'block', curBuild:{ bname: '教三'} })
          break;
        case 'build_04':
          this.setState({ buildDisplay:'block', curBuild:{ bname: '教四'} })
          break;
        case 'build_05':
          this.setState({ buildDisplay:'block', curBuild:{ bname: '教五'} })
          break;
        case 'build_06':
          this.setState({ buildDisplay:'block', curBuild:{ bname: '教六'} })
          break;
        default:
          this.setState({ buildDisplay:'block' })
      }
    }
    //当鼠标在建筑上移动，让信息面板随鼠标移动
    room.onMouseMoveBuild = (left,top) => {
      this.setState({
        buildPos: { left, top }
      })
    }
    //当鼠标划出建筑，隐藏信息面板
    room.onMouseOutBuild = () => {
      this.setState({
        buildDisplay: 'none'
      })
    }
  }

  // 鼠标移动事件
  mouseMove({clientX,clientY}) {
    room.selectBuild(clientX, clientY)
  }
  
  
  // 建立canvas 画布，并通过ref 获取其HTMLCanvasElement对象
  render() {
    const {
      buildPos: { left, top },
      buildDisplay: display,
      curBuild:{ bname }
    } = this.state

    return <div className="App" onMouseMove={this.mouseMove}>
      <canvas
        id='canvas'
        ref={ele => canvas = ele}
      ></canvas>
      <div
        id='build'
        style={{ left, top, display }}>
        <p>建筑名称：{ bname }</p>
      </div>
    </div>
  }
}

export default App;