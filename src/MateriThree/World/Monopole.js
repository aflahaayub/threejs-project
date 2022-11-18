import * as THREE from 'three'
import { Group, Raycaster } from 'three'
import Experience from '../ExperienceThree'
import gsap from 'gsap'
import Loop from './Loop'

export default class Monopol{
  constructor(){
    this.experience = new Experience()
    this.scene = this.experience.MonopoleScene
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

        console.log(this.resources.items)
        this.bgModel = {}
        this.bgModel.model = this.resources.items.bgBlankModel.scene
        this.bgModel.texture = this.resources.items.bgBlankTexture
        this.bgModel.texture.encoding = THREE.sRGBEncoding
        this.bgModel.texture.flipY = false

        this.whips = {}
        this.whips.model = this.resources.items.whipsModel
       

        this.bgModel.material = new THREE.MeshBasicMaterial({map: this.bgModel.texture})
        
        this.bgModel.model.traverse(child =>{
          if(child instanceof THREE.Mesh)
          {
            child.material = this.bgModel.material
          }
        })

        this.group.add(this.bgModel.model)
        this.group.add(this.whips.model.scene)
        // this.group.scale.set(-1,-1,-1)
        this.group.rotation.y = 1.5

        this.group.position.x = -12
        this.group.position.y = -9.5
        this.group.position.z = -1
        // this.scene.add(this.group)
        this.scene.add(this.group)

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

    let title = 'Antena Monopole'
    let pOne ='Antena monopole adalah kelas antena radio yang terdiri dari konduktor berbentuk batang lurus, sering dipasang tegak lurus di atas beberapa jenis permukaan konduktif , yang disebut ground plane. Sinyal penggerak dari pemancar diterapkan, atau untuk antena penerima, sinyal keluaran ke penerima diambil, antara ujung bawah monopole dan bidang tanah. Satu sisi feedline antena terpasang ke ujung bawah monopole, dan sisi lainnya terpasang ke ground plane, yang sering kali merupakan Bumi. Ini kontras dengan antena dipol yang terdiri dari dua konduktor batang identik, dengan sinyal dari pemancar diterapkan di antara dua bagian antena.'
    
    let pTwo = 'Whips adalah jenis antena monopole yang paling umum, dan digunakan pada pita radio frekuensi tinggi HF, VHF dan UHF. Mereka banyak digunakan sebagai antena untuk radio genggam, telepon nirkabel, walkie-talkie, radio FM, dan perangkat berkemampuan Wi-Fi, dan dipasang pada kendaraan sebagai antena untuk radio mobil dan untuk pesawat terbang. Versi yang lebih besar dipasang di atap, balkon dan tiang radio digunakan sebagai antena stasiun pangkalan untuk radio amatir dan polisi, pemadam kebakaran, ambulans, taksi, dan operator kendaraan lainnya. '
        //Slider UP
        document.querySelector('.slide').classList.add('visible')
        let upSlide = 0
        let upIcon = document.querySelector('.up-icon')
        document.querySelector('.slide-up').onclick = ()=>{
          console.log(this.point)
          upSlide++
          if(upSlide % 2 === 0){
            document.querySelector('.back').classList.remove('visible')
            document.querySelector('.next-scene').classList.add('visible')
            document.querySelector('.slide-up').classList.add('hide')
            document.querySelector('.slide-up').classList.remove('open')
            document.querySelector('.judul').innerHTML = ''
            document.querySelector('.p1').innerHTML = ''
            document.querySelector('.p2').innerHTML = ''
            upIcon.style.transform = 'rotate(0deg)'
          }else{
            document.querySelector('.back').classList.remove('visible')
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
        document.querySelector('.back').onclick=()=>{
          document.querySelector('.back').classList.remove('visible')
        }
  }

  nextScene(){
    document.querySelector(`.next-scene`).onclick =()=>{
      
      document.querySelector('.next-scene').classList.remove('visible')
      this.loop = new Loop()
      this.renderer.setLoopScene()
      this.audioElement = document.querySelector('audio')
      this.audioElement.src = '/sounds/materiThree/audioSeven.mp3'
      this.sunLight.dispose()
      this.light.dispose()
      this.scene.remove(this.group)
    }
  }

  update(){
    this.camera.controls.update()
  }

}