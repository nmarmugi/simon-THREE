import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import GUI from 'lil-gui' // Libreria installata npm installi lil-gui per il debug della UI

/**
 * Debug UI
 */

const gui = new GUI({
    width: 500,
    title: 'Debug UI',
    closeFolders: false
});
// gui.close();
// Per nascondere il debugger e mostrarlo premendo 'h' sulla tastiera
gui.hide();

window.addEventListener('keydown', (e) => {
    if (e.key == 'h') {
        gui.show(gui._hidden)
    }
})

// Secondo metodo per il fix del colore
const debugObject = {};

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
debugObject.color = '#ff5800';

const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
const material = new THREE.MeshBasicMaterial({ color: debugObject.color, wireframe: true })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Per aggiungere al debugger un'altra sezione
const newFolder = gui.addFolder('Altra sezione');
// newFolder.close(); // Valore di default

debugObject.spin = () => {
    gsap.to(mesh.rotation, {y: mesh.rotation.y + Math.PI * 2})
}
newFolder.add(debugObject, 'spin').name('Ruota');

// Range
// gui.add(mesh.position, 'y', -3, 3, 0.01); // Accetta un oggetto e la sua proprietà. Accetta anche il valore minimo, massimo e la precisione
// Si può anche scrivere
newFolder.add(mesh.position, 'y').min(-3).max(3).step(0.01).name('Movimento verticale');

// Checkbox
newFolder.add(mesh, 'visible').name('Non mostrare oggetto'); // Accetta l'oggeto di riferimento
newFolder.add(material, 'wireframe').name('Non mostrare wireframe'); // Accetta il materiale

// Colore
// Primo metodo per il fix del colore
// gui.addColor(material, 'color').name('Colore')
    // .onChange((value) => {
    //     console.log(value.getHexString()) // THREEJS legge i colori in un'altra maniera questa può essere un asoluzione di fix
    // }) // Per un picker del colore che cambierà il colore del materiale passato

newFolder.addColor(debugObject, 'color').name('Colore')
    .onChange(() => {
    material.color.set(debugObject.color)
})

// Aggiunta segmenti
debugObject.subdivision = 2;
newFolder.add(debugObject, 'subdivision').min(1).max(20).step(1).onFinishChange(() => {
    mesh.geometry.dispose(); // Rilascia la vecchia memoria GPU
    // Sostituiamo la vecchia geometria con la nuova
    mesh.geometry = new THREE.BoxGeometry(
        1, 1, 1,
        debugObject.subdivision, debugObject.subdivision, debugObject.subdivision
    )
}).name('Suddivisione');

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

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()