import * as THREE from 'three'
import { Raycaster } from 'three'
import Experience from '../ExperienceTwo'
import BlokLangsung from './BlokLangsung'

export default class Radio{
  constructor(){
    this.experience = new Experience()
    this.scene = this.experience.RadioScene
    this.resources = this.experience.resources
    this.time = this.experience.time
    this.debug = this.experience.debug
    this.camera = this.experience.camera
    this.sizes = this.experience.sizes
    this.renderer = this.experience.renderer
    this.world = this.experience.world
    this.loadIntro = this.experience.loadIntro

    this.clicked = 0
    this.isClicked = false

    this.setRadio()
    this.setRoom()
    this.setDisplay()
    this.setPointer()
    this.getPoint()
    this.setSlider()
    this.setExplain()
    this.nextScene()
  }

  setRadio(){
    this.radio= {}
    this.antenna = {}
    this.spinner = {}
    console.log(this.resources.items)
    this.radio.model = this.resources.items.radioModel.scene
    this.antenna.model = this.resources.items.antennaModel.scene
    this.spinner.model = this.resources.items.spinnerModel.scene

    this.radio.texture = this.resources.items.radioTexture
    this.antenna.texture = this.resources.items.antennaTexture
    this.spinner.texture = this.resources.items.spinnerTexture

    this.radio.texture.encoding = THREE.sRGBEncoding
    this.radio.texture.flipY = false

    this.antenna.texture.encoding = THREE.sRGBEncoding
    this.antenna.texture.flipY = false

    this.spinner.texture.encoding = THREE.sRGBEncoding
    this.spinner.texture.flipY = false

    this.radio.material = new THREE.MeshBasicMaterial({map: this.radio.texture})
    this.antenna.material = new THREE.MeshBasicMaterial({map: this.antenna.texture})
    this.spinner.material = new THREE.MeshBasicMaterial({map: this.spinner.texture})
    
    // this.radio.model.children[0].material = this.radio.material
    // console.log(this.radio.model.children[0])
    this.radio.model.traverse(child =>{
      if(child instanceof THREE.Mesh)
      {
        child.material = this.radio.material
      }
    })

    this.antenna.model.traverse(child =>{
      if(child instanceof THREE.Mesh)
      {
        child.material = this.antenna.material
      }
    })

    this.spinner.model.traverse(child =>{
      if(child instanceof THREE.Mesh)
      {
        child.material = this.spinner.material
      }
    })

    this.group = new THREE.Group()
    this.group.add(this.radio.model)
    this.group.add(this.antenna.model)
    this.group.add(this.spinner.model)

    this.group.rotateY(80)
    this.group.position.y = -5
    // this.group.scale = 2

    const axesHelper = new THREE.AxesHelper( 5 );
    // this.scene.add( axesHelper );

    this.scene.add(this.group)
  }

  setRoom(){
    this.radRoom= {}
    console.log(this.resources.items)
    this.radRoom.model = this.resources.items.roomModel.scene
    this.radRoom.texture = this.resources.items.roomTexture
    this.radRoom.texture.encoding = THREE.sRGBEncoding
    this.radRoom.texture.flipY = false

    this.radRoom.material = new THREE.MeshBasicMaterial({map: this.radRoom.texture})
    
    this.radRoom.model.traverse(child =>{
      if(child instanceof THREE.Mesh)
      {
        child.material = this.radRoom.material
      }
    })

    this.radRoom.model.rotateY(80)
    this.radRoom.model.position.y = -5
    this.scene.add(this.radRoom.model)


  }

