import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import imageSourceColor from '../static/textures/door/color.jpg'
import imageSourceAlpha from '../static/textures/door/alpha.jpg'
import imageSourceHeight from '../static/textures/door/height.jpg'
import imageSourceNormal from '../static/textures/door/normal.jpg'
import imageSourceAmbientOcclusion from '../static/textures/door/ambientOcclusion.jpg'
import imageSourceMetalness from '../static/textures/door/metalness.jpg'
import imageSourceRoughness from '../static/textures/door/roughness.jpg'
import imageSourceMinFilter from '../static/textures/checkerboard-1024x1024.png'
import imageSourceMagFilter8x8 from '../static/textures/checkerboard-8x8.png'
import imageSourceMagFilterMinecraft from '../static/textures/minecraft.png'

// DOVE TROVARE LE TEXTURE NEL WEB
// poligon.com
// 3dtextures.me
// arroway-textures.ch

// PER CREARE LE PROPRIE TEXTURE
// substance3d.com

// TinyPNG per comprimere le immagini! (Sul web)

/**
 * Textures
 */
// Creo la texture utilizzando un'immagine
// PRIMO METODO
// const image = new Image();
// const texture = new THREE.Texture(image);
// texture.colorSpace = THREE.SRGBColorSpace;

// image.onload = () => {
//     texture.needsUpdate = true;
// }

// image.src = imageSourceColor;

// Il THREE.LoadingManager in Three.js serve per monitorare e gestire il caricamento di risorse come texture, modelli 3D, file JSON, ecc.

// 📌 A cosa serve?
// Sincronizza il caricamento di più file (es. texture, modelli, suoni).
// Fornisce callback per monitorare lo stato di avanzamento.
// Evita problemi di rendering caricando tutto prima di avviare la scena.

const loadingManager = new THREE.LoadingManager();
// onStart → Viene chiamata quando inizia il primo caricamento.
// onLoad → Viene chiamata quando tutte le texture sono caricate.
// onProgress → Mostra lo stato di avanzamento del caricamento.
// onError → Segnala eventuali errori nel caricamento.
loadingManager.onStart = () => {

}

loadingManager.onLoad = () => {
    
}

loadingManager.onProgress = () => {
    
}

loadingManager.onError = () => {
    
}

// SECONDO METODO
const textureLoader = new THREE.TextureLoader(loadingManager);
const colorTexture = textureLoader.load(imageSourceColor);
colorTexture.colorSpace = THREE.SRGBColorSpace;
const alphaTexture = textureLoader.load(imageSourceAlpha);
alphaTexture.colorSpace = THREE.SRGBColorSpace;
const heightTexture = textureLoader.load(imageSourceHeight);
heightTexture.colorSpace = THREE.SRGBColorSpace;
const normalTexture = textureLoader.load(imageSourceNormal);
normalTexture.colorSpace = THREE.SRGBColorSpace;
const ambientOcclusionTexture = textureLoader.load(imageSourceAmbientOcclusion);
ambientOcclusionTexture.colorSpace = THREE.SRGBColorSpace;
const metalnessTexture = textureLoader.load(imageSourceMetalness);
metalnessTexture.colorSpace = THREE.SRGBColorSpace;
const roughnessTexture = textureLoader.load(imageSourceRoughness);
roughnessTexture.colorSpace = THREE.SRGBColorSpace;

// minFIlter
const minFilterTexture = textureLoader.load(imageSourceMinFilter);
minFilterTexture.colorSpace = THREE.SRGBColorSpace;

// magFilter
const magFilterTexture8x8 = textureLoader.load(imageSourceMagFilter8x8);
magFilterTexture8x8.colorSpace = THREE.SRGBColorSpace;
const magFilterTextureMinecraft = textureLoader.load(imageSourceMagFilterMinecraft);
magFilterTextureMinecraft.colorSpace = THREE.SRGBColorSpace;

// Effetti sulla texture di trasformazione
// colorTexture.repeat.x = 2;
// colorTexture.repeat.y = 3;
// colorTexture.wrapS = THREE.RepeatWrapping; // o MirroredRepeatWrapping
// colorTexture.wrapT = THREE.RepeatWrapping;

// colorTexture.offset.x = 0.5;
// colorTexture.offset.y = 0.5;

// colorTexture.rotation = Math.PI * 0.25;
// colorTexture.center.x = 0.5;
// colorTexture.center.y = 0.5;

// minFIlter
// colorTexture.generateMipmappins = false
// minFilterTexture.generateMipmappins = false
// colorTexture.minFilter = THREE.NearestFilter
// minFilterTexture.minFilter = THREE.NearestFilter

// magFilter
// Si usa per le texture piu piccole per non perdere qualità
magFilterTexture8x8.magFilter = THREE.NearestFilter
magFilterTextureMinecraft.magFilter = THREE.NearestFilter

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
console.log(geometry.attributes.uv) // Qui c'è tutto quello che riguarda i vettori
const material = new THREE.MeshBasicMaterial({ map: magFilterTextureMinecraft }) // Per applicare la texture
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

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
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 1
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()