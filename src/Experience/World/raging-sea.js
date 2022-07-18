import * as THREE from 'three'
import Experience from '../Experience.js'
import vertex from '../Shaders/raging-sea/vertex.glsl'
import fragment from '../Shaders/raging-sea/fragment.glsl'

import vertexShader from '../Shaders/Intro/vertex.glsl'
import fragmentShader from '../Shaders/Intro/fragment.glsl'
import gsap from 'gsap'
import Planet from './Planet.js'
import Lab from './Lab.js'

export default class Sea{
  constructor(){
    this.experience = new Experience()
    this.scene = this.experience.SeaScene
    this.debug = this.experience.debug
    this.camera = this.experience.camera
    this.time = this.experience.time
    this.loadIntro = this.experience.loadIntro
    this.renderer = this.experience.renderer

    console.log(this.scene)

    if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Raging-Sea')

            this.setDebug()
        }


    if(this.renderer.scene === this.scene){
      console.log('now is raging sea')
    }

    
    this.setLoading()
    this.setSea()
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

  setSea(){
    console.log(this.scene)
    this.geometry = new THREE.PlaneGeometry(3,2,200,200)

    this.material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms:
      {
          uTime: { value: 0 },
          uBigWavesElevation: { value: 0.2 },
          uBigWavesFrequency: { value: new THREE.Vector2(4.2, 2.15) },
          uSmallWavesElevation: { value: 0.17},
          uSmallWavesFrequency: { value: 3.0},
          uSmallWavesSpeed: { value: 0.2},
          uSmallIterations: { value: 2.8},
  
          uBigWavesSpeed: { value: 1.05 },
          uDepthColor:{ value: new THREE.Color(0x1b4f72)},
          uSurfaceColor:{ value: new THREE.Color(0x5dade2)},
          uColorOffset: {value: 0.15},
          uColorMultiplier: {value: 4.8}
      }
    })

    this.water = new THREE.Mesh(this.geometry, this.material)

    this.scene.add(this.water)
    this.water.rotation.x = -Math.PI * 0.5
    
  }

  sceneButton(){
      document.querySelector('.back-scene').classList.add('visible')
      document.querySelector('.next-scene').classList.add('visible')


      document.querySelector(`.back-scene`).onclick =()=>{
        document.querySelector('.next-scene').classList.remove('visible')
        document.querySelector('.back-scene').classList.remove('visible')
        document.querySelector('.back').classList.add('visible')
      
        this.lab = new Lab()

        this.renderer.setLabScene()
      }

      document.querySelector(`.next-scene`).onclick =()=>{
      
        document.querySelector('.next-scene').classList.remove('visible')

        this.planet = new Planet()
        this.renderer.setPlanetScene()
        console.log('next to planet from raging sea')
      }
  }

  getTick(){

    console.log('sea run ')
    this.otherTick = ()=>{
     this.material.uniforms.uTime.value = this.time.elapsed * 0.001
     this.camera.controls.update()

     window.requestAnimationFrame(this.otherTick)
  }
  this.otherTick()
}

}