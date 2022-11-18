import * as THREE from 'three'
import { Group } from 'three'
import Experience from '../ExperienceThree'
import gsap from 'gsap'
import Dipol from './AnDipol'

export default class Impedansi{
  constructor(){
    this.experience = new Experience()
    this.scene = this.experience.ImpedansiScene
    this.resources = this.experience.resources
    this.time = this.experience.time
    this.camera = this.experience.camera
    this.sizes = this.experience.sizes
    this.renderer = this.experience.renderer
    this.world = this.experience.world
    this.loadIntro = this.experience.loadIntro

    this.clicked = 0
    this.isClicked = false

    this.setLoading()
    this.setSunLight()
    this.setModel()
    this.setSlider()
    this.setExplain()
    this.nextScene()
    this.getTick()
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

  setModel(){

        this.group = new Group()

        this.bgModel = {}
        this.bgModel.model = this.resources.items.bgElekModel.scene
        this.bgModel.texture = this.resources.items.bgElekTexture
        this.bgModel.texture.encoding = THREE.sRGBEncoding
        this.bgModel.texture.flipY = false

        this.imp = {}
        this.imp.model = this.resources.items.impModel
       

        this.bgModel.material = new THREE.MeshBasicMaterial({map: this.bgModel.texture})
        
        this.bgModel.model.traverse(child =>{
          if(child instanceof THREE.Mesh)
          {
            child.material = this.bgModel.material
          }
        })

        this.group.add(this.bgModel.model)
        this.group.add(this.imp.model.scene)

        this.group.rotation.y = 1.5

        this.group.position.y = -1.5
        this.scene.add(this.group)
        
        this.animation = {}
        this.animation.mixer = new THREE.AnimationMixer(this.imp.model.scene)
        this.animation.imp = this.imp.model.animations

        this.animationAct = []

        this.animation.imp.forEach(clip => {
          this.animation.mixer.clipAction(clip).play()
          this.animationAct.push(this.animation.mixer.clipAction(clip))
        });

      }

  setSlider(){
    document.querySelector('.slider').classList.add('visible')
    document.querySelector('.animasi').classList.remove('visible')
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

  setExplain(){
    let title = 'Impedansi Karakteristik'
    let pOne = 'Saluran transmisi lossless sempurna dapat diwakili oleh seluruh rangkaian induktor dan kapasitor kecil yang terhubung dalam suatu saluran. Setiap induktor mewakili induktansi dari bagian yang sangat pendek dari satu kawat dan setiap kapasitor mewakili kapasitansi antara dua bagian pendek tersebut. '
    
    let pTwo = 'Nilai induktansi dan kapasitansi per unit saluran tergantung pada ukuran konduktor dan jarak di antara mereka. Setiap induktor seri bertindak untuk membatasi laju di mana arus dapat mengisi kapasitor shunt berikut, dan dengan demikian menetapkan sifat yang sangat penting dari saluran transmisi: impedansi lonjakannya, lebih dikenal sebagai impedansi karakteristiknya. Ini biasanya disingkat Zo. Saluran transmisi kawat paralel menunjukkan impedansi karakteristik mulai dari sekitar 200 hingga 800, sedangkan kabel coax memiliki nilai Zo antara 25 hingga 100. Kecuali dalam kasus khusus, coax yang digunakan dalam radio amatir memiliki impedansi 50 atau 75. '
        //Slider UP
        document.querySelector('.slide').classList.add('visible')
        let upSlide = 0
        let upIcon = document.querySelector('.up-icon')
        document.querySelector('.slide-up').onclick = ()=>{
          console.log(this.point)
          upSlide++
          if(upSlide % 2 === 0){
            // if(`point-${i}` === 'point-0'){
            //   document.querySelector('.next-scene').classList.add('visible')
            // }
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
      this.Dipol = new Dipol()
      this.renderer.setDipolScene()
      this.audioElement = document.querySelector('audio')
      this.audioElement.src = '/sounds/materiThree/audioFive.mp3'
      this.sunLight.dispose()
      this.light.dispose()
      this.scene.remove(this.group)
      this.scene.remove(this.animation)
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
  // update(){
  //   this.camera.controls.update()
  // }

}