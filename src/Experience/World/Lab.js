import * as THREE from 'three'
import { AudioAnalyser, Raycaster, Vector2 } from 'three'
import Experience from '../Experience.js'
import Sizes from '../Utils/Sizes.js'
import gsap from 'gsap'
import Sea from './raging-sea.js'
import audios from '../audioSources.js'

export default class Lab
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.LabScene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug
        this.camera = this.experience.camera
        this.sizes = this.experience.sizes
        this.renderer = this.experience.renderer
        this.world = this.experience.world

        this.loadIntro = this.experience.loadIntro
        this.model = this.resources.items.labModel
        // this.ctx = new AudioContext()
        
        this.setRoom()
        this.setPointers()
        this.setAnimation()
        this.getEachPoint()
        this.setCamera()
        this.setAudio()
        this.setSlider()
    }

    setRoom(){
      this.room = {}
      this.room.model = this.model.scene
      this.room.texture = this.resources.items.labTexture
      this.room.texture.encoding = THREE.sRGBEncoding
      this.room.texture.flipY = false

      this.room.material = new THREE.MeshBasicMaterial({map: this.room.texture})

      this.room.model.traverse(child =>{
        if(child instanceof THREE.Mesh)
        {
          child.material = this.room.material
        }
      })

      this.scene.add(this.room.model)
  
    }

    setPointers(){
      this.raycaster = new Raycaster()
      this.points = [
        {
          position: new THREE.Vector3(0.5, 2, .5),
          element: document.querySelector('.point-0')
        },
        {
          position: new THREE.Vector3(-3, 2.7, 2.5),
          element: document.querySelector('.point-1')
        },
        {
          position: new THREE.Vector3(-3, 2.7, -2),
          element: document.querySelector('.point-2')
        }
      ]
    }
    
    setAnimation()
    {
        this.animation = {}
        
        // Mixer
        this.animation.mixer = new THREE.AnimationMixer(this.model.scene)
 
        // Actions
        this.animation.actions = []
        this.animationAct = []

        for(let i = 0; i < this.model.animations.length; i++){

          this.animation.actions[i] = this.animation.mixer.clipAction(this.model.animations[i])
          // this.animation.actions[i].play()
          this.animationAct.push(this.animation.actions[i])
        }

        
    }

    getEachPoint(){
      this.showPoints = true
      this.otherTick = ()=>{
        if(this.world.sceneReady){
          document.querySelector('.slider').classList.add('visible')
          if(this.showPoints){
            // console.log(this.showPoints)
            for(const point of this.points){
            this.screenPosition = point.position.clone()// we make a new point position, so the original will not get changed

            this.screenPosition.project(this.camera.instance) 

            this.raycaster.setFromCamera(this.screenPosition, this.camera.instance)

            this.intersects = this.raycaster.intersectObjects(this.scene.children,true)

            // console.log( this.intersects)

            if(this.intersects.length === 0 ){
              point.element.classList.add('visible')
            }else{

              // console.log(this.intersects)

              this.intersectDistance = this.intersects[0].distance
              this.pointDistance = point.position.distanceTo(this.camera.instance.position)

              if(this.intersectDistance < this.pointDistance){
                point.element.classList.remove('visible')
              }else{
                point.element.classList.add('visible')
              }
      
              // console.log(this.intersectDistance, this.pointDistance)
            }

            // console.log(this.sizes)

            this.translateX = (this.screenPosition.x * this.sizes.width * 0.5) 
            this.translateY = (- this.screenPosition.y * this.sizes.height * 0.5) 

            // console.log(this.translateX)

            point.element.style.transform = `translateX(${this.translateX}px)translateY(${this.translateY}px)`
         }
        }

        //  console.log(this.points[0])
        }
        window.requestAnimationFrame(this.otherTick)
      }

      this.otherTick()

    }

    setCamera(){
      let title = ['Getaran', 'Gelombang', 'Gelombang Longitudinal', 'Gelombang Mekanik', 'Gelombang Elektromagnetik', 'Propagasi Gelombang Tanah', 'Propagasi Gelombang Ionosfir', 'Propagasi Garis Pandang']

      let pOne = ['Getaran merupakan gerakan bolak-balik suatu benda dalam selang waktu tertentu melalui titik      kesetimbangannya. Benda dikatakan bergetar dalam satu kali getaran penuh apabila benda bergerak dari titik awal dan kembali lagi ke titik awal tersebut.', 'Gelombang adalah suatu gangguan yang merambatkan energi dari satu titik ke titik lainnya. Gelombang juga dapat diartikan sebagai perambatan energi getaran dari satu titik ke titik lainnya. Gelombang dapat dibedakan berdasarkan medium perambatannya dan berdasarkan arah rambatnya. ', 'Berbeda dengan transverse wave, longitudinal merupakan gelombang yang arah getarannya sejajar atau berhimpit dengan arah rambatnya. Dalam satu gelombang longitudinal terdiri dari satu regangan dan satu rapatan. Perhitungan panjang satu gelombang longitudinal ini dinyatakan dalam satu rapatan dan regangan. Contohnya pada gelombang suara di udara.']

      let pTwo = ['Besaran-besaran fisika pada getaran yaitu periode (T), frekuensi (f), simpangan (y), dan amplitudo (A).', 'Gelombang pada contoh ini disebut gelombang transverse  atau transverse wave. Gelombang yang arah getarannya tegak lurus dengan arah rambatnya. Panjang satu gelombangnya dinyatakan dalam 1 bukit dan 1 lembah.' , 'Besaran-besaran fisika pada getaran yaitu periode (T), frekuensi (f), simpangan (x), amplitudo (A), panjang gelombang (λ), dan cepat rambat gelombang (v). Rumus cepat rambat gelombang: v = f x λ.' ]
      
      //audio
      // let myAudio = document.getElementById('myAudio')
      // for(let audioSrc of this.resources.myAudioSrc){
      // if(audioSrc.name === 'audio1'){
      //   // myAudio.autoplay = true
      // }}

      for(let i = 0; i < this.points.length; i++){
        document.querySelector(`.point-${i}`).onclick = ()=>{
          document.querySelector('.back').classList.add('visible')
          if(`point-${i}` === 'point-0'){
            console.log('this is 3')
            gsap.to(this.camera.instance.position, {duration: 3,
              x: 0.5,
              y: 3.5,
              z: 3
            })
            gsap.to(this.camera.controls.target,{
              duration: 1,
              x: 0.5,
              y: 0,
              z:-0.2
            })
            for(let animation of this.animationAct){
              if(animation._clip.name !== 'Key.004Action' || 'Weeble'){
                animation.play()
              }
            }

            setSliderUp(title[2], pOne[2], pTwo[2])
            //change scene
            this.nextBtn = 0
            document.querySelector(`.next-scene`).onclick =()=>{
              document.querySelector(`.point-${i}`).classList.remove('visible')
              document.querySelector('.text').classList.add('no-disp')
              document.querySelector('.back').classList.remove('visible')
              document.querySelector('.next-scene').classList.remove('visible')
              //remove class
              this.showPoints = false
              this.sea = new Sea()
              this.renderer.setSeaScene()
              this.scene.remove(this.room.model)
              this.room.material.dispose()
              this.audioElement.src = '/sounds/materiOne/audioTwo.mp3'
            }
          }
          else if(`point-${i}` === 'point-1'){
            document.querySelector('.point-2').classList.remove('noClick')
            document.querySelector('.back').classList.add('visible')
            
            gsap.to(this.camera.instance.position, {duration: 3,
              x: -1,
              y: 0,
              z: 2
            })
            gsap.to(this.camera.controls.target,{
              duration: 1,
              x: -8,
              y: -1,
              z: 2
            })
            for(let animation of this.animationAct){
              if(animation._clip.name === 'Weeble'){
                animation.play()
              }
              // console.log(animation._clip.name)
            }
            setSliderUp(title[0], pOne[0], pTwo[0])
          }
          else if(`point-${i}` === 'point-2'){
            document.querySelector('.point-0').classList.remove('noClick')
            document.querySelector('.back').classList.add('visible')

            gsap.to(this.camera.instance.position, {duration: 3,
              x: -2,
              y: 1,
              z: 3
            })
            gsap.to(this.camera.controls.target,{
              duration: 1,
              x: -2,
              y: 2,
              z: -2
            })
            for(let animation of this.animationAct){
              if(animation._clip.name === 'Key.004Action'){
                animation.play()
              }
            }
            setSliderUp(title[1], pOne[1], pTwo[1])
        }
      }

      function setSliderUp(title, pOne, pTwo){
        //Slider UP
        document.querySelector('.slide').classList.add('visible')
        let upSlide = 0
        let upIcon = document.querySelector('.up-icon')
        document.querySelector('.slide-up').onclick = ()=>{
          upSlide++
          if(upSlide % 2 === 0){
            if(`point-${i}` === 'point-0'){
              document.querySelector('.next-scene').classList.add('visible')
            }
            document.querySelector('.back').classList.add('visible')
            document.querySelector('.slide-up').classList.add('hide')
            document.querySelector('.slide-up').classList.remove('open')
            document.querySelector('.judul').innerHTML = ''
            document.querySelector('.p1').innerHTML = ''
            document.querySelector('.p2').innerHTML = ''
            upIcon.style.transform = 'rotate(0deg)'
          }else{
            document.querySelector('.back').classList.remove('visible')
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

      // Tombol Kembali
      document.querySelector(`.back`).onclick = ()=>{
        console.log('kembali')
        for(let animation of this.animationAct){
          animation.stop()
        }
        gsap.to(this.camera.instance.position, {duration: 3,
          x: 7,
          y: 8,
          z: 9
        })

        document.querySelector('.back').classList.remove('visible')
        document.querySelector('.slide').classList.remove('visible')
      }
      }
    }

    setAudio(){
      let audioCtx = new AudioContext()
      this.audioElement = document.querySelector('audio')
      this.audioElement.src = '/sounds/materiOne/audioOne.mp3'
      this.playBtn = document.querySelector('.control')
      this.text = document.querySelector('.play')

      this.playBtn.addEventListener('click', ()=>{
        // if(!audioCtx){
        //   init()
        // }
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

      this.playBtn.addEventListener('ended', ()=>{
        this.playBtn.dataset.playing = 'false'
        this.playBtn.innerHTML = '<i class="bi bi-play-fill"></i>'
        this.text.innerHTML = 'Audio Ended'
      }, false)

      // function init(){
      //   audioCtx = new AudioContext()
      //   // this.track = new MediaElementAudioSourceNode(audioCtx, {mediaElement: this.audioElement})
      // }


      // fetch('sounds/materiOne/audioOne.mp3')
      //     .then(data=> data.arrayBuffer())
      //     .then(arrayBuffer => this.ctx.decodeAudioData(arrayBuffer))
      //     .then(decodeAudio=> {
      //       this.audio = decodeAudio
      //     })
      // this.playback = ()=>{
      //   const playSound = this.ctx.createBufferSource()
      //   playSound.buffer = this.audio
      //   playSound.connect(this.ctx.destination)
      //   playSound.start(this.ctx.currentTime)
      // }
      
      
    }
    setSlider(){
      //SLIDER
      this.slideOpen = 0
      this.slide = document.querySelector('.slide-left')
      this.slider = document.querySelector('.slider')
      // document.getElementsByClassName('slider')[0].style.width = '110px';
      // this.audioControl = document.querySelector('.penjelasAudio')
      this.animasi = document.querySelector('.animasi')
      // this.audioControl.classList.add('visible')
      

      this.slide.onclick = ()=>{
        this.slideOpen++
        if(this.slideOpen % 2 === 0 ){
          // this.audioControl.classList.add('visible')
          this.slide.style.transform = 'rotate(0deg)'
          // document.getElementsByClassName('slider')[0].style.width = '110px';
          this.slider.classList.remove('open')
          this.slider.classList.add('close')
          document.querySelector('figure').classList.remove('visible')
          // this.animasi.classList.remove('visible')
          console.log('close')
        }else{
          // this.audioControl.classList.remove('visible')
          this.slide.style.transform = 'rotate(180deg)'
          this.slide.style.transition = 'transform 1.5s ease'
          document.querySelector('figure').classList.add('visible')
          // document.getElementsByClassName('slider')[0].style.width = '300px';
          // this.animasi.classList.add('visible')
          this.slider.classList.remove('close')
          this.slider.classList.add('open')
          console.log('open')
        }
      }

      // this.animate = 0
      // console.log(this.animationAct)
      // this.animasi.onclick=()=>{
      //   this.animate++
      //   if(this.animate % 2 ===0){
      //     console.log('animate')
      //     for(let i = 0; i<this.animationAct.length; i++){
      //       console.log(this.animationAct[i])
      //       // this.animationAct[i].play()
      //     }
      //     document.querySelector('.fa-compact-disc').classList.add('fa-flip')
      //   }else{
      //     for(let i = 0; i<this.animationAct.length; i++){
      //       // this.animationAct[i].stop()
      //     }
      //     console.log('stop')
      //     document.querySelector('.fa-compact-disc').classList.remove('fa-flip')
      //   }
      // }
      // this.audioBtn.onclick=()=>{
      //   this.audioBtn++
      //   if(this.clickAudio %2 === 0){
      //     this.playback()
      //     this.audioBtn.innerHTML = '<i class="bi bi-pause-circle-fill"></i>'
      //   }else{
      //     this.audioBtn.innerHTML = '<i class="bi bi-play-circle-fill"></i>'
      //   }
      // }
    }
   

    update(){
      // console.log(this.time.delta * 0)
      this.animation.mixer.update(this.time.delta * 0.001)
      this.camera.controls.update()
    }

}