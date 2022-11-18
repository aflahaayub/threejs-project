import * as THREE from 'three'
import { Group, Raycaster } from 'three'
import Experience from '../ExperienceThree'
import gsap from 'gsap'
import Monopol from './Monopole'

export default class Dipol{
  constructor(){
    this.experience = new Experience()
    this.scene = this.experience.DipolScene
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
        this.bgModel.model = this.resources.items.bgMejaModel.scene
        this.bgModel.texture = this.resources.items.bgMejaTexture
        this.bgModel.texture.encoding = THREE.sRGBEncoding
        this.bgModel.texture.flipY = false

        this.dipol = {}
        this.dipol.model = this.resources.items.dipolModel
       

        this.bgModel.material = new THREE.MeshBasicMaterial({map: this.bgModel.texture})
        
        this.bgModel.model.traverse(child =>{
          if(child instanceof THREE.Mesh)
          {
            child.material = this.bgModel.material
          }
        })

        this.group.add(this.bgModel.model)
        this.group.add(this.dipol.model.scene)


        // this.group.scale.set(-1,-1,-1)
        this.group.rotation.y = 1.5

        this.group.position.x = -12
        this.group.position.y = -9.5
        this.group.position.z = -1

        console.log(this.group)
        console.log(this.scene)
        // this.scene.add(this.group)
        this.scene.add(this.group)
        document.querySelector('.point-1').classList.remove('no-disp')

      }

  setPointers(){
    // const axesHelper = new THREE.AxesHelper( 10 );
    // this.scene.add( axesHelper );

        this.raycaster = new Raycaster()
          this.points = [
            {
              position: new THREE.Vector3(-9.5,-2, -0.5),
              element: document.querySelector('.point-1')
            }
          ]
          console.log(document.getElementById('point1'))
          document.getElementById('point1').getElementsByClassName('text')[0].innerHTML = 'Antena Dipol'
          document.getElementById('point1').getElementsByClassName('label')[0].innerHTML = '1'
    }

    
  getEachPoint(){

        this.otherTick = ()=>{
            document.querySelector('.slider').classList.add('visible')
              
              for(const point of this.points){
              this.screenPosition = point.position.clone()// 
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
    this.point = 0

    document.querySelector('.point-1').classList.remove('noClick')
    document.querySelector('.point-1').onclick = ()=>{
      document.querySelector('.back').classList.add('visible')
          console.log('clicked')
          this.point = 1
          
          gsap.to(this.camera.instance.position, {duration: 3,
            x: -3.5,
            y: -0.5,
            z: -0.5
          })
          gsap.to(this.camera.controls.target,{
            duration: 1,
            x: -10,
            y: -1,
            z: -0.5
          })
          document.querySelector('.slide').classList.add('visible')

        document.querySelector(`.back`).onclick = ()=>{
          console.log('kembali')
          this.point = 0
          gsap.to(this.camera.instance.position, {duration: 3,
            x: 15,
            y: 2,
            z: 0.5
          })
  
          document.querySelector('.back').classList.remove('visible')
          document.querySelector('.slide').classList.add('visible')
        }
    }
  }

  setExplain(){
    console.log(document.getElementById('point1').getElementsByClassName('text')[0].innerHTML)
    let title = ['Antena Gelombang Radio', 'Antena Dipol']
    let pOne = ['Antena adalah salah satu komponen yang paling penting dalam sistem komunikasi. Sebuah antenna adalah bagian vital dari suatu pemancar atau penerima yang berfungsi untuk menyalurkan sinyal radio ke udara. Bentuk antenna bermacam-macam sesuai dengan desain, pola penyebaran, serta gain. Fungsi dari antena adalah mengubah energi listrik yang berasal dari pemancar menjadi gelombang radio, kemudian menerima gelombang radio dan mengubahnya menjadi sinyal listrik. ', 'Dalam radio dan telekomunikasi, antena dipol atau doublet adalah kelas antena yang paling sederhana dan paling banyak digunakan. Dipol adalah salah satu dari kelas antena yang menghasilkan pola radiasi yang mendekati pola dipol listrik dasar dengan struktur memancar yang mendukung arus saluran yang diberi energi sehingga arus hanya memiliki satu simpul di setiap ujungnya. ']
    
    let pTwo = ['Terdapat beberapa karakter penting dalam antenna yang perlu dipertimbangkan, yaitu direktivitas, gain, polarisasi antenna, serta pola radiasi antenna. Direktivitas merupakan hal yang Merepresentasikan ‘pengarahan’ antena, semakin besar direktivitas dapat diartikan bahwa lebar berkasnya (main beam) semakin sempit. Direktivitas antena merupakan pengarahan konsentrasi energi dan besar pengarahan pola radiasi suatu antena dimana semakin tinggi direktivitas suatu antena maka lebar berkas (main beam) pola radiasi akan semakin sempit sehingga antena semakin fokus. Gain antena merupakan faktor perbandingan antara daya output atau Effective Isotropic Radiated Power (EIRP) dengan daya input yang diberikan kepada suatu antena. Besarnya gain suatu antena dapat dihitung dengan membandingkan intensitas radiasi maksimum suatu antena dengan intensitas radiasi antena sumber dengan daya input yang sama. Gain mempunyai satuan decibel (dB), sedangkan satuan gain dengan antena sumber isotropik adalah decibel isotropic (dBi). Polarisasi antena merupakan orientasi perambatan radiasi gelombang elektromagnetik yang dipancarkan oleh suatu antena dimana arah elemen antena terhadap permukaan bumi sebagai referensi lain. Energi yang berasal dari antena yang dipancarkan dalam bentuk sphere, dimana bagian kecil dari sphere disebut dengan wave front. Pola radiasi antena merupakan diagram radiasi yang menunjukan distribusi daya yang dipancarkan oleh suatu antena. Besaran ini diukur dalam ruang pada medan jauh dengan jarak yang konstan terhadap antena dengan sudut yang bervariasi (sudut θ dan sudut ɸ). ', 'Antena ini terdiri dari dua buah logam konduktor atau kabel, berorientasi sejajar dan kolinier dengan lainya (segaris dengan yang lainya), dengan sela kecil di tengahnya. Contoh umum dipol adalah antenna televisi  "telinga kelinci". ']
        //Slider UP
        document.querySelector('.slide').classList.add('visible')
        let upSlide = 0
        let upIcon = document.querySelector('.up-icon')
        document.querySelector('.slide-up').onclick = ()=>{
          console.log(this.point)
          upSlide++
          if(upSlide % 2 === 0){
            if(this.point !== 0){
              document.querySelector('.back').classList.add('visible')
            }
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
            document.querySelector('.judul').innerHTML = title[this.point]
            document.querySelector('.p1').innerHTML = pOne[this.point]
            document.querySelector('.p2').innerHTML = pTwo[this.point]
          }
        }
  }

  nextScene(){
    document.querySelector(`.next-scene`).onclick =()=>{
      document.querySelector('.point-1').classList.add('no-disp')
      document.querySelector('.next-scene').classList.remove('visible')
      this.monopole = new Monopol()
      this.renderer.setMonopoleScene()
      this.audioElement = document.querySelector('audio')
      this.audioElement.src = '/sounds/materiThree/audioSix.mp3'
      this.sunLight.dispose()
      this.light.dispose()
      this.scene.remove(this.group)
    }
  }

  update(){
    this.camera.controls.update()
  }

}