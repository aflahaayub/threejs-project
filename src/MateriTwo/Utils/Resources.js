import * as THREE from 'three'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import EventEmitter from './EventEmitter.js'
import gsap from 'gsap'
import LoadIntro from '../World/LoadIntro.js'
import Experience from '../Experience.js'

export default class Resources extends EventEmitter
{
    constructor(sources)
    {
        super()
        this.experience = new Experience()
        this.loadIntro = this.experience.loadIntro

        this.sources = sources

        this.items = {}
        this.toLoad = this.sources.length
        this.loaded = 0

        this.loadingBarElement = document.querySelector('.loading-bar')

        this.setLoaders()
        this.startLoading()
    }

    setLoaders()
    {

        this.loaders = {}
        this.manager = new THREE.LoadingManager()

        this.loaders.gltfLoader = new GLTFLoader(this.manager)

        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath( '/draco/' )
        this.loaders.gltfLoader.setDRACOLoader(dracoLoader)


        this.loaders.textureLoader = new THREE.TextureLoader(this.manager)

        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader(this.manager)
    }

    startLoading()
    {
        // Load each source
        for(const source of this.sources)
        {
            this.trigger('progress')
       

            if(source.type === 'gltfModel')
            {
                this.loaders.gltfLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if(source.type === 'texture')
            {
                this.loaders.textureLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if(source.type === 'cubeTexture')
            {
                this.loaders.cubeTextureLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
        }
    }
    sourceLoaded(source, file)
    {
        this.items[source.name] = file

        this.loaded++

        if(this.loaded === this.toLoad)
        {
            this.trigger('ready')
        }
    }
    
}