import {
  MeshBasicMaterial,MeshStandardMaterial,
  Mesh, PerspectiveCamera,Raycaster,
  Scene,Texture,TextureLoader,
  WebGLRenderer, Vector2, Color
} from 'three'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

// GLTF 模型加载器
const gltfLoader=new GLTFLoader()

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


  // 初始化场景
  constructor(canvas: HTMLCanvasElement,modelPath: string = './models/') {
    console.log("canvas: ",canvas);
    this.renderer = new WebGLRenderer({ canvas })
    this.scene=new Scene()
    this.camera = new PerspectiveCamera(
      45, canvas.width / canvas.height, 0.1, 1000
    )
    this.camera.position.set(0, 10, 15)
    this.camera.lookAt(0, 0, 0)
    this.controls = new OrbitControls(
      this.camera,
      this.renderer.domElement
    );
    this.modelPath=modelPath

    this.renderer.setClearColor(new THREE.Color(0x666666))
  }


  // 加载GLTF模型
  loadGLTF(modelName: string = '') {
    console.log("path: ",this.modelPath + modelName);

    gltfLoader.load(this.modelPath + modelName, ({ scene: { children } }) => {
      console.log("children:",...children);
      children.forEach((obj:Mesh) => {
        if(obj.material) {
          const { map,color} = obj.material as MeshStandardMaterial;
          this.changeMat(obj,map,color);
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
  }

  // 修改材质
  changeMat(obj: Mesh, map: Texture, color: Color) {
    if (map) {
      obj.material = new MeshBasicMaterial({
        map: this.crtTexture(map.name)
      })
    } else {
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
}