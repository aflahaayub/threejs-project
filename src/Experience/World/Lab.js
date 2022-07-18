import * as THREE from 'three'
import { Raycaster, Vector2 } from 'three'
import Experience from '../Experience.js'
import Sizes from '../Utils/Sizes.js'
import gsap from 'gsap'
import Sea from './raging-sea.js'

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
        

        console.log(this.scene)
        this.model = this.resources.items.labModel

        this.setRoom()
        this.setPointers()
        this.setAnimation()
        this.getEachPoint()
        this.setCamera()
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

        for(let i = 0; i < this.model.animations.length; i++){

          this.animation.actions[i] = this.animation.mixer.clipAction(this.model.animations[i])

          this.animation.actions[i].play()
        }
    }

    getEachPoint(){
      this.showPoints = true
      this.otherTick = ()=>{
        if(this.world.sceneReady){
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
      let isButtonClicked = false
      
      for(let i = 0; i < this.points.length; i++){
        document.querySelector(`.point-${i}`).onclick = ()=>{
          document.querySelector('.back').classList.add('visible')
          
          if(`point-${i}` === 'point-0'){
            console.log('this is 3')
            // 0.5, 3.5, 2.6
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

            document.querySelector('.next-scene').classList.add('visible')
            this.nextBtn = 0

            //change scene
            document.querySelector(`.next-scene`).onclick =()=>{
              
              // this.startLoad()
              document.querySelector(`.point-${i}`).classList.remove('visible')

              document.querySelector('.back').classList.remove('visible')

              document.querySelector('.next-scene').classList.remove('visible')

              
              // this.animation.mixer.stopAllAction()
              
              //remove class
              this.showPoints = false

              // this.sea = new Sea()
              this.sea = new Sea()
              this.renderer.setSeaScene()
              
              // this.scene = this.experience.SeaScene
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
        }
        
      }

      // Tombol Kembali
      document.querySelector(`.back`).onclick = ()=>{
        // gsap.to(this.camera.instance)
        console.log('kembali')
        gsap.to(this.camera.instance.position, {duration: 3,
          x: 7,
          y: 8,
          z: 9
        })

        document.querySelector('.back').classList.remove('visible')
      }


  
      //if points[0] clicked, move to the given position 
    }
    }

    update(){
      // console.log(this.time.delta * 0)
      this.animation.mixer.update(this.time.delta * 0.001)

      // if(this.sea){
      //   this.sea.update()
      //   console.log('sea update')
      // }
      // // this.world.update(scene)
      this.camera.controls.update()

      // this.renderer.update(this.scene)
      
    
    }
}