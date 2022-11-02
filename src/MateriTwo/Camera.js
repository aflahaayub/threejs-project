import * as THREE from 'three'
import Experience from './ExperienceTwo.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class Camera
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.debug = this.experience.debug
        this.canvas = this.experience.canvas

        this.setInstance()
        this.setControls()
        this.setCameraScene()
    }

    setInstance()
    {

        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 100)

        this.instance.position.set(5,1,0.5)
        // this.instance.position.set(1, 1, 1)
        // this.scene.add(this.instance)

    }

    setControls()
    {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.maxAzimuthAngle = [-Math.PI/3, Math.PI/3]
        this.controls.enableDamping = true
        // this.controls.minDistance = 2
        this.controls.maxDistance = 10
        this.controls.maxPolarAngle = Math.PI / 2
        
    }

    setCameraScene(){
        
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update()
    {
        this.controls.update()
    }
}