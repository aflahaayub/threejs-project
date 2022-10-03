import * as THREE from 'three'
import Experience from '../Experience.js'
import vertex from '../Shaders/Intro/vertex.glsl'
import fragment from '../Shaders/Intro/fragment.glsl'
import gsap from 'gsap'

export default class LoadIntro
{
    constructor()
    {
        this.experience = new Experience()
        this.time = this.experience.time
        this.debug = this.experience.debug
        this.scene = this.experience.LabScene
        console.log(this.scene)
        this.setIntro()
        // this.setAnimation()
    }

    setIntro(){
        console.log('set intro')
      this.overlayGeometry = new THREE.PlaneBufferGeometry(2,2,1,1)
      this.overlayMaterial = new THREE.ShaderMaterial({vertexShader: vertex,
        fragmentShader: fragment,
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