  setDisplay(){

    //AUDIO
    this.myAudio = document.getElementById('myAudio')

    //DISPLAY
    this.raycaster = new Raycaster()
    this.points = [
      {
        position: new THREE.Vector3(-4.3, -0.5, -1.1),
        element: document.querySelector('.point-0')
      }
    ]

    this.display= {}
    document.querySelector('.point-0').onclick=()=>{
      this.clicked++
      if(this.clicked !== 0){
        this.setDisplay()
      }
    }
    this.display.model = this.resources.items.displayModel.scene
    console.log(this.clicked)
    console.log(this.resources.myRadioSrc)

    if(this.clicked === 0){
      this.display.texture = this.resources.items.displayTexture
    }else if(this.clicked === 1){
      this.isClicked = true
      this.display.texture = this.resources.items.displayTexture2
      this.myAudio.src = this.resources.myRadioSrc[2].path
        this.myAudio.load()
        this.myAudio.autoplay = true
    }else if(this.clicked === 2){
      this.isClicked = true
      this.display.texture = this.resources.items.displayTexture3
      this.myAudio.src = this.resources.myRadioSrc[1].path
        this.myAudio.load()
        this.myAudio.autoplay = true
    }else{
      this.isClicked = true
      this.display.texture = this.resources.items.displayTexture
      this.myAudio.src = this.resources.myRadioSrc[0].path
      this.myAudio.load()
      this.myAudio.autoplay = true
      this.clicked = 0
    }
    this.display.texture.encoding = THREE.sRGBEncoding
    this.display.texture.flipY = false

    this.display.material = new THREE.MeshBasicMaterial({map: this.display.texture})
    
    this.display.model.traverse(child =>{
      if(child instanceof THREE.Mesh)
      {
        child.material = this.display.material
      }
    })
    if(!this.isClicked){
      this.display.model.rotateY(80)
    this.display.model.position.y = -5
    }
    
    this.scene.add(this.display.model)

    //SOUND

  }

  setPointer(){
    this.raycaster = new Raycaster()
    this.points = [
      {
        position: new THREE.Vector3(-4.3, -0.5, -1.1),
        element: document.querySelector('.point-0')
      }
    ]
  }

  getPoint(){
    this.showPoints = true
    this.otherTick = ()=>{
      if(this.world.sceneReady){
        // document.querySelector('.slider').classList.add('visible')
        if(this.showPoints){
          for(const point of this.points){
          this.screenPosition = point.position.clone()// we make a new point position, so the original will not get changed
          this.screenPosition.project(this.camera.instance) 

          this.raycaster.setFromCamera(this.screenPosition, this.camera.instance)
          this.intersects = this.raycaster.intersectObjects(this.scene.children,true)

          if(this.intersects.length === 0 ){
            point.element.classList.add('visible')
          }else{
            this.intersectDistance = this.intersects[0].distance
            this.pointDistance = point.position.distanceTo(this.camera.instance.position)

            if(this.intersectDistance < this.pointDistance){
              point.element.classList.remove('visible')
            }else{
              point.element.classList.add('visible')
            }
          }

          this.translateX = (this.screenPosition.x * this.sizes.width * 0.5) 
          this.translateY = (- this.screenPosition.y * this.sizes.height * 0.5) 

          point.element.style.transform = `translateX(${this.translateX}px)translateY(${this.translateY}px)`
       }
      }


      //  console.log(this.points[0])
      }
      window.requestAnimationFrame(this.otherTick)
    }

    this.otherTick()

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
    let title = 'Penerima Radio'
    let pOne = 'Pesawat penerima radio mempunyai fungsi sebagai berikut: pertama memisahkan sinyal radio yang dikehendaki dari semua sinyal radio lain yang diterima oleh antena, dan menolak sinyal yang tidak dikehendaki tersebut, sinyal yang dipisahkan tersebut lalu dikuatkan sampai pada tingkatan tertentu yang dapat digunakan, dan akhirnya memisahkan sinyal suara dipisahkan dari pembawa (carier) radio untuk didapatkan kembali sinyal informasi dan selanjutnya sinyal audio tersebut dikuatkan dan diumpankan ke speaker.'
    let pTwo = 'Pada materi ini kita akan mempelajari prinsip kerja dari 2 jenis radio penerima yang biasa dipakai, yaitu jenis radio penerima langsung (straigh) dan penerima tidak langsung (superheterodine). Jika ditinjau dari proses modulasinya maka pada bahasan ini diklasifikasikan menjadi dua yaitu penerima radio AM dan penerima radio FM.'
        //Slider UP
        // document.querySelector('.slide').classList.add('visible')
        let upSlide = 0
        let upIcon = document.querySelector('.up-icon')
        document.querySelector('.slide-up').onclick = ()=>{
          upSlide++
          if(upSlide % 2 === 0){
            // if(`point-${i}` === 'point-0'){
            //   document.querySelector('.next-scene').classList.add('visible')
            // }
            // document.querySelector('.back').classList.add('visible')
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

  nextScene(){
    document.querySelector(`.next-scene`).onclick =()=>{
      
      document.querySelector('.next-scene').classList.remove('visible')
      this.blokLangsung = new BlokLangsung()
      this.renderer.setLangsungScene()
      document.querySelector('.point-0').remove()
      // console.log('next to planet from raging sea')
    }
  }

  update(){
    this.camera.controls.update()
  }

}