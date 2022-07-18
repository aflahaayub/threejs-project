import * as THREE from 'three'
import { DoubleSide, Group, Mesh } from 'three'
import Experience from '../Experience'
import gsap from 'gsap'

import vertexShader from '../Shaders/Intro/vertex.glsl'
import fragmentShader from '../Shaders/Intro/fragment.glsl'
import Ionosphere from './Ionosphere'


export default class Los{
  constructor(){
    this.experience = new Experience()
    this.scene = this.experience.LosScene

    this.resources = this.experience.resources
    this.debug = this.experience.debug
    this.time = this.experience.time
    this.camera = this.experience.camera
    this.overlay = this.experience.overlay
    this.renderer = this.experience.renderer

    this.setLoading()
    this.setLos()
    this.setArrow()
    this.sceneButton()
    this.getTick()
  }

  setLoading(){

    this.overlayGeometry = new THREE.PlaneBufferGeometry(2,2,1,1)
      this.overlayMaterial = new THREE.ShaderMaterial({vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        transparent: true,
        uniforms:{
            uAlpha: {value: 1}
        }
    })
      this.overlay = new THREE.Mesh(this.overlayGeometry, this.overlayMaterial)

      this.scene.add(this.overlay)

    this.loadingBarElement = document.querySelector('.loading-bar')

    gsap.delayedCall(0.5, ()=>{
      gsap.to(this.overlayMaterial.uniforms.uAlpha, {duration: 2, value: 0})

      // this.setSea()
      this.loadingBarElement.classList.add('ended')
      this.loadingBarElement.style.transform = ``
    })


  }
  

  setLos(){

    this.los = {}
    this.los.model = this.resources.items.losModel.scene
    console.log(this.los.model)
    console.log(this.resources.items)

    this.los.color = this.resources.items.groundColor
    this.los.color.encoding= THREE.sRGBEncoding
    this.los.color.wrapS = THREE.RepeatWrapping
    this.los.color.wrapT = THREE.RepeatWrapping
    this.los.color.repeat.set(6,4)
    this.los.color.offset.set(0.005,0.005)

    this.los.normal = this.resources.items.groundNormal
    this.los.normal.wrapS = THREE.RepeatWrapping
    this.los.normal.wrapT = THREE.RepeatWrapping

    this.los.material= new THREE.MeshStandardMaterial({
      map: this.los.color,
      normalMap: this.los.normal
    })

    this.los.model.children[0].material = this.los.material

    this.los.model.rotation.y = Math.PI/2
    this.scene.add(this.los.model)


    //light
    this.sunLight = new THREE.DirectionalLight('#F7DC6F', 4)
    this.sunLight.castShadow = true
    this.sunLight.shadow.camera.far = 5
    this.sunLight.shadow.mapSize.set(1024, 1024)
    this.sunLight.shadow.normalBias = 0.05
    this.sunLight.position.set(3.5, 2, 1.25)

    //color bg
    this.renderer.instance.setClearColor('#AEB6BF')

    this.scene.add(this.sunLight)
  }

  setArrow(){
    this.arrowGroup = new Group()

    this.arrowGeo = new THREE.PlaneBufferGeometry(8,0.05,128,128)

    this.arrowMat= new THREE.ShaderMaterial({
        side: THREE.DoubleSide,
        uniforms:
        {
            uTime: { value: 0 }
        },
        vertexShader: `
        
        uniform vec2 uFrequency;
        uniform float uTime;

        attribute float aRandom;
        varying float vRandom; 

        varying vec2 vUV;

        void main(){
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);

          modelPosition.y += sin(modelPosition.x * 10.0 - uTime) * 0.1;

          vec4 viewPosition= viewMatrix * modelPosition;
          vec4 projectedPosition = projectionMatrix * viewPosition;

          gl_Position = projectedPosition;
          vUV = uv;
        }
        `,
        fragmentShader: `
        uniform vec3 uColor;
        uniform sampler2D uTexture; 
        varying vec2 vUV;

        void main(){
      
          gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
        }
        `
    })

      this.arrow = new THREE.Mesh(this.arrowGeo, this.arrowMat)
      this.arrow.position.set(-.3, 4.3, -0.45)
      this.arrow.rotateX(Math.PI/2)

    this.scene.add(this.arrow)
  }

  sceneButton(){
    document.querySelector('.back-scene').classList.add('visible')
    // document.querySelector('.next-scene').classList.add('visible')


    document.querySelector(`.back-scene`).onclick =()=>{
      document.querySelector('.next-scene').classList.remove('visible')
      document.querySelector('.back-scene').classList.remove('visible')

      this.renderer.instance.setClearColor('#211d20')
      this.ion = new Ionosphere()
      this.renderer.setIonScene
    }

    // document.querySelector(`.next-scene`).onclick =()=>{
  
    //   document.querySelector('.next-scene').classList.remove('visible')
    //   this.renderer.instance.setClearColor('#211d20')
    //   this.ion = new Ionosphere()
    //   this.renderer.setIonScene()
    // }
  }

  getTick(){
    this.otherTick = ()=>{
      this.arrowMat.uniforms.uTime.value = this.time.elapsed * 0.01

      this.camera.controls.update()

     window.requestAnimationFrame(this.otherTick)
    }
   this.otherTick()
  }
}
