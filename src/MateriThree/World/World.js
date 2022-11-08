import Experience from '../ExperienceThree.js'
import gsap from 'gsap'
import LoadIntro from './LoadIntro.js'
import AntenaTransmisi from './AntenaTransmisi.js'
import Saluran from './SalTrans.js'
import Elektromagnetik from './Elektromagnetik.js'
import Impedansi from './Impedansi.js'
import Dipol from './AnDipol.js'
import Monopol from './Monopole.js'
import Loop from './Loop.js'
import Aperture from './Aperture.js'
import Mikrostrip from './Mikrostrip.js'
import Array from './AnArray.js'
import Reflector from './Reflector.js'


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
            // this.reflector = new Reflector()
            // this.array = new Array()
            // this.mikro = new Mikrostrip()
            // this.horn = new Aperture()
            // this.loop = new Loop()
            // this.monopole = new Monopol()
            // this.Dipol = new Dipol()
            // this.Impedansi = new Impedansi()
            // this.elektromagneitik = new Elektromagnetik()
            // this.saluran = new Saluran()
            this.antenaTransmisi = new AntenaTransmisi()
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
        if(this.radio){
            // console.log(this.radio)
            // this.radio = new Radio()
        }
        
    }

}