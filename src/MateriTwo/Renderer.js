import * as THREE from 'three'
import Experience from './ExperienceTwo.js'
import Radio from './World/Radio.js'

import { randFloatSpread } from 'three/src/math/MathUtils.js'

export default class Renderer
{
    constructor()
    {
        this.experience = new Experience()
        this.canvas = this.experience.canvas
        this.sizes = this.experience.sizes

        this.scene = this.experience.RadioScene
        // this.scene = this.experience.BlokPemancarScene
        // this.scene = this.experience.BlokLangsungScene
        

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
        // this.instance.setClearColor('#CBA380')
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))

    }


    setLangsungScene(){
        this.scene = this.experience.BlokLangsungScene
    }

    setSuperScene(){
        this.scene = this.experience.BlokSuperScene
    }

    setFMScene(){
        this.scene = this.experience.BlokFMScene
    }

    setPemancarScene(){
        this.scene = this.experience.BlokPemancarScene
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