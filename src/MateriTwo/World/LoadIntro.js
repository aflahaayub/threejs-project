import * as THREE from 'three'
import Experience from '../ExperienceTwo.js'
import gsap from 'gsap'

export default class LoadIntro
{
    constructor()
    {
        this.experience = new Experience()
        this.time = this.experience.time
        this.debug = this.experience.debug
        this.scene = this.experience.RadioScene
        // this.scene = this.experience.BlokLangsungScene
        console.log(this.scene)
        this.setIntro()
        // this.setAnimation()
    }

    setIntro(){
        console.log('set intro')
      this.overlayGeometry = new THREE.PlaneBufferGeometry(2,2,1,1)
      this.overlayMaterial = new THREE.ShaderMaterial({
        vertexShader: `void main(){
            gl_Position = vec4(position, 1.0);
          }`,
        fragmentShader:`uniform float uAlpha;
        void main(){
          gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
        }`,
        transparent: true,
        uniforms:{
            uAlpha: {value: 1}
        }
    })
      this.overlay = new THREE.Mesh(this.overlayGeometry, this.overlayMaterial)
      console.log(this.overlay)

      this.scene.add(this.overlay)
    }

    

    update()
    {
        this.animation.mixer.update(this.time.delta * 0.001)
    }
}