import * as THREE from 'three'
import { Raycaster } from 'three'
import Experience from '../ExperienceThree'
import Saluran from './SalTrans'

export default class AntenaTransmisi{
  constructor(){
    this.experience = new Experience()
    this.scene = this.experience.AntenaTransmisiScene
    this.resources = this.experience.resources
    this.time = this.experience.time
    this.camera = this.experience.camera
    this.sizes = this.experience.sizes
    this.renderer = this.experience.renderer
    this.world = this.experience.world
    this.loadIntro = this.experience.loadIntro

    this.clicked = 0
    this.isClicked = false

    this.camera.instance.position.set(5,5,1)
    this.camera.controls.maxDistance = 35

    this.setSunLight()
    this.setTower()
    this.setAudio()
    this.setSlider()
    this.setExplain()
    this.nextScene()
  }
  

  setSunLight()
  {

      this.light = new THREE.AmbientLight( 0xffffff ); // soft white light
      this.scene.add( this.light );

      this.sunLight = new THREE.DirectionalLight('#ffffff', 5)
      this.sunLight.castShadow = true
      this.sunLight.shadow.camera.far = 15
      this.sunLight.shadow.mapSize.set(512, 512)
      this.sunLight.shadow.normalBias = 0.05
      this.sunLight.position.set(5, 5, 1)
      this.scene.add(this.sunLight)

      // const directionalLightHelper = new THREE.DirectionalLightHelper(this.sunLight, 0.3)
      //   this.scene.add(directionalLightHelper)

      }

setTower(){

        this.tower = {}
        this.tower.model = this.resources.items.salAntenaModel
        console.log(this.tower.model)

        this.tower.model.scene.rotateY(80)
        this.tower.model.scene.position.y = -3
        this.scene.add(this.tower.model.scene)

      }

  setSlider(){
    document.querySelector('.slider').classList.add('visible')
    document.querySelector('.animasi').classList.remove('visible')
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
        console.log('close')
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

  setExplain(){
    document.querySelector('.slide').classList.add('visible')
    let title = 'Saluran Transmisi dan Antena Radio'
    let pOne = 'Ketika pemancar telah mengolah informasi yang sebelumnya merupakan gelombang suara menjadi gelombang radio, agar informasi tersebut dapat diterima oleh radio penerima diperlukan sebuah antenna pemancar. Tetapi, seperti yang telah dipelajari pada materi propagasi, antenna pemancar harus ditempatkan di tempat yang tinggi agar informasi tersebut dapat disebarkan kearah yang diinginkan. Kemudian, bagaimana gelombang radio yang berasal dari pemancar dapat diterima oleh antenna pemancar?'
    
    let pTwo = 'Untuk itulah diperlukan saluran transmisi yang ditempatkan pada output pemancar dan input antenna. Saluran transmisi adalah penghantar yang digunakan untuk menghubungkan sumber dengan sebuah penerima. Saluran transmisi dapat membawa sinyal RF dari pemancar ke antenna dan dari antenna ke penerima. '
        //Slider UP
        // document.querySelector('.slide').classList.add('visible')
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
            // document.querySelector('.back').classList.remove('visible')
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

  setAudio(){
      let audioCtx = new AudioContext()
      this.audioElement = document.querySelector('audio')
      this.audioElement.src = '/sounds/materiThree/audioOne.mp3'
      this.playBtn = document.querySelector('.control')
      this.text = document.querySelector('.play')

      this.playBtn.addEventListener('click', ()=>{
        if(this.playBtn.dataset.playing === 'false'){
          this.audioElement.play()
          this.playBtn.dataset.playing = 'true'
          this.playBtn.innerHTML = '<i class="bi bi-pause-fill"></i>'
          this.text.innerHTML = 'Pause Audio'
        }else if(this.playBtn.dataset.playing === 'true'){
          this.audioElement.pause()
          this.playBtn.dataset.playing = 'false'
          this.playBtn.innerHTML = '<i class="bi bi-play-fill"></i>'
          this.text.innerHTML = 'Play Audio'
        }
      })
      
    }

  setSlider(){
    document.querySelector('.slider').classList.add('visible')
    //SLIDER
    this.slideOpen = 0
    this.slide = document.querySelector('.slide-left')
    this.slider = document.querySelector('.slider')
    // document.getElementsByClassName('slider')[0].style.width = '110px';
    this.slide.onclick = ()=>{
      this.slideOpen++
      if(this.slideOpen % 2 === 0 ){
        this.slide.style.transform = 'rotate(0deg)'
        // document.getElementsByClassName('slider')[0].style.width = '110px';
        this.slider.classList.remove('open')
        this.slider.classList.add('close')
        document.querySelector('figure').classList.remove('visible')
        console.log('close')
      }else{
        this.slide.style.transform = 'rotate(180deg)'
        this.slide.style.transition = 'transform 1.5s ease'
        // document.getElementsByClassName('slider')[0].style.width = '300px';
        document.querySelector('figure').classList.add('visible')
        this.slider.classList.remove('close')
        this.slider.classList.add('open')
        console.log('open')
      }
    }

  }
  nextScene(){
    document.querySelector(`.next-scene`).onclick =()=>{
      document.querySelector('.next-scene').classList.remove('visible')
      this.saluran = new Saluran()
      this.renderer.setSaluranScene()
      this.audioElement = document.querySelector('audio')
      this.audioElement.src = '/sounds/materiThree/audioTwo.mp3'
      this.light.dispose()
      this.sunLight.dispose()
      this.scene.remove(this.tower)
    }
  }

  update(){
    this.camera.controls.update()
  }

}