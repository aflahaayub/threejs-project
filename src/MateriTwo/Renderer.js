import * as THREE from 'three'
import Experience from './Experience.js'
import Sea from './World/raging-sea.js'
import Planet from './World/Planet.js'
import LoadIntro from './World/LoadIntro.js'
import Lab from './World/Lab.js'
import { randFloatSpread } from 'three/src/math/MathUtils.js'

export default class Renderer
{
    constructor()
    {
        this.experience = new Experience()
        this.canvas = this.experience.canvas
        this.sizes = this.experience.sizes

        this.scene = this.experience.LabScene
        

        this.camera = this.experience.camera

        //count scene
        this.setInstance()
    }

    setInstance()
    {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        })
        this.instance.physicallyCorrectLights = true
        this.instance.outputEncoding = THREE.sRGBEncoding
        this.instance.toneMapping = THREE.CineonToneMapping
        this.instance.toneMappingExposure = 1.75
        this.instance.shadowMap.enabled = true
        this.instance.shadowMap.type = THREE.PCFSoftShadowMap
        this.instance.setClearColor('#211d20')
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))

    }


    setSeaScene(){
        this.scene = this.experience.SeaScene
    }

    setPlanetScene(){
        this.scene = this.experience.PlanetScene
    }

    setGroundScene(){
        this.scene = this.experience.GroundScene
    }

    setIonScene(){
        this.scene = this.experience.Ionosphere
    }

    setLosScene(){
        this.scene = this.experience.LosScene
    }

    setLabScene(){
        this.scene = this.experience.LabScene
    }

    resize()
    {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
    }

    update(){
        this.instance.render(this.scene, this.camera.instance)
    }
}