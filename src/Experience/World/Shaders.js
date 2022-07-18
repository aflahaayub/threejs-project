import * as THREE from 'three'
import Experience from '../Experience.js'
import vertex from '../Shaders/test/vertex.glsl'
import fragment from '../Shaders/test/fragment.glsl'
import { DoubleSide } from 'three'

export default class Shaders{
  constructor(){
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.debug = this.experience.debug
    console.log(this.debug)
    // this.time = this.start.time

    //Debug
    if(this.debug.active){
      this.debugFolder = this.debug.ui.addFolder('shaders')
    }

    this.clock = new THREE.Clock()

    this.setRibbon()
    // this.setGUI()
    this.setAnimation()
  }

  setRibbon(){
    this.geometry = new THREE.PlaneGeometry(10,1,1,1)
    this.plane = new THREE.Mesh(this.geometry, new THREE.MeshBasicMaterial({color: 0xff0000, side: THREE.DoubleSide}))
    this.plane.rotateY(180)
    console.log(this.plane)

    this.scene.add(this.plane)
  }

  // setGeometry(){
  //   this.geometry = new THREE.PlaneGeometry(10,10,10,10)
  // }

  // setTexture(){
  //   this.textures = {}
  //   this.textures.color = this.resources.items.flag
  //   this.textures.color.encoding= THREE.sRGBEncoding
  // }

  // setMaterial(){
  //   // this.material = new THREE.RawShaderMaterial({
  //   //   vertexShader: vertex,
  //   //   fragmentShader: fragment,
  //   //   uniforms:{
  //   //     uFrequency: {value: new THREE.Vector2(10,5)},//u is uniforms
  //   //     uTime: {value: 0},
  //   //     uColor: {value: new THREE.Color('orange')},
  //   //     uTexture: {value: this.textures.color}
  //   //   }
  //   // })
  //   this.material = new THREE.ShaderMaterial({
  //     vertexShader: vertex,
  //     fragmentShader: fragment,
  //     uniforms:{
  //       uFrequency: {value: new THREE.Vector2(10,5)},//u is uniforms
  //       uTime: {value: 0},
  //       uColor: {value: new THREE.Color('orange')},
  //       uTexture: {value: this.textures.color}
  //     }
  //   })
  // }

  // setAttribute(){
  //   const count = this.geometry.attributes.position.count
  //   const randoms = new Float32Array(count)
  //   for(let i =0; i < count; i++){
  //     randoms[i] = Math.random()
  //   }
  //   this.geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1)) //a is attribute
  // }

  // setMesh(){
  //   this.mesh = new THREE.Mesh(this.geometry, this.material)

  //   this.mesh.scale.y = 2/3

  //   this.scene.add(this.mesh)
  // }

  // setGUI(){
  //   this.debugFolder.add(this.material.uniforms.uFrequency.value, 'x').min(0).max(20).step(0.01).name('frequencyX')
  //   this.debugFolder.add(this.material.uniforms.uFrequency.value, 'y').min(0).max(20).step(0.01).name('frequencyY')
  // }

  setAnimation(){
    this.elapsedTime = this.clock.getElapsedTime()

  //   // console.log(this.elapsedTime)
  //   this.material.uniforms.uTime.value = this.elapsedTime

    window.requestAnimationFrame(()=>{
      this.setAnimation()
    })
  }

}