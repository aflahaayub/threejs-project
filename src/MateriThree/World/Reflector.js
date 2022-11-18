import * as THREE from 'three'
import { Group, Raycaster } from 'three'
import Experience from '../ExperienceThree'
import gsap from 'gsap'

export default class Reflector{
  constructor(){
    this.experience = new Experience()
    this.scene = this.experience.ReflectorScene
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

        this.antena = {}
        this.antena.model = this.resources.items.parabolaModel
       

        this.bgModel.material = new THREE.MeshBasicMaterial({map: this.bgModel.texture})
        
        this.bgModel.model.traverse(child =>{
          if(child instanceof THREE.Mesh)
          {
            child.material = this.bgModel.material
          }
        })

        this.group.add(this.bgModel.model)
        this.group.add(this.antena.model.scene)
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

    document.getElementsByClassName('modal')[0].style.maxWidth = '500px'
    document.getElementsByClassName('modal')[0].style.maxHeight = '500px'
    document.getElementsByClassName('modal')[0].style.overflowY = 'scroll'
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

    let title = 'Antena Reflector'
    let pOne ='Keberhasilan dalam eksplorasi luar angkasa telah menghasilkan kemajuan antenna teori. Karena kebutuhan untuk berkomunikasi jarak jauh, bentuk-bentuk yang canggih antena harus digunakan untuk mengirim dan menerima sinyal yang harus bepergian jutaan mil. Bentuk antena yang sangat umum untuk aplikasi semacam itu adalah parabola reflektor. Antena jenis ini telah dibuat dengan diameter sebesar 305 m. Dimensi besar seperti itu diperlukan untuk mencapai yang tinggi gain yang diperlukan untuk mengirim atau menerima sinyal setelah jutaan mil perjalanan. Lain bentuk reflektor, meskipun tidak biasa seperti parabola, adalah reflektor sudut.'
    
    let pTwo = 'Antena parabola adalah antena yang menggunakan reflektor parabola, permukaan melengkung dengan bentuk penampang parabola, untuk mengarahkan gelombang radio ke penerima di titik fokusnya. Bentuk yang paling umum berbentuk seperti piring dan populer disebut antena parabola atau parabola. Keuntungan utama dari antena parabola adalah ia memiliki direktivitas tinggi. Antena parabola memiliki beberapa penguatan tertinggi, yang berarti bahwa mereka dapat menghasilkan beamwidth tersempit, dari semua jenis antena.  Untuk mencapai beamwidth yang sempit, reflektor parabola harus jauh lebih besar dari panjang gelombang gelombang radio yang digunakan, sehingga  antena parabola digunakan di bagian frekuensi tinggi dari spektrum radio, pada frekuensi UHF dan microwave (SHF), di mana panjang gelombang cukup kecil sehingga reflector yang berukuran nyaman dapat digunakan.  '
        //Slider UP
        document.querySelector('.slide').classList.add('visible')
        let upSlide = 0
        let upIcon = document.querySelector('.up-icon')
        document.querySelector('.slide-up').onclick = ()=>{
          console.log(this.point)
          upSlide++
          if(upSlide % 2 === 0){
            document.querySelector('.back').classList.remove('visible')
            document.querySelector('.slide-up').classList.add('hide')
            document.querySelector('.slide-up').classList.remove('open')
            document.querySelector('.judul').innerHTML = ''
            document.querySelector('.p1').innerHTML = ''
            document.querySelector('.p2').innerHTML = ''
            upIcon.style.transform = 'rotate(0deg)'
            document.querySelector('.kuis').classList.add('visible')
          }else{
            document.querySelector('.back').classList.remove('visible')
            document.querySelector('.slide-up').classList.remove('hide')
            document.querySelector('.slide-up').classList.add('open')
            upIcon.style.transform = 'rotate(180deg)'
            upIcon.style.transition = 'transform 1.2s ease'
            document.querySelector('.judul').innerHTML = title
            document.querySelector('.p1').innerHTML = pOne
            document.querySelector('.p2').innerHTML = pTwo
            document.querySelector('.kuis').classList.remove('visible')
          }
        }
        document.querySelector('.back').onclick=()=>{
          document.querySelector('.back').classList.remove('visible')
        }
  }

  nextScene(){
    document.querySelector('.kuis').onclick=()=>{
      document.querySelector('.mulai-kuis').classList.add('visible')
      document.querySelector('.mulai-kuis').classList.remove('no-disp')
    }
    
  }

  update(){
    this.camera.controls.update()
  }

}