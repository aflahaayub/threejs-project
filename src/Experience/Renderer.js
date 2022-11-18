import * as THREE from 'three'
import Experience from './Experience.js'

export default class Renderer
{
    constructor()
    {
        this.experience = new Experience()
        this.canvas = this.experience.canvas
        this.sizes = this.experience.sizes

        this.scene = this.experience.LabScene
        // this.scene = this.experience.LosScene
        

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
        // this.instance.toneMappingExposure = 1.75
        this.instance.shadowMap.enabled = true
        // this.instance.shadowMap.type = THREE.PCFSoftShadowMap
        this.instance.setClearColor('#211d20')
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 1))
        // this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))

        console.log(this.instance.info)

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
        // this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 1))
    }

    update(){
        this.instance.render(this.scene, this.camera.instance)
    }
}