import * as THREE from 'three'
import Experience from '../ExperienceTwo'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'
import gsap from 'gsap'
import BlokFM from './BlokFM'

export default class BlokSuper{
  constructor(){
    this.experience = new Experience()
    this.scene = this.experience.BlokSuperScene
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
    this.setSlider()
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
          this.blok.model = this.resources.items.blokSuperModel
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
    let title = 'Penerima Radio Superheterodyne'
    let pOne = 'Penerima superheterodin dikembangkan untuk memperbaiki selektifitas dari sinyal radio dengan frekwensi yang berdekatan dengan cara menggiring semua frekwensi yang diterima ke satu frekwensi tertentu yang seragam yaitu frekwensi IF. Hal ini akan mempermudah pemrosesan selanjutnya karena rangkaian ditala pada frekwensi yang tetap sama dan tidak berubah meskipun dipilih atau dirubah pada setasiun yang berbeda beda. Istilah superheterodin digunakan pada penerima radio ini karena frekuensi sinyal yang diterima oleh radio akan diubah atau di convert ke nilai tetap yang lebih rendah, yang disebut intermediate frequency (IF) atau frekuensi antara.'

    let pTwo = `Bagian-bagian penerima superheterodin, diantaranya adalah bagian osilator, bagian mixer, dan bagian penguat Frekuensi Menengah (IF). Komponen utama bagian osilator adalah lilitan kawat email dan kondensator Fungsi bagian osilator pada penerima radio adalah untuk membangkitkan frekuensi tinggi (Radio Frekuensi). Komponen utama dari mixer adalah transistor. Fungsi bagian mixer pada penerima radio adalah untuk mencampur frekuensi dari antenna (fe) dengan frekuensi yang dihasilkan oleh oscillator (fo). Kemudian pada Bagian penguat IF sering disebut juga penguat MF (medium frekuensi). Komponen utamanya adalah transistor dan transformator.
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
      if(audioSrc.name === 'audio3'){
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
      this.blokFM = new BlokFM()
      this.renderer.setFMScene()
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