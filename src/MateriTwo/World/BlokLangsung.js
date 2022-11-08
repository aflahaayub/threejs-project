import * as THREE from 'three'
import Experience from '../ExperienceTwo'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'
import gsap from 'gsap'
import BlokSuper from './BlokSuper'

export default class BlokLangsung{
  constructor(){
    this.experience = new Experience()
    this.scene = this.experience.BlokLangsungScene
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
    this.setSlider()
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
          this.blok.model = this.resources.items.blokOneModel
          this.blok.model.scene.rotateY(80)
          this.blok.model.scene.position.set(3.5 ,-4, 1)
          this.scene.add(this.blok.model.scene)

          this.animation = {}
          this.animationAct = []
          this.animation.mixer = new THREE.AnimationMixer(this.blok.model.scene)
          this.animation.blok = this.blok.model.animations

          this.animation.blok.forEach(clip => {
            this.animation.action = this.animation.mixer.clipAction(clip)

            this.animation.action.play()
            this.animationAct.push(this.animation.action)
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
    let title = 'Penerima Radio Langsung'
    let pOne = 'Penerima langsung menerima sinyal tanpa PERUBAHAN BESAR FREKUENSI sampai pada tingkat demodulator. Pada bagian penguat frekwensi tinggi terdapat penguat selektif, yang menguatkan sinyal RF dengan penguatan tertala, jadi menguatkan satu frekwensi saja dan menolak frekwensi diluar frekwensi yang ditala.'
    let pTwo = `Bagian-bagian penerima radio langsung antara lain: 
    a)	Bagian antenna, fungsi antenna pada penerima radio adalah untuk menerima atau menangkap gelombang radio yang dipancarkan oleh berbagai stasiun pemancar.
    b)	Bagian Tuning/Pemilih, bagian tuning sering disebut juga bagian tuner atau penala. Komponen utamanya adalah lilitan kawat tembaga dan kondensator (LC). Fungsi bagian tuning pada penerima radio adalah untuk memilih salah satu dari sekian banyak gelombang radio yang telah diterima oleh antenna.
    c)	Bagian Detektor, komponen utama pada bagian detector adalah diode. Fungsi bagian detector pada penerima radio adalah untuk memisahkan sinyal informasi (AF atau Audio Frekuensi) dari sinyal pembawanya (RF atau Radio Frekuensi).
    d)	Bagian Penguat AF ( Audio Frekuensi ), komponen utama pada bagian penguat AF adalah transistor atau IC. Fungsi bagian penguat AF pada penerima radio adalah untuk menguatkan sinyal informasi yang telah dipisahkan oleh bagian detector.
    e)	Bagian alat suara, berfungsi untuk mengubah sinyal informasi (AF) menjadi getaran suara yang dapat didengar oleh telinga manusia. 
    `
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

  setSlider(){
    console.log(this.resources.myAudioSrc)
    let myAudio = document.getElementById('myAudio')
    for(let audioSrc of this.resources.myAudioSrc){
      if(audioSrc.name === 'audio2'){
        myAudio.src = audioSrc.path
        myAudio.autoplay = true
        myAudio.load()
        console.log(myAudio)
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
    console.log(this.animationAct)
      this.animasi.onclick=()=>{
        this.animate++
        if(this.animate % 2 ===0){
          console.log('animate')
          for(let i = 0; i<this.animationAct.length; i++){
            this.animationAct[i].play()
          }
          document.querySelector('.fa-compact-disc').classList.add('fa-flip')
        }else{
          for(let i = 0; i<this.animationAct.length; i++){
            this.animationAct[i].stop()
          }
          console.log('stop')
          document.querySelector('.fa-compact-disc').classList.remove('fa-flip')
        }
      }
  }

  nextScene(){
    document.querySelector(`.next-scene`).onclick =()=>{
      
      document.querySelector('.next-scene').classList.remove('visible')
      this.BlokSuper = new BlokSuper()
      this.renderer.setSuperScene()
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