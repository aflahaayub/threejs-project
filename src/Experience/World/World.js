import Experience from '../Experience.js'
import Lab from './Lab.js'
import gsap from 'gsap'
import LoadIntro from './LoadIntro.js'
import Ground from './Ground.js'
import Ionosphere from './Ionosphere.js'
import Los from './Los.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.loadIntro = this.experience.loadIntro

        console.log(this.loadIntro.overlayMaterial)

        // Load a resources
        this.sceneReady = false
        this.loadingBarElement = document.querySelector('.loading-bar')

        this.resources.manager.onLoad = ()=>{
            gsap.delayedCall(0.5, ()=>{
                gsap.to(this.loadIntro.overlayMaterial.uniforms.uAlpha, {duration: 5, value: 0})
                this.loadingBarElement.classList.add('ended')
                this.loadingBarElement.style.transform = ``
            })
 
            // console.log(this.)
            this.sceneReady = true

        }

        // Wait for resources
        this.resources.manager.onProgress = (itemUrl, itemsLoaded, itemsTotal)=>{
            this.progressRatio = itemsLoaded / itemsTotal

            this.loadingBarElement.style.transform = `scaleX(${this.progressRatio})`
           
            // console.log('loading file...')
        }

        // this.seaScene = false
        this.resources.on('ready', () =>
        {
            // Setup
            this.loadIntro = new LoadIntro()
            this.lab = new Lab()
            // this.los = new Los()
        })
        
    }

    update()
    {
        if(this.lab){
            this.lab.update()
        }
        
    }

}