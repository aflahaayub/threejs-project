import * as THREE from 'three'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import EventEmitter from './EventEmitter.js'
import Experience from '../ExperienceTwo.js'

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

        // this.setAudioLoad()
        this.setLoaders()
        this.startLoading()
    }

    setLoaders()
    {

        this.loaders = {}
        this.manager = new THREE.LoadingManager()
        this.loaders.audioLoader= new THREE.AudioLoader(this.manager)

        // this.audioListener = new THREE.AudioListener()
        // this.audio = new THREE.Audio(this.audioListener)

        this.loaders.gltfLoader = new GLTFLoader(this.manager)

        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath( '/draco/' )
        // this.loaders.audioLoader = new THREE.AudioLoader(this.manager)
        this.loaders.gltfLoader.setDRACOLoader(dracoLoader)
        this.loaders.textureLoader = new THREE.TextureLoader(this.manager)
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader(this.manager)

    }

    startLoading()
    {
        // for(const audioSource of this.audioSources){
        //     this.myAudioSrc = []
        //     this.loaders.audioLoader.load(
        //         audioSource.path,
        //         (audioFile)=>{
        //             this.sourceLoaded(audioSource, audioFile)
        //             this.myAudioSrc.push(audioSource)
        //         }
        //     )
        // }
        // this.myRadioSrc = []
        // for(const radioSource of this.radioSources){
        //     if(radioSource.name === "audio1"){
        //         this.myRadioSrc[0] = radioSource
        //     }
        //     else if(radioSource.name === "audioRadio2"){
        //         this.myRadioSrc[1] = radioSource
        //     }
        //     else{
        //         this.myRadioSrc[2] = radioSource
        //     }

        //     console.log(this.myRadioSrc)
        //     if(this.myRadioSrc.length === 3){
        //         this.loaders.audioLoader.load(
        //         radioSource.path,
        //         (radioFile)=>{
        //             this.sourceLoaded(radioSource, radioFile)
        //         }
        //     )
        //     }
            
        // }
        // Load each source
        for(const source of this.sources)
        {
            // this.audioFileLoading = true
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
            
            this.trigger('progress')
            
        }
    }
    sourceLoaded(source, file)
    {
        this.items[source.name] = file
        this.loaded++
        // console.log(this.loaded)
        
        if(this.loaded === this.toLoad)
        {
            this.trigger('ready')
        }
    }
    
}