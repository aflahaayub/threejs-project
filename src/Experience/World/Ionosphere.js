import * as THREE from 'three'
import { DoubleSide, Group, Mesh } from 'three'
import Experience from '../Experience'

import vertexShader from '../Shaders/Intro/vertex.glsl'
import fragmentShader from '../Shaders/Intro/fragment.glsl'

import gsap from 'gsap'
import Ground from './Ground'
import Los from './Los'

export default class Ionosphere{
  constructor(){
    this.experience = new Experience()

    this.scene = this.experience.Ionosphere
    this.resources = this.experience.resources

    this.debug = this.experience.debug
    this.time = this.experience.time
    this.camera = this.experience.camera

    this.overlay = this.experience.overlay
    this.renderer = this.experience.renderer
    this.camera.controls.maxDistance = 35
    // this.camera.instance.position.set(10,8,10)
    this.setLoading()

    this.setEarth()
    this.setMesh()
    this.setStars()
    
    this.setLayers()
    this.setLayers2()
    this.setLayers3()
    this.setLayers4()

    this.setArrow1()
    this.setArrow2()
    this.setArrow3()
    this.setArrow4()

    this.sceneButton()
    this.setExplanation()
    this.setSlider()
    // this.getTick()
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

  setEarth(){
    this.earth = new THREE.SphereGeometry(3, 50, 50)

    this.earthTextures = {}
    console.log(this.resources)
    this.earthTextures.color = this.resources.items.globe
    this.earthTextures.color.encoding= THREE.sRGBEncoding

    this.earthMaterial = new THREE.MeshBasicMaterial({
      map: this.earthTextures.color
    })
  }
  
  setMesh(){
    this.earthMesh = new THREE.Mesh(this.earth, this.earthMaterial)
    this.earthMesh.scale.set(1.5,1.5,1.5)
    this.earthMesh.rotation.set(-1,-2,-0.5)
    this.earthMesh.position.set(0,0,0)
    this.scene.add(this.earthMesh)
    // this.scene.add(new THREE.AxesHelper(20))
  }

  setStars(){
    //texture
    this.starTextures = {}
    this.starTextures.color = this.resources.items.star
    this.starTextures.color.encoding= THREE.sRGBEncoding

    //geo
    this.starGeo = new THREE.BufferGeometry()
    this.count = 100

    this.positions = new Float32Array(this.count*3)

    for(let i=0; i<this.count*3; i++){
      this.positions[i] = (Math.random() - 0.5) * 100
    }

    this.starGeo.setAttribute('position', new THREE.BufferAttribute(this.positions, 3))
   
    //Material
    this.starMat = new THREE.PointsMaterial()
    this.starMat.size = 0.5
    this.starMat.sizeAttenuation = true
    this.starMat.depthWrite = false
    this.starMat.blending = THREE.AdditiveBlending
    this.starMat.map = this.starTextures.color

    this.stars = new THREE.Points(this.starGeo, this.starMat)
    this.scene.add(this.stars)

  }

  setLayers(){

    let pts = [];
    let POINT_COUNT = 800;
    let mainR = 3.5;
    let outerLimit = 1;
    let innerLimit = 1;
    for(let i = 0; i < POINT_COUNT; i++){

      let inout = (Math.random() - 0.5) * 0.005;
      let lim = (inout >= 0 ? outerLimit : innerLimit);
      let rand = mainR + Math.pow(Math.random(), 3) * lim * inout;

      pts.push(
        new THREE.Vector3().setFromCylindricalCoords(
          rand,
          Math.PI * 2 * Math.random(),
          0
        )
      )
    }
    let g = new THREE.BufferGeometry().setFromPoints(pts);
    let m = new THREE.PointsMaterial({size: 0.05, color: 0xFADBD8});
    let p = new THREE.Points(g, m);

    p.rotation.set(0,Math.PI/2, Math.PI/2)
    this.scene.add(p)
    p.position.set(0,0,0)
    p.scale.set(1.5,1.5,1.5)

 }

  setLayers2(){

    let pts = [];
    let POINT_COUNT = 2000;
    let mainR = 3.7;
    let outerLimit = 1;
    let innerLimit = 3;
    for(let i = 0; i < POINT_COUNT; i++){

      let inout = (Math.random() - 0.5) *0.5;
      let lim = (inout >= 0 ? outerLimit : innerLimit);
      let rand = mainR + Math.pow(Math.random(), 3) * lim * inout;

      pts.push(
        new THREE.Vector3().setFromCylindricalCoords(
          rand,
          Math.PI * 2 * Math.random(),
          0
        )
      )
    }
    let g = new THREE.BufferGeometry().setFromPoints(pts);
    let m = new THREE.PointsMaterial({size: 0.05, color: 0xE67E22});
    let p = new THREE.Points(g, m);

    p.rotation.set(0,Math.PI/2, Math.PI/2)
    this.scene.add(p)
    p.position.set(0,0,0)
    p.scale.set(1.5,1.5,1.5)

 }

 setLayers3(){

    let pts = [];
    let POINT_COUNT = 4000;
    let mainR = 4.3;
    let outerLimit = 1;
    let innerLimit = 3;
    for(let i = 0; i < POINT_COUNT; i++){

      let inout = (Math.random() - 0.5) *0.05;
      let lim = (inout >= 0 ? outerLimit : innerLimit);
      let rand = mainR + Math.pow(Math.random(), 3) * lim * inout;

      pts.push(
        new THREE.Vector3().setFromCylindricalCoords(
          rand,
          Math.PI * 2 * Math.random(),
          0
        )
      )
    }
    let g = new THREE.BufferGeometry().setFromPoints(pts);
    let m = new THREE.PointsMaterial({size: 0.05, color: 0x2ECC71});
    let p = new THREE.Points(g, m);

    p.rotation.set(0,Math.PI/2, Math.PI/2)
    this.scene.add(p)
    p.position.set(0,0,0)
    p.scale.set(1.5,1.5,1.5)

 }

 setLayers4(){

  let pts = [];
  let POINT_COUNT = 6000;
  let mainR = 4.5;
  let outerLimit = 1;
  let innerLimit = 3;
  for(let i = 0; i < POINT_COUNT; i++){

    let inout = (Math.random() - 0.5) *0.5;
    let lim = (inout >= 0 ? outerLimit : innerLimit);
    let rand = mainR + Math.pow(Math.random(), 3) * lim * inout;

    pts.push(
      new THREE.Vector3().setFromCylindricalCoords(
        rand,
        Math.PI * 2 * Math.random(),
        0
      )
    )
  }
  let g = new THREE.BufferGeometry().setFromPoints(pts);
  let m = new THREE.PointsMaterial({size: 0.05, color: 0x73C6B6});
  let p = new THREE.Points(g, m);

  p.rotation.set(0,Math.PI/2, Math.PI/2)
  this.scene.add(p)
  p.position.set(0,0,0)
  p.scale.set(1.5,1.5,1.5)

  }

  setArrow1(){
    this.curve1 = new THREE.QuadraticBezierCurve(
      new THREE.Vector2(-0.4,4.5),
      new THREE.Vector2(0,6.24),
      new THREE.Vector2(1,4)
    )

    this.points1 = this.curve1.getPoints(20)
   
    const geometry = new THREE.BufferGeometry().setFromPoints(this.points1)

    const material = new THREE.LineBasicMaterial({color: 0x21618C})

    this.arrow1 = new THREE.Line(geometry, material)
  
    this.scene.add(this.arrow1)
  }

  setArrow2(){
    this.curve2 = new THREE.QuadraticBezierCurve(
      new THREE.Vector2(-0.4,4.5),
      new THREE.Vector2(0.5, 6.8),
      new THREE.Vector2(1.3,4)
    )

    this.points2 = this.curve2.getPoints(20)

    const geometry = new THREE.BufferGeometry().setFromPoints(this.points2)

    const material = new THREE.LineBasicMaterial({color: 0xB03A2E})

    this.arrow2 = new THREE.Line(geometry, material)
    
    this.scene.add(this.arrow2)
  }

  setArrow3(){
    this.curve3 = new THREE.QuadraticBezierCurve(
      new THREE.Vector2(-0.4,4.5),
      new THREE.Vector2(1.2, 8.5),
      new THREE.Vector2(1.8,4)
    )

    this.points3 = this.curve3.getPoints(20)

    const geometry = new THREE.BufferGeometry().setFromPoints(this.points3)

    const material = new THREE.LineBasicMaterial({color: 0x196F3D})

    this.arrow3 = new THREE.Line(geometry, material)
    
    this.scene.add(this.arrow3)
  }

  setArrow4(){
    this.curve3 = new THREE.QuadraticBezierCurve(
      new THREE.Vector2(-0.4,4.5),
      new THREE.Vector2(1.6, 9.2),
      new THREE.Vector2(2.2,3.7)
    )

    this.points4 = this.curve3.getPoints(20)

    const geometry = new THREE.BufferGeometry().setFromPoints(this.points4)

    const material = new THREE.LineBasicMaterial({color: 0x212F3C})

    this.arrow4 = new THREE.Line(geometry, material)
    
    this.scene.add(this.arrow4)
  }

  sceneButton(){

    document.querySelector(`.next-scene`).onclick =()=>{
    
      document.querySelector('.next-scene').classList.remove('visible')

      this.los = new Los()
      this.renderer.setLosScene()
      this.audioElement = document.querySelector('audio')
      this.audioElement.src = '/sounds/materiOne/audioSix.mp3'
      this.overlayGeometry.dispose()
      this.overlayMaterial.dispose()
      this.starGeo.dispose()
      this.starMat.dispose()
      // this.starTextures.dispose()
      this.earth.dispose()
      this.earthMaterial.dispose()
    }
  }

  setExplanation(){
    let pSix = ['Pada frekuensi tinggi atau daerah HF, yang mempunyai range frekuensi 3–30 MHz, gelombang dapat dipropagasikan menempuh jarak yang jauh akibat dari pembiasan dan pemantulan lintasan pada lapisan ionospher. Gelombang yang berpropagasi melalui lapisan ionosfir ini disebut sebagai gelombang ionosfir (ionospheric wave) atau juga disebut gelombang langit (sky wave).', 'Ionosfir tersusun dari 3 (tiga) lapisan, mulai dari yang terbawah yang disebut dengan lapisan D, E dan F. Sedangkan lapisan F dibagi menjadi dua, yaitu lapisan F1 dan F2 (yang lebih atas). ']

    document.querySelector('.slide').classList.add('visible')
    let upSlide = 0
    let upIcon = document.querySelector('.up-icon')
    document.querySelector('.slide-up').onclick = ()=>{
      upSlide++
      if(upSlide % 2 === 0){
        document.querySelector('.next-scene').classList.add('visible')
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
        document.querySelector('.judul').innerHTML = 'Propagasi Gelombang Ionosfir'
      document.querySelector('.p1').innerHTML = pSix[0]
      document.querySelector('.p2').innerHTML = pSix[1]
      }
    }
  }

  setSlider(){
    //SLIDER
    this.slideOpen = 0
    this.slide = document.querySelector('.slide-left')
    this.slider = document.querySelector('.slider')
    this.slide.onclick = ()=>{
      this.slideOpen++
      if(this.slideOpen % 2 === 0 ){
        this.slide.style.transform = 'rotate(0deg)'
        this.slider.classList.remove('open')
        this.slider.classList.add('close')
        document.querySelector('figure').classList.remove('visible')
      }else{
        this.slide.style.transform = 'rotate(180deg)'
        this.slide.style.transition = 'transform 1.5s ease'
        document.querySelector('figure').classList.add('visible')
        this.slider.classList.remove('close')
        this.slider.classList.add('open')
        console.log('open')
      }
    }
  }
 
}