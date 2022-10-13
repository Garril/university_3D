import { useState, memo, useEffect, useCallback } from 'react';
import './style.css';
import Mode from '../../components/Mode';

import { connect, useSelector, shallowEqual } from 'react-redux';

//建筑对象
let room: Mode
//canvas画布
let canvas:HTMLCanvasElement

const Build = memo((props: any) => {
  //信息面板的位置
  const [buildPos,setBuildPos] = useState({ left: 0, top: 0});
  //信息面板的可见性
  const [buildDisplay,setBuildDisplay] = useState('none');
  // 建筑信息
  const [curBuild,setCurBuild] = useState({ bname:'未命名' });

  useEffect(() => {
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
          setCurBuild({ bname: '教一'});
          break;
        case 'build_02':
          setCurBuild({ bname: '教二'});
          break;
        case 'build_03':
          setCurBuild({ bname: '教三'});
          break;
        case 'build_04':
          setCurBuild({ bname: '教四'});
          break;
        case 'build_05':
          setCurBuild({ bname: '教五'});
          break;
        case 'build_06':
          setCurBuild({ bname: '教六'});
          break;
        default:
          break;
      }
      setBuildDisplay('block');
    }
    //当鼠标在建筑上移动，让信息面板随鼠标移动
    room.onMouseMoveBuild = (left,top) => {
      setBuildPos({ left, top})
    }
    //当鼠标划出建筑，隐藏信息面板
    room.onMouseOutBuild = () => {
      setBuildDisplay('none');
    }
    room.onMouseClickBuild = (bid: string) => {
      let _data = '2022-10-13';
      if(bid) {
        console.log(bid);
      }
    }    
  }, []);

  // 鼠标移动事件
  const mouseMove = ({clientX,clientY}) => {
    room?.selectBuild(clientX, clientY)
  };
  
  // 建立canvas 画布，并通过ref 获取其HTMLCanvasElement对象
  return <div className="build_box" onMouseMove={mouseMove}>
    <canvas
      id='canvas'
      ref={ele => canvas = ele}
    ></canvas>
    <div
      id='build'
      style={{ left: buildPos.left, top: buildPos.top, display: buildDisplay }}>
      <p>建筑名称：{ curBuild.bname }</p>
    </div>
  </div>
})

export default Build;