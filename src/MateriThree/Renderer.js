import * as THREE from 'three'
import Experience from './ExperienceThree.js'
// import  from './World/AntenaTransmisi.js'

import { randFloatSpread } from 'three/src/math/MathUtils.js'
import { PMREMGenerator } from 'three'

export default class Renderer
{
    constructor()
    {
        this.experience = new Experience()
        this.canvas = this.experience.canvas
        this.sizes = this.experience.sizes

        this.scene = this.experience.AntenaTransmisiScene
        // this.scene = this.experience.SaluranScene
        // this.scene = this.experience.ElektromagnetikScene
        // this.scene = this.experience.ImpedansiScene
        // this.scene = this.experience.DipolScene
        // this.scene = this.experience.MonopoleScene
        // this.scene = this.experience.LoopScene
        // this.scene = this.experience.ApertureScene
        // this.scene = this.experience.MikrostripScene
        // this.scene = this.experience.ArrayScene
        // this.scene = this.experience.ReflectorScene
        

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
        this.instance.setClearColor('#aec9ea')
        // this.instance.setClearColor('#211d20')
        // this.instance.setClearColor('#CBA380')
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
    }


    setSaluranScene(){
        this.scene = this.experience.SaluranScene
    }

    setElektromagnetikScene(){
        this.scene = this.experience.ElektromagnetikScene
    }

    setImpedansiScene(){
        this.scene = this.experience.ImpedansiScene
    }

    setDipolScene(){
        this.scene = this.experience.DipolScene
    }
    setMonopoleScene(){
        this.scene = this.experience.MonopoleScene
    }
    setLoopScene(){
        this.scene = this.experience.LoopScene
    }
    setApertureScene(){
        console.log('aperture')
        this.scene = this.experience.ApertureScene
    }
    setMikrostripScene(){
        this.scene = this.experience.MikrostripScene
    }
    setArrayScene(){
        this.scene = this.experience.ArrayScene
    }
    setReflectorScene(){
        this.scene = this.experience.ReflectorScene
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