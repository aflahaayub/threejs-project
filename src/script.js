import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import gsap from 'gsap'
import Stats from 'three/examples/jsm/libs/stats.module'
import { Group, MeshBasicMaterial } from 'three'

//HOME PAGE
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// // LOADER
const loadingBarElement = document.querySelector('.loading-bar')
const titleElement = document.querySelector('.container')
const loadingManager = new THREE.LoadingManager(
    // Loaded
    () =>
    {
        // Wait a little
        window.setTimeout(() =>
        {
            // Animate overlay
            gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 3, value: 0, delay: 1 })

            // Update loadingBarElement
            loadingBarElement.classList.add('ended')
            titleElement.classList.add('ended')
            loadingBarElement.style.transform = ''

            
            window.setTimeout(()=>{
                document.querySelector('.container-title').classList.add('visible')
            }, 1000)
        }, 500)
    },

    // Progress
    (itemUrl, itemsLoaded, itemsTotal) =>
    {
        // Calculate the progress and update the loadingBarElement
        // modelTextures()
        const progressRatio = itemsLoaded / itemsTotal
        console.log(itemsLoaded)
        loadingBarElement.style.transform = `scaleX(${progressRatio})`
    }
)

const gltfLoader = new GLTFLoader(loadingManager)

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath( '/draco/' )
gltfLoader.setDRACOLoader(dracoLoader)


//OVERLAY
const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)
const overlayMaterial = new THREE.ShaderMaterial({
    transparent: true,
    uniforms:
    {
        uAlpha: { value: 1 }
    },
    vertexShader: `
        void main()
        {
            gl_Position = vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform float uAlpha;

        void main()
        {
            gl_FragColor = vec4(0.0, 0.0, 0.1, uAlpha);
        }
    `
})
const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)
scene.add(overlay)


//Models
const titleModels = ['Petunjuk', 'Capaian Pembelajaran', 'History','Materi', 'Evaluasi'];
let i = 0;
let title = document.getElementsByClassName('context-title');

let positionX = 0
if(positionX === 0){
    document.querySelector('.btn-kanan').classList.add('visible')
}

document.querySelector('.btn-kiri').onclick =()=>{
    positionX-=12
    i--
    console.log(positionX + ' back')
    title[0].innerHTML = `${titleModels[i]}`
    gsap.to(camera.position, {duration: 3, x: positionX, y: 0, z: 3})
    gsap.to(controls.target, {duration: 3, x: positionX, y: 0, z: 3})

    if(positionX === 0){
        document.querySelector('.btn-kiri').classList.remove('visible')

        i = 0
        console.log(positionX + ' mentok kiri')
    }
}

document.querySelector('.btn-kanan').onclick =()=>{
    positionX+=12
    i++
    console.log(positionX + ' continu')
    title[0].innerHTML = `${titleModels[i]}`

    gsap.to(camera.position, {duration: 3, x: positionX, y: 0, z: 3})
    gsap.to(controls.target, {duration: 3, x: positionX, y: 0, z: 3})

    document.querySelector('.btn-kiri').classList.add('visible')
    if(positionX === 48){
        document.querySelector('.btn-kanan').classList.remove('visible')

        i = 48
        console.log(positionX + ' mentok kanan')
    }
}
console.log(positionX)

/**
 * Objects
 */
// Texture
const textureLoader = new THREE.TextureLoader(loadingManager)
const petunjukTexture = textureLoader.load('textures/Home/petunjuk2.jpg')
petunjukTexture.flipY = false
petunjukTexture.encoding = THREE.sRGBEncoding
const petunjuk = new THREE.MeshBasicMaterial({map: petunjukTexture})

const capaianTexture = textureLoader.load('textures/Home/capaian.jpg')
capaianTexture.flipY = false
capaianTexture.encoding = THREE.sRGBEncoding
const capaian = new THREE.MeshBasicMaterial({map: capaianTexture})

const historyTexture = textureLoader.load('textures/Home/user.jpg')
historyTexture.flipY = false
historyTexture.encoding = THREE.sRGBEncoding
const history = new THREE.MeshBasicMaterial({map: historyTexture})

const materiTexture = textureLoader.load('textures/Home/materi.jpg')
materiTexture.flipY = false
materiTexture.encoding = THREE.sRGBEncoding
const materi = new THREE.MeshBasicMaterial({map: materiTexture})

