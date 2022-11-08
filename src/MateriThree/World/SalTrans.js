import * as THREE from 'three'
import { Group, Raycaster } from 'three'
import Experience from '../ExperienceThree'
import gsap from 'gsap'
import Elektromagnetik from './Elektromagnetik'

export default class Saluran{
  constructor(){
    this.experience = new Experience()
    this.scene = this.experience.SaluranScene
    this.resources = this.experience.resources
    this.time = this.experience.time
    this.camera = this.experience.camera
    this.sizes = this.experience.sizes
    this.renderer = this.experience.renderer
    this.world = this.experience.world
    this.loadIntro = this.experience.loadIntro

    this.clicked = 0
    this.isClicked = false

    // this.camera.instance.position.set()
    // this.camera.controls.maxDistance = 35

    this.setLoading()
    this.setSunLight()
    this.setSaltrans()
    this.setSlider()
    this.setPointers()
    this.getEachPoint()
    this.setZoom()
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

      const light = new THREE.AmbientLight( 0xffffff ); // soft white light
      this.scene.add( light );

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

setSaltrans(){

        this.group = new Group()

        this.saltrans = {}
        this.saltrans.model = this.resources.items.salModel

        this.bgSaluran = {}
        this.bgSaluran.model = this.resources.items.bgSalModel.scene
        this.bgSaluran.texture = this.resources.items.bgTexture
        this.bgSaluran.texture.encoding = THREE.sRGBEncoding
        this.bgSaluran.texture.flipY = false

        this.bgSaluran.material = new THREE.MeshBasicMaterial({map: this.bgSaluran.texture})
        
        this.bgSaluran.model.traverse(child =>{
          if(child instanceof THREE.Mesh)
          {
            child.material = this.bgSaluran.material
          }
        })
        // console.log(this.gui.add)

        this.group.add(this.bgSaluran.model)
        this.group.add(this.saltrans.model.scene)

        this.group.rotation.y = 1.5

        // this.gui.add(this.group.rotation, 'y').min(-3).max(3).step(0.01).name('rotate')

        this.group.position.y = -1.5
        this.scene.add(this.group)
        
        // const axesHelper = new THREE.AxesHelper( 10 );
        // this.scene.add( axesHelper );

      }

  setPointers(){
    this.raycaster = new Raycaster()
      this.points = [
        {
          position: new THREE.Vector3(-1.5,-0.5, 3 ),
          element: document.querySelector('.point-0')
        },
        {
          position: new THREE.Vector3(-1.5,-0.5, 1),
          element: document.querySelector('.point-1')
        },
        {
          position: new THREE.Vector3(-1.5, -0.5, -0.8),
          element: document.querySelector('.point-2')
        },
        {
          position: new THREE.Vector3(-1.5, -0.5, -3),
          element: document.querySelector('.point-3')
        }
      ]
  }

  getEachPoint(){
    document.querySelector('.slide').classList.remove('visible')
    this.otherTick = ()=>{

          for(const point of this.points){
          this.screenPosition = point.position.clone()// 
          this.screenPosition.project(this.camera.instance) 

          this.raycaster.setFromCamera(this.screenPosition, this.camera.instance)
          this.intersects = this.raycaster.intersectObjects(this.scene.children,true)

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
      
      window.requestAnimationFrame(this.otherTick)
    }

    this.otherTick()

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

  setZoom(){
    this.point = ''
    for(let i = 0; i < this.points.length; i++){
      document.querySelector(`.point-${i}`).onclick = ()=>{
        document.querySelector('.back').classList.add('visible')
        if(`point-${i}` === 'point-0'){
          this.point = 0
          document.querySelector('.point-1').classList.remove('noClick')
          gsap.to(this.camera.instance.position, {duration: 3,
            x: 0.2,
            y: 0.5,
            z: 3
          })
          gsap.to(this.camera.controls.target,{
            duration: 1,
            x: -1.5,
            y: -0.5,
            z:3
          })
          document.querySelector('.slide').classList.add('visible')

        }
        else if(`point-${i}` === 'point-1'){
          document.querySelector('.point-2').classList.remove('noClick')
          document.querySelector('.back').classList.add('visible')
          
          this.point = 1
          gsap.to(this.camera.instance.position, {duration: 3,
            x: 0.5,
            y: -0.2,
            z: 1
          })
          gsap.to(this.camera.controls.target,{
            duration: 1,
            x: -1.5,
            y: -0.5,
            z: 1
          })
          document.querySelector('.slide').classList.add('visible')
  
        }
        else if(`point-${i}` === 'point-2'){
          document.querySelector('.point-3').classList.remove('noClick')
          document.querySelector('.back').classList.add('visible')

          this.point = 2
          gsap.to(this.camera.instance.position, {duration: 3,
            x: 0,
            y: 0.3,
            z: -0.5
          })
          gsap.to(this.camera.controls.target,{
            duration: 1,
            x: -1.5,
            y: -0.5,
            z: -0.8
          })
          document.querySelector('.slide').classList.add('visible')
        }
        else if(`point-${i}` === 'point-3'){
          this.point = 3
          document.querySelector('.back').classList.add('visible')

          gsap.to(this.camera.instance.position, {duration: 3,
            x: 1,
            y: 1,
            z: -3
          })
          gsap.to(this.camera.controls.target,{
            duration: 1,
            x: -1.5,
            y: -0.5,
            z: -3
          })
          document.querySelector('.slide').classList.add('visible')
        }
        document.querySelector(`.back`).onclick = ()=>{
          console.log('kembali')
          gsap.to(this.camera.instance.position, {duration: 3,
            x: 5,
            y: 1,
            z: 0.5
            
          })
          if(this.point === 3){
            document.querySelector('.next-scene').classList.add('visible')
          }
  
          document.querySelector('.back').classList.remove('visible')
          document.querySelector('.slide').classList.remove('visible')
        }
    }

   

 
    }
  }

  setExplain(){
    let title = ['Two-Wire Transmission Line', 'Kabel Koaxial / Coaxial Line', 'Microstrip Transmission Line', 'Waveguide']
    let pOne = ['Salah satu tipe dari parallel line atau kabel parallel ganda adalah two-wire  transmission line. Saluran ini memiliki dua kabel yang biasanya diberi jarak 2 sampai 6 inches dengan insulating spacer. Jenis saluran ini biasa digunakan untuk saluran listrik, saluran telepon pedesaan, dan saluran telegraf. ', 'Kabel koaxial adalah sarana penyalur atau pengalirhantar (transmitter) yang bertugas menyalurkan setiap informasi yang telah diubah menjadi sinyal–sinyal listrik. Kabel ini memiliki kemampuan yang besar dalam menyalurkan bidang frekuensi yang lebar, sehingga sanggup mengalirhantar (transmit) kelompok kanal frekuensi percakapan atau program televisi. Kabel koaxial biasanya digunakan untuk saluran antar-setempat (interlocal) yang berjarak cukup dekat yakni, dengan jarak selebihnya 2.000 km.', 'Mikrostrip merupakan tipe dari saluran transmisi yang bisa dibuat dengan berbagai teknologi dimana konduktor terpisah dengan ground oleh sebuah lapisan dielektrik yang disebut dengan substrat. Saluran transmisi microstrip biasa digunakan untuk menyalurkan sinyal microwave. ', 'Waveguide merupakan tabung konduktor berongga dimana gelombang microwave akan ditransmisikan dalam bentuk gelombang elektromagnetik. Tabung pada waveguide tidak membawa arus seperti yang dilakukan oleh saluran transmisi dua konduktor. Sebaliknya, waveguide menjadi penghalang yang membatasi gelombang ke ruang tertutup. ']
    
    let pTwo = ['', 'Bagian dari kabel koaxial antara lain,  Konduktor utama -> Konduktor kabel harus terbuat dari bahan tembaga padat berbentuk silindris tanpa cacat berkonduktivitas tinggi. Untuk diameter dari kabel tidak diperbolehkan melebihi 0,02 mm dan 1,53 mm. Sedangkan untuk tahanan dari konduktor yang letaknya di dalam ( inner conductor) adalah 1/58 per 1 meter.	Isolasi -> Isolasi kabel terbuat dari bahan polietilena homogen dan melingkari pada konduktor utama. Untuk diameter nominalnya yakni 0,97 mm dan juga tidak diperbolehkan melebihi 0,05 mm. Konduktor bagian luar -> Konduktor terbuat dari pita tembaga yang memiliki tebal 0,25 mm dengan maksimum toleransi 0,2 mm pada posisi memanjang dan sedikit tumpang tindih. Untuk tahanannya adalah sebesar 1/52 per meter. Pada bagian atas pita tembaga ini dibalut secara helikod dengan dua lapis pita baja yang memiliki tebal 0,15 mm yang digunakan sebagai pelindung elektromagnetik. Pembungkus luar -> Pembungkus luar kabel terbuat dari polietilena yang dicampur dengan karbon hitam sebanyak 2%. Untuk tebal rata – rata pembungkus tidak diperbolehkan melebihi dari 2 mm dan juga tidak boleh kurang dari 1,6 mm. Sementara untuk tebal dari bagian antara penggantung dengan kabel adalah 3,4 mm dan dengan tinggi 3 – 4,5 mm. ', '', 'Skin effect yang ada pada bagian dalam dinding waveguide akan membatasi energi elektromagnetik yang berada di dalam waveguide seperti yang dilakukan oleh pelindung pada kabel koaxial yang membatasi energi didalam koax. Energi microwave akan masuk dari bagian ujung waveguide, dan akan diterima pada ujung lainnya. Waveguide hanya bekerja untuk membatasi energi yang merambat dengan cara refleksi pada bagian dalam waveguide.' ]
        //Slider UP
        // document.querySelector('.slide').classList.add('visible')
        let upSlide = 0
        let upIcon = document.querySelector('.up-icon')
        document.querySelector('.slide-up').onclick = ()=>{
          console.log(this.point)
          upSlide++
          if(upSlide % 2 === 0){
            if(`point-${this.point}` === 'point-3'){
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
            document.querySelector('.next-scene').classList.remove('visible')
            document.querySelector('.slide-up').classList.remove('hide')
            document.querySelector('.slide-up').classList.add('open')
            upIcon.style.transform = 'rotate(180deg)'
            upIcon.style.transition = 'transform 1.2s ease'
            document.querySelector('.judul').innerHTML = title[this.point]
            document.querySelector('.p1').innerHTML = pOne[this.point]
            document.querySelector('.p2').innerHTML = pTwo[this.point]
          }
        }
  }

  nextScene(){
    document.querySelector(`.next-scene`).onclick =()=>{
      document.querySelector('.back').classList.remove('visible')
      document.querySelector('.next-scene').classList.remove('visible')
      this.elektromagneitik = new Elektromagnetik()
      this.renderer.setElektromagnetikScene()
      document.querySelector('.point-0').remove()
      document.querySelector('.point-1').classList.add('no-disp')
      document.querySelector('.point-2').remove()
      document.querySelector('.point-3').remove()

    }
  }

  update(){
    // this.camera.controls.update()
  }

}