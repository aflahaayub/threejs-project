import * as THREE from 'three'
import Experience from '../Experience.js'
import gsap from 'gsap'

export default class Overlay
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.SeaScene
        this.time = this.experience.time
        this.debug = this.experience.debug

        // this.setAnimation()
    }

    setOverlay(){
      this.overlayGeometry = new THREE.PlaneBufferGeometry(2,2,1,1)
      this.overlayMaterial = new THREE.ShaderMaterial({
        uniforms:{
          uAlpha: {value: 1}
      },
      vertexShader: `
      void main(){
        gl_Position = vec4(position, 1.0);
      }
      `,
        fragmentShader: `
        uniform float uAlpha;

        void main(){
            gl_FragColor = vec4(0,0,0, uAlpha);
        }
        `,
        transparent: true,
        
    })
      this.overlay = new THREE.Mesh(this.overlayGeometry, this.overlayMaterial)

      this.scene.add(this.overlay)
      this.setFade()
    }

    setFade(){
      gsap.to(this.overlayMaterial.uniforms.uAlpha, {duration: 3, value: 0}
        )

      console.log('fading')
    }

    

    update()
    {
        this.animation.mixer.update(this.time.delta * 0.001)
    }
}