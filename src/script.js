import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as dat from 'lil-gui'
import gsap from 'gsap'

import Experience from './Experience/Experience.js'

//HOME PAGE

/**
 * Debug
 */
// const gui = new dat.GUI()

const parameters = {
    materialColor: '#ffeded'
}

// gui
//     .addColor(parameters, 'materialColor')
//     .onChange(() =>
//     {
//         material.color.set(parameters.materialColor)
//         particlesMaterial.color.set(parameters.materialColor)
//     })

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
            }, 600)
            
            
        }, 500)
        // document.querySelector('.container-title').classList.add('visible')
    },

    // Progress
    (itemUrl, itemsLoaded, itemsTotal) =>
    {
        // Calculate the progress and update the loadingBarElement
        const progressRatio = itemsLoaded / itemsTotal
        console.log(progressRatio)
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
    // wireframe: true,
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



/**
 * Objects
 */
// Texture
const textureLoader = new THREE.TextureLoader()
const materiTexture = textureLoader.load('textures/Home/materi.jpg')
materiTexture.flipY = false
materiTexture.encoding = THREE.sRGBEncoding

const petunjukTexture = textureLoader.load('textures/Home/petunjuk.jpg')
petunjukTexture.flipY = false
petunjukTexture.encoding = THREE.sRGBEncoding

const evalTexture = textureLoader.load('textures/Home/evalTexture.jpg') //bake ulang
evalTexture.flipY = false
evalTexture.encoding = THREE.sRGBEncoding

const userTexture = textureLoader.load('textures/Home/user.jpg')
userTexture.flipY = false
userTexture.encoding = THREE.sRGBEncoding

// Material
const materiMaterial = new THREE.MeshBasicMaterial({
    map: materiTexture
})

const petunjukMaterial = new THREE.MeshBasicMaterial({
    map: petunjukTexture
})

const evalMaterial = new THREE.MeshBasicMaterial({
    map: evalTexture
})
const userMaterial = new THREE.MeshBasicMaterial({
    map: userTexture
})

//Models
const models = ['petunjuk', 'tujuanPembelajaran', 'materi', 'evaluasi', 'user']

gltfLoader.load(
    '/models/Home/petunjuk.glb',
    (gltf)=>{
        console.log(gltf)
        gltf.scene.traverse((child)=>{
            console.log(child)
            child.material = petunjukMaterial
            if(child.name === "Plane"){
                console.log(child)
                child.scale.z = 1.5
            }
        })
        gltf.scene.scale.set(1, 1, 1)
        gltf.scene.position.set(0, -1.8, 0)
        gltf.scene.rotation.y = -Math.PI * 0.5
        gltf.scene.traverse((child)=>{
            if(child.name === "question"){
               const tl = new TimelineMax({repeat: -1, yoyo: true})
               tl.fromTo(child.position, {y: 1.2}, {ease: Power1.easeInOut, duration: 5, y: 1})
           }
       })

       document.querySelector('.btn-kanan').onclick =()=>{
           gsap.to(camera.position, {duration: 3, x: 12.2, y: 0, z: 3})
           gsap.to(controls.target, {duration: 3, x: 12.2, y: 0, z: 3})
       }

        scene.add(gltf.scene)
    }
)

gltfLoader.load(
    '/models/Home/materi.gltf',
    (gltf)=>{
        console.log(gltf)
        gltf.scene.traverse((child)=>{
            console.log(child)
            child.material = materiMaterial
        })
        gltf.scene.scale.set(1, 1, 1)
        gltf.scene.position.set(12, -1.3, 0)
        gltf.scene.rotation.y = Math.PI * 0.5
        scene.add(gltf.scene)
    }
)

// gltfLoader.load(
//     '/models/Home/evaluasi.gltf',
//     (gltf)=>{
//         console.log(gltf)
//         gltf.scene.traverse((child)=>{
//             console.log(child)
//             child.material = evalMaterial
//             if(child.name === "bg"){
//                 child.scale.z = 1.5
//             }
//         })
//         gltf.scene.scale.set(1, 1, 1)
//         gltf.scene.position.set(12, -1.8, 0)
//         gltf.scene.rotation.y = -Math.PI * 0.5

//         gltf.scene.traverse((child)=>{
//             if(child.name === "user"){
//                const tl = new TimelineMax({repeat: -1, yoyo: true})
//                tl.fromTo(child.position, {y: 1.3}, {ease: Power1.easeInOut, duration: 5, y: 1})
//            }
//        })



//         // scene.add(gltf.scene)
//     }
// )

// const userModel = gltfLoader.load(
//     '/models/Home/user.gltf',
//     (gltf)=>{
        
//         // const targetPositionY = 0.5

//         gltf.scene.traverse((child)=>{
//             child.material = userMaterial
//             if(child.name === "bg"){
//                 console.log(child)
//                 child.scale.z = 1.5
//             }
//         })

        
//         gltf.scene.scale.set(1, 1, 1)
//         // gltf.scene.position.set(12, -1.8, 0)
//         // gltf.scene.position.set(0, -1.5, 0)
//         gltf.scene.rotation.y = -Math.PI * 0.5

        
//         gltf.scene.traverse((child)=>{
//              if(child.name === "user"){
//                 const tl = new TimelineMax({repeat: -1, yoyo: true})
//                 tl.fromTo(child.position, {y: 1.3}, {ease: Power1.easeInOut, duration: 5, y: 1})
//             }
//         })

//         document.querySelector('.btn-kiri').onclick =()=>{
//             gsap.to(camera.position, {duration: 3, x: 0, y: 0, z: 3})
//            gsap.to(controls.target, {duration: 3, x: 0, y: 0, z: 3})
//         }

//         // scene.add(gltf.scene)
//     }
// )




//axes helper
// const axesHelper = new THREE.AxesHelper(10)
// scene.add(axesHelper)

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

// Base camera
// const camera = new THREE.OrthographicCamera( sizes.width / - 2, sizes.width / 2, sizes.height / 2, sizes.height / - 2, 0.1, 100 );
// scene.add( camera );

const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0,0,3)
// camera.translateX = 12
// camera.position.x = 12
// camera.position.z = 12
cameraGroup.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(0x4F5D68)


/**
 * Cursor
 */
const cursor = {}
cursor.x = 0
cursor.y = 0

// window.addEventListener('mousemove', (event) =>
// {
//     cursor.x = event.clientX / sizes.width - 0.5
//     cursor.y = event.clientY / sizes.height - 0.5
// })

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

    // Animate camera
    // camera.position.y = - scrollY / sizes.height * objectsDistance

    // const parallaxX = cursor.x * 0.5
    // const parallaxY = - cursor.y * 0.5
    // cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 5 * deltaTime
    // cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 5 * deltaTime

    // // Animate meshes
    // for(const mesh of sectionMeshes)
    // {
    //     mesh.rotation.x += deltaTime * 0.1
    //     mesh.rotation.y += deltaTime * 0.12
    // }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