const evaluasiTexture = textureLoader.load('textures/Home/evaluasi.jpg')
evaluasiTexture.flipY = false
evaluasiTexture.encoding = THREE.sRGBEncoding
const evaluasi = new THREE.MeshBasicMaterial({map: evaluasiTexture})


const models = {
    petunjuk: '/models/Home/glTF/petunjuk.gltf',
    capaian: '/models/Home/glTF/capaian.gltf',
    user: '/models/Home/glTF/user.gltf',
    materi: '/models/Home/glTF/materi.glb',
    evaluasi: '/models/Home/glTF/evaluasi.gltf'

}

function loadModel(url){
    return new Promise(resolve=>{
        gltfLoader.load(url,resolve)
    })
}

const ifModel = (child)=>{
    if(child.name === "bg"){
        child.scale.z = 1.5
    }
    if(child.name === "object"){
        const tl = new TimelineMax({repeat: -1, yoyo: true})
        tl.fromTo(child.position, {y: 1.2}, {ease: Power1.easeInOut, duration: 5, y: 1})
    }
}


let petunjukModel, capaianModel, userModel, materiModel, evaluasiModel;
let group = new THREE.Group()

let p1 = loadModel(models.petunjuk).then(result=> {
    petunjukModel = result.scene
    petunjukModel.traverse((child)=>{
        child.material = petunjuk
        ifModel(child)
    })
    petunjukModel.position.set(0, -1.8, 0)
    petunjukModel.rotation.y = -Math.PI * 0.5

    // return petunjukModel
    group.add(petunjukModel)
})
let p2 = loadModel(models.capaian).then(result=> { 
    capaianModel =  result.scene
    capaianModel.traverse((child)=>{
        child.material = capaian
        ifModel(child)
        if(child.name === "object"){
            const tl = new TimelineMax({repeat: -1, yoyo: true})
        tl.fromTo(child.position, {y: 2}, {ease: Power1.easeInOut, duration: 5, y: 1.7})
        }
    })
    capaianModel.position.set(12, -1.8, 0)
    capaianModel.rotation.y = -Math.PI * 0.5
    // return capaianModel
    group.add(capaianModel)
})
let p3 = loadModel(models.user).then(result=> { 
    userModel =  result.scene
    userModel.traverse((child)=>{
        child.material = history
        ifModel(child)
        if(child.name === "object"){
            const tl = new TimelineMax({repeat: -1, yoyo: true})
        tl.fromTo(child.position, {y: 1.7}, {ease: Power1.easeInOut, duration: 5, y: 1.4})
        }
    })
    userModel.position.set(24, -1.8, 0)
    userModel.rotation.y = -Math.PI * 0.5
    // return userModel
    group.add(userModel)
})
let p4 = loadModel(models.materi).then(result=> { 
    materiModel =  result.scene
    materiModel.traverse((child)=>{
        child.material = materi
        ifModel(child)
        if(child.name === "object"){
            const tl = new TimelineMax({repeat: -1, yoyo: true})
        tl.fromTo(child.position, {y: 1.7}, {ease: Power1.easeInOut, duration: 5, y: 1.5})
        }
        child.scale.z =1.23
    })
    materiModel.rotation. y = -Math.PI * 0.5
    materiModel.position.set(36, -1.8, 0)
    // return materiModel
    group.add(materiModel)
})
let p5 = loadModel(models.evaluasi).then(result=> { 
    evaluasiModel =  result.scene
    evaluasiModel.traverse((child)=>{
        child.material = evaluasi
        ifModel(child)
        if(child.name === "object"){
            const tl = new TimelineMax({repeat: -1, yoyo: true})
        tl.fromTo(child.position, {y: 2.5}, {ease: Power1.easeInOut, duration: 5, y: 2.2})
        }
    })
    evaluasiModel.position.set(48, -1.8, 0)
    evaluasiModel.rotation.y = -Math.PI * 0.5
    // return evaluasiModel
    group.add(evaluasiModel)
})

Promise.all([p1,p2,p3,p4,p5]).then(()=>{
    scene.add(group)
    // scene.add(evaluasiModel)
    // scene.add(materiModel)
    // scene.add(userModel)
    // scene.add(capaianModel)
    // scene.add(petunjukModel)
})

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Group
const cameraGroup = new THREE.Group()
scene.add(cameraGroup)

const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0,0,3)

cameraGroup.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// renderer.setClearColor(0x4F5D68)
renderer.outputEncoding = THREE.sRGBEncoding

/**
 * Stats
 */
const stats = Stats()
document.body.appendChild(stats.dom)

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    //stats
    stats.update()

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
