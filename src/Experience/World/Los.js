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
    this.setExplanation()
    this.setSlider()
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
    // document.querySelector('.back-scene').classList.add('visible')
    // document.querySelector(`.back-scene`).onclick =()=>{
    //   document.querySelector('.next-scene').classList.remove('visible')
    //   document.querySelector('.back-scene').classList.remove('visible')

    //   this.renderer.instance.setClearColor('#211d20')
    //   this.ion = new Ionosphere()
    //   this.renderer.setIonScene
    // }
  }
  setExplanation(){
    let pSeven = ['Propagasi line of sight, disebut dengan propagasi dengan gelombang langsung (direct wave), karena gelombang yang terpancar dari antena pemancar langsung berpropagasi menuju antena penerima dan tidak merambat di atas permukaan tanah.', 'Band frekuensi yang digunakan pada jenis propagasi ini sangat lebar, yaitu meliputi band VHF (30 – 300 MHz), UHF (0,3 – 3 GHz), SHF (3 – 30 GHz) dan EHF (30 – 300 GHz). Aplikasi untuk pelayanan komunikasi, antara lain : untuk siaran radio FM, sistem penyiaran televisi (TV), komunikasi bergerak, radar, komunikasi satelit, dan penelitian ruang angkasa']
  
    //Slider UP
    document.querySelector('.slide').classList.add('visible')
    let upSlide = 0
    let upIcon = document.querySelector('.up-icon')
    document.querySelector('.slide-up').onclick = ()=>{
      upSlide++
      if(upSlide % 2 === 0){
        document.querySelector('.kuis').classList.add('visible')
        document.querySelector('.slide-up').classList.add('hide')
        document.querySelector('.slide-up').classList.remove('open')
        document.querySelector('.judul').innerHTML = ''
        document.querySelector('.p1').innerHTML = ''
        document.querySelector('.p2').innerHTML = ''
        upIcon.style.transform = 'rotate(0deg)'
      }else{
        document.querySelector('.slide-up').classList.remove('hide')
        document.querySelector('.slide-up').classList.add('open')
        upIcon.style.transform = 'rotate(180deg)'
        upIcon.style.transition = 'transform 1.2s ease'
        document.querySelector('.judul').innerHTML = 'Propagasi Gelombang Langsung'
      document.querySelector('.p1').innerHTML = pSeven[0]
      document.querySelector('.p2').innerHTML = pSeven[1]
      }
    }

    document.querySelector('.kuis').onclick=()=>{
      document.querySelector('.mulai-kuis').classList.add('visible')
    }
  }

  setSlider(){
    console.log(this.resources.myAudioSrc)
    let myAudio = document.getElementById('myAudio')
    for(let audioSrc of this.resources.myAudioSrc){
      if(audioSrc.name === 'audio6'){
        myAudio.src = audioSrc.path
        myAudio.autoplay = true
        myAudio.load()
        console.log(myAudio)
        console.log('audio six is playing..')
    }
    }
    //SLIDER
    this.slideOpen = 0
    this.slide = document.querySelector('.slide-left')
    this.slider = document.querySelector('.slider')
    this.animasi = document.querySelector('.animasi')
    this.slide.onclick = ()=>{
      this.slideOpen++
      if(this.slideOpen % 2 === 0 ){
        this.slide.style.transform = 'rotate(0deg)'
        this.slider.classList.remove('open')
        this.slider.classList.add('close')
        document.querySelector('figure').classList.remove('visible')
        this.animasi.classList.remove('visible')
        console.log('close')
      }else{
        this.slide.style.transform = 'rotate(180deg)'
        this.slide.style.transition = 'transform 1.5s ease'
        document.querySelector('figure').classList.add('visible')
        this.animasi.classList.add('visible')
        this.slider.classList.remove('close')
        this.slider.classList.add('open')
        console.log('open')
      }
    }

    this.playAnimate = true
    this.animate = 0
    this.animasi.onclick=()=>{
      this.animate++
      if(this.animate % 2 ===0){
        console.log('animate')
        this.playAnimate = true
        document.querySelector('.fa-compact-disc').classList.add('fa-flip')
      }else{
        this.playAnimate = false
        console.log('stop')
        document.querySelector('.fa-compact-disc').classList.remove('fa-flip')
      }
    }
  }

  getTick(){
    this.otherTick = ()=>{
      if(this.playAnimate){
        this.arrowMat.uniforms.uTime.value = this.time.elapsed * 0.01
      }
      this.camera.controls.update()

     window.requestAnimationFrame(this.otherTick)
    }
   this.otherTick()
  }
}
