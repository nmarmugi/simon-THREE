import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js' // Questo helper va importato

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5) // Da un'illuminazione uniforme senza creare ombre
scene.add(ambientLight)

gui.add(ambientLight, 'intensity').name('Intensita\' Luce Ambiente').min(0).max(3).step(0.001);

const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.9); // Tipo luce solare
directionalLight.position.set(1, 0.25, 0);
scene.add(directionalLight)

gui.add(directionalLight, 'intensity').name('Intensita\' Luce Direzionata').min(0).max(3).step(0.001);
gui.add(directionalLight.position, 'x').name('Asse X Luce Direzionata').min(-1).max(1).step(0.001);
gui.add(directionalLight.position, 'y').name('Asse Y Luce Direzionata').min(-0.5).max(0.5).step(0.001);
gui.add(directionalLight.position, 'z').name('Asse Z Luce Direzionata').min(-1).max(1).step(0.001);

const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.9); // Luce che viene dal cielo e della terra
scene.add(hemisphereLight)

gui.add(hemisphereLight, 'intensity').name('Intensita\' Luce Emisferica').min(-1).max(1).step(0.001);

const pointLight = new THREE.PointLight(0xff9000, 1.5, 10, 2) // Punto luce che illumina in tutte le direzioni, si puo stabilire anche la distanza con il terzo valore
pointLight.position.set(1, -0.5, 1)
scene.add(pointLight)

const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 6, 1, 1); // E' tipo una luce da shooting fotografici, vuole una larghezza e un'altezza. FUnziona solo con MeshStandardMaterial e MeshPhysicalMaterial
rectAreaLight.position.set(-1.5, 0, 1.5)
rectAreaLight.lookAt(0, 0, 0) // Punta verso il centro
scene.add(rectAreaLight)

const spotLight = new THREE.SpotLight(0x78ff00, 4.5, 10, Math.PI * 0.1, 0.25, 1) // Simula la luce di una torcia
spotLight.position.set(0, 2, 3)
scene.add(spotLight)
spotLight.target.position.x = -0.75;
scene.add(spotLight.target)

// Helper Lights
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2); // Il secondo valore e' la dimensione dell'helper
scene.add(hemisphereLightHelper)

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2);
scene.add(directionalLightHelper)

const pointLightLightHelper = new THREE.PointLightHelper(pointLight, 0.2);
scene.add(pointLightLightHelper)

const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper)

const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight)
scene.add(rectAreaLightHelper)

/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.position.x = - 1.5

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
)
torus.position.x = 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

scene.add(sphere, cube, torus, plane)

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
camera.position.z = 2
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

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()