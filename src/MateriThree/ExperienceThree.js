import * as THREE from 'three'

// import Debug from './Utils/Debug.js'
import * as dat from 'dat.gui'
import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import World from './World/World.js'
import Resources from './Utils/Resources.js'

import sources from './sources.js'
import audioSources from './audioSources.js'
import LoadIntro from './World/LoadIntro.js'


let instance = null

export default class Experience
{
    constructor(_canvas)
    {
        // Singleton
        if(instance)
        {
            return instance
        }
        instance = this
        
        // Global access
        window.experience = this

        // Options
        this.canvas = _canvas

        // Setup
        // this.debug = {}
        // this.active = window.location.hash === '#debug'

        // if(this.debug.active)
        // {
        //     this.ui = new dat.GUI()
        // }
        // this.ui = new dat.GUI()
        // this.debug = new Debug()
        // console.log(this.ui.add)
        this.sizes = new Sizes()
        this.time = new Time()

        // this.camera = new Camera()
        // this.renderer = new Renderer()

        //Scene
        this.loadIntro = new THREE.Scene()
        this.AntenaTransmisiScene = new THREE.Scene()
        this.SaluranScene = new THREE.Scene()
        this.ElektromagnetikScene = new THREE.Scene()
        this.ImpedansiScene = new THREE.Scene()
        this.DipolScene = new THREE.Scene()
        this.MonopoleScene = new THREE.Scene()
        this.LoopScene = new THREE.Scene()
        this.ApertureScene = new THREE.Scene()
        this.MikrostripScene = new THREE.Scene()
        this.ArrayScene = new THREE.Scene()
        this.ReflectorScene = new THREE.Scene()

        this.resources = new Resources(sources, audioSources)
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()

        // Resize event
        this.sizes.on('resize', () =>
        {
            this.resize()
        })

        // Time tick event
        this.time.on('tick', () =>
        {
            this.update()
        })
    }

    resize()
    {
        this.camera.resize()
        this.renderer.resize()
    }

    update()
    {
        this.camera.update()
        this.world.update()
        this.renderer.update()
    }

    destroy()
    {
        this.sizes.off('resize')
        this.time.off('tick')

        // Traverse the whole scene
        this.scene.traverse((child) =>
        {
            // Test if it's a mesh
            if(child instanceof THREE.Mesh)
            {
                child.geometry.dispose()

                // Loop through the material properties
                for(const key in child.material)
                {
                    const value = child.material[key]

                    // Test if there is a dispose function
                    if(value && typeof value.dispose === 'function')
                    {
                        value.dispose()
                    }
                }
            }
        })

        this.camera.controls.dispose()
        this.renderer.instance.dispose()

        if(this.debug.active)
            this.debug.ui.destroy()
    }
}