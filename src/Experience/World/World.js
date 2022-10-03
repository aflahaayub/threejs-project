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
        // this.loadIntro = this.experience.loadIntro
        this.loadIntro = new LoadIntro()

        // console.log(this.loadIntro)
        // Load a resources
        this.sceneReady = false
        this.loadingBarElement = document.querySelector('.loading-bar')

        this.resources.manager.onLoad = ()=>{
            // this.sceneReady = true
            gsap.delayedCall(0.5, ()=>{
                gsap.to(this.loadIntro.overlayMaterial.uniforms.uAlpha, {duration: 5, value: 0})
                this.loadingBarElement.classList.add('ended')
                this.loadingBarElement.style.transform = ``
            })
            this.sceneReady = true
            this.lab = new Lab()
        }

        // Wait for resources
        this.resources.manager.onProgress = (itemUrl, itemsLoaded, itemsTotal)=>{
            this.progressRatio = itemsLoaded / itemsTotal
            // this.progressRatio = this.resources.loaded/this.resources.toLoad
            // console.log(this.progressRatio)
            // console.log(itemsLoaded, itemsTotal)
            this.loadingBarElement.style.transform = `scaleX(${this.progressRatio})`
        }

        this.resources.on('ready', () =>
        {
            console.log(this.progressRatio)
            // Setup
            // this.loadIntro = new LoadIntro()
            // this.lab = new Lab()
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