import * as THREE from 'three'
import Experience from '../ExperienceTwo'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'
import gsap from 'gsap'
import BlokPemancar from './BlokPemancar'

export default class BlokFM{
  constructor(){
    this.experience = new Experience()
    this.scene = this.experience.BlokFMScene
    this.resources = this.experience.resources
    this.time = this.experience.time
    this.debug = this.experience.debug
    this.camera = this.experience.camera
    this.sizes = this.experience.sizes
    this.renderer = this.experience.renderer
    this.world = this.experience.world
    this.loadIntro = this.experience.loadIntro

    this.camera.instance.position.set(4,1,0.5)

    this.setLoading()
    this.setSunLight()
    this.setBlok()
    this.setExplain()
    this.nextScene()
    this.getTick()

  }

  setSunLight()
    {
        this.sunLight = new THREE.DirectionalLight('#ffffff', 4)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.far = 15
        this.sunLight.shadow.mapSize.set(1024, 1024)
        this.sunLight.shadow.normalBias = 0.05
        this.sunLight.position.set(3.5, 2, 0.5)
        this.scene.add(this.sunLight)

        // const directionalLightHelper = new THREE.DirectionalLightHelper(this.sunLight, 0.3)
        //   this.scene.add(directionalLightHelper)

        }

  setBlok(){

          this.blok = {}
          this.blok.model = this.resources.items.blokFMModel
          console.log(this.blok.model)
          this.blok.model.scene.rotateY(80)
          this.blok.model.scene.position.set(3.5 ,-4, 1)
          this.scene.add(this.blok.model.scene)

          this.animation = {}
          this.animation.mixer = new THREE.AnimationMixer(this.blok.model.scene)
          this.animation.blok = this.blok.model.animations

          this.animation.blok.forEach(clip => {
            this.animation.mixer.clipAction(clip).play()
          });
        }

  setLoading(){

    this.overlayGeometry = new THREE.PlaneBufferGeometry(2,2,1,1)
      this.overlayMaterial = new THREE.ShaderMaterial({
        vertexShader: `void main(){
          gl_Position = vec4(position, 1.0);
        }`,
        fragmentShader: `uniform float uAlpha;
        void main(){
          gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
        }`,
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

  setExplain(){
    document.querySelector('.slide').classList.add('visible')
    let title = 'Penerima FM Mono dan Stereo'
    let pOne = 'Secara gambar rangkaian blok, penerima FM hampir sama dengan penerima AM, perbedaan berada pada frekuensi yang diterima yaitu antara 88 Mhz - 108 Mhz dan frekuensi antara sebesar 10,7 Mhz serta cara demodulasinya serta bagian low pass filter pada penerima mono dan pada mode stereo dilengkapi dengan stereo decoder dan 2 power amplifier untuk sistem penerima FM stereo.'

    let pTwo = ``
        //Slider UP
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
            document.querySelector('.next-scene').classList.remove('visible')
            document.querySelector('.slide-up').classList.remove('hide')
            document.querySelector('.slide-up').classList.add('open')
            upIcon.style.transform = 'rotate(180deg)'
            upIcon.style.transition = 'transform 1.2s ease'
            document.querySelector('.judul').innerHTML = title
            document.querySelector('.p1').innerHTML = pOne
            document.querySelector('.p2').innerHTML = pTwo
          }
        }
  }

  nextScene(){
    document.querySelector(`.next-scene`).onclick =()=>{
      
      document.querySelector('.next-scene').classList.remove('visible')
      this.blokPemancar = new BlokPemancar()
      this.renderer.setPemancarScene()
      // console.log('next to planet from raging sea')
    }
  }
  getTick(){
    this.otherTick = ()=>{
      this.animation.mixer.update(this.time.delta * 0.001)
      this.camera.controls.update()
     window.requestAnimationFrame(this.otherTick)
    }
   this.otherTick()
  }
}