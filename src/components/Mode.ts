import {
  MeshBasicMaterial,MeshStandardMaterial,
  Mesh, PerspectiveCamera,Raycaster,
  Scene,Texture,TextureLoader,
  WebGLRenderer, Vector2, Color, RGBAFormat
} from 'three'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

// GLTF 模型加载器
const gltfLoader=new GLTFLoader()
//射线投射器，可基于鼠标点和相机，在世界坐标系内建立一条射线，用于选中模型
const raycaster = new Raycaster()
//鼠标在裁剪空间中的点位
const pointer = new Vector2()


export default class Mode{
  // 渲染器
  renderer: WebGLRenderer
  // 场景
  scene: Scene
  // 相机
  camera: PerspectiveCamera
  // 轨道控制器
  controls: OrbitControls
  // 存放模型文件的目录
  modelPath: string
  // 纹理集合
  maps:Map<string,Texture> = new Map();


  //建筑集合
  Builds: Mesh[] = []
  //鼠标划入的建筑
  curBuild:Mesh
  //鼠标划入建筑事件，参数为建筑对象
  onMouseOverBuild = (Build:Mesh) => { }
  //鼠标在建筑上移动的事件，参数为鼠标在canvas画布上的坐标位
  onMouseMoveBuild = (x:number,y:number) => { }
  //鼠标划出建筑的事件
  onMouseOutBuild = () => { }
  // 点击建筑
  onMouseClickBuild = (index:String) => {}

  pre_color: Color[] = []


  // 初始化场景
  constructor(canvas: HTMLCanvasElement,modelPath: string = './models/') {
    
    // console.log("canvas: ",canvas);
    this.renderer = new WebGLRenderer({ canvas })
    this.scene = new Scene()
    this.camera = new PerspectiveCamera(
      45, canvas.width / canvas.height, 0.1, 1000
    )
    this.camera.position.set(0, 10, 15)
    this.camera.lookAt(0, 0, 0)
    this.controls = new OrbitControls(
      this.camera,
      this.renderer.domElement
    );
    this.modelPath = modelPath

    this.renderer.setClearColor(new THREE.Color(0x666666))

  }

  // 加载GLTF模型
  loadGLTF(modelName: string = '') {
    // console.log("path: ",this.modelPath + modelName);

    gltfLoader.load(this.modelPath + modelName, ({ scene: { children } }) => {

      console.log("children:",...children);

      children.forEach((obj:Mesh,index) => {
        if(obj.material) { // 只有 Floor会走这里
          // console.log("obj",obj);
          // console.log(obj.material)
          const { map,color} = obj.material as MeshStandardMaterial;
          this.changeMat(obj,map,color);
        }
        if(obj.name.includes('build')) { // 把建筑全push到数组内
          this.Builds.push(obj);
        }

      })
      this.scene.add(...children);

    })
    this.scene.add(new THREE.AmbientLight(0xFFFFFF));//环境光
    this.scene.traverse( function ( child:Mesh ) {
      if ( child.isMesh) {
        child.material['emissive'] =  child.material['color'];
        child.material['emissiveMap'] = child.material['map'];
      }
    });

    // 监听点击事件
    this.renderer.domElement.addEventListener(
      "click",
      event => {
        const mouse = new THREE.Vector2();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, this.camera);
        const intersects = raycaster.intersectObjects(this.Builds)[0];
        const index = intersects?.object?.parent?.name.slice(6);
        this.onMouseClickBuild(index);
      }
    ) 
  }

  // 修改材质
  changeMat(obj: Mesh, map: Texture, _color: Color) {
    if (map) {
      obj.material = new MeshBasicMaterial({
        map: this.crtTexture(map.name)
      })
    } else { // floor的map为undefined
      // obj.material = new MeshBasicMaterial({color})
      let color: Color = new THREE.Color(0x9C9C9C); // 给地板换色
      obj.material = new MeshBasicMaterial({color})
    }
  }

  crtTexture(imgName: string) {
    let curTexture=this.maps.get(imgName)
    if (!curTexture) {
      curTexture=new TextureLoader().load(this.modelPath+imgName)
      curTexture.flipY = false
      curTexture.wrapS = 1000
      curTexture.wrapT = 1000
      this.maps.set(
        imgName,
        curTexture
      )
    }
    return curTexture
  }

  // 连续渲染
  animate() {
    this.renderer.render(this.scene, this.camera)
    requestAnimationFrame(() => {
      this.animate()
    })
  }

  // 选择build
  selectBuild(x:number, y:number) {
    const {Builds,renderer,camera,maps,curBuild}=this
    const { width, height } = renderer.domElement

    // 鼠标的canvas坐标转裁剪坐标
    pointer.set(
      (x / width) * 2 - 1,
      -(y / height) * 2 + 1,
    )
    // 基于鼠标点的裁剪坐标位和相机设置射线投射器
    raycaster.setFromCamera(
      pointer, camera
    )
    // 选择建筑
    const intersect = raycaster.intersectObjects(Builds)[0]
    // 在你指向一个建筑的时候，intersectObj比上面拿到的curBuild先获取到目标建筑对象，之后两者一致
    let intersectObj = intersect? intersect.object as Mesh : null

    // 若之前已有建筑被选择，且不等于当前所选择的建筑，取消之前选择的建筑的高亮
    if (curBuild && curBuild !== intersectObj) {
      // const material = curBuild.material as MeshBasicMaterial;
      let arr = curBuild.parent.children;
      arr.forEach((obj:Mesh,index) => {
        let _material = obj.material as MeshBasicMaterial;
        _material.color = new THREE.Color(this.pre_color[index]);
        _material.opacity = 1;//透明度
      });
    }

    /* 
      若当前所选对象不为空：
        触发鼠标在建筑上移动的事件。
        若当前所选对象不等于上一次所选对象：
          更新curBuild。
          将模型高亮。
          触发鼠标划入建筑事件。
      否则若上一次所选对象存在：
        置空curBuild。
        触发鼠标划出建筑事件。
    */

      
    if (intersectObj) { // 说明鼠标获取到了目标建筑
      this.onMouseMoveBuild(x,y) // 主要是获取位置，好去显示信息面板
      if (intersectObj !== curBuild) {
        this.curBuild = intersectObj
        const material = intersectObj.material as MeshBasicMaterial
        let arr = intersectObj.parent.children;

        arr.forEach((obj:Mesh) => {
          let _material = obj.material as MeshBasicMaterial;
          _material.transparent = true;//是否透明
          _material.opacity = 0.6;//透明度
          this.pre_color.push(_material.color);
          // _material.color = new THREE.Color('rgb(107, 105, 81)');
        })

        this.onMouseOverBuild(intersectObj)
      }
    } else if(curBuild) {
      this.curBuild = null
      this.onMouseOutBuild()
    }
  }
}