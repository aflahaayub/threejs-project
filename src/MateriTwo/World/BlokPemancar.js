import * as THREE from 'three'
import Experience from '../ExperienceTwo'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'
import gsap from 'gsap'

export default class BlokPemancar{
  constructor(){
    this.experience = new Experience()
    this.scene = this.experience.BlokPemancarScene
    this.resources = this.experience.resources
    this.time = this.experience.time
    this.camera = this.experience.camera
    this.sizes = this.experience.sizes
    this.renderer = this.experience.renderer
    this.world = this.experience.world
    this.loadIntro = this.experience.loadIntro

    // this.camera.instance.position.set(4,1,0.5)
    this.camera.controls.maxDistance = 35

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
          this.blok.model = this.resources.items.pemancarModel
          this.blok.model.scene.rotateY(80)
          this.blok.model.scene.position.set(1 ,-9, -1)
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
    let title = 'Pemancar Radio'
    let pOne = 'Fungsi utama Rangkaian Pemancar FM adalah mengirimkan suara menggunakan gelombang radio. Jadi, pada awalnya, Sirkuit Pemancar FM mengubah suara atau audio menjadi gelombang radio kemudian mengirimkannya. Pada bagian awal pemancar terdapat mikrofon yang merupakan transduser yang dapat mengubah energi suara menjadi sinyal audio berupa energi listrik. Jadi mikrofon adalah sumber sinyal audio. Dalam diagram blok ini, mikrofon digunakan sebagai sumber sinyal audio tetapi mungkin juga sumber audio lain. Blok selanjutnya adalah Audio Pre-amplifier. Audio pre-amplifier digunakan untuk memperkuat sinyal audio yang berasal dari mikrofon. Berikutnya adalah Modulator. Rangkaian modulator merupakan bagian utama dari rangkaian pemancar FM. Ini mengubah sinyal audio menjadi sinyal radio yang akan ditransmisikan. Rangkaian modulator mengambil dua sinyal sebagai input satu adalah sinyal audio yang berasal dari audio pre-amplifier dan yang lainnya adalah sinyal pembawa'

    let pTwo = `Sinyal pembawa adalah gelombang radio murni yang dihasilkan oleh rangkaian osilator.
    Rangkaian modulator memodulasi sinyal RF sesuai dengan sinyal audio dan menghasilkan sinyal RF termodulasi sebagai output. Tahap selanjutnya adalah penguatan sinyal radio. Rangkaian penguat RF menguatkan sinyal RF termodulasi yang berasal dari modulator. Sinyal radio termodulasi yang berasal dari rangkaian modulator memiliki amplitudo yang sangat rendah sehingga tidak dapat ditransmisikan untuk jarak yang jauh. Jadi, penguat RF digunakan untuk memperkuat sinyal radio yang dapat dengan mudah ditransmisikan untuk jarak jauh. Kemudian sinyal radio yang diperkuat diumpankan ke antena untuk transmisi sinyal.`
        //Slider UP
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
            document.querySelector('.kuis').classList.remove('visible')
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
    document.querySelector('.kuis').onclick=()=>{
      document.querySelector('.mulai-kuis').classList.add('visible')
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