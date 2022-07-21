import * as THREE from 'three'
import Experience from './Experience.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class Camera
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.debug = this.experience.debug
        this.canvas = this.experience.canvas

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Camera')
        }

        this.setInstance()
        this.setControls()
        this.setCameraScene()
    }

    setInstance()
    {

        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 100)

        this.instance.position.set(8,8,10)

        // this.instance.position.set(1, 1, 1)
        // this.scene.add(this.instance)

        if(this.debug.active)
        {
            this.debugFolder.add(this.instance.position, 'x').min(-10).max(100).step(0.1).name('Camera Position x')
            this.debugFolder.add(this.instance.position, 'y').min(0.1).max(100).step(0.1).name('Camera Position y')
            this.debugFolder.add(this.instance.position, 'z').min(0.1).max(100).step(0.1).name('Camera Position z')
        }
    }

    setControls()
    {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
        this.controls.minDistance = 2
        this.controls.maxDistance = 25
        this.controls.maxPolarAngle = Math.PI / 3
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