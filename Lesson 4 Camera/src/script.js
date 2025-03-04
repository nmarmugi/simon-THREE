import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js' // Camera orbitale

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: 800,
    height: 600
}

/**
 * Cursore per muovere telecamera
 */
const cursor = {
    x: 0,
    y: 0
}
window.addEventListener('mousemove', (e) => {
    cursor.x = e.clientX / sizes.width - 0.5; // Valore in pixel che parte da 0 e aumenta da sinistra a destra.
                                              // Viene diviso per la view port in larghezza affinchè non prenda tutta la larghezza della pagina ma le dimensioni del canvas.
                                              // Viene sottratto 0.5 in maniera che al centro del canvas la value in pixel sarà 0. Andando verso sinistra sarà negativa e verso destra positiva per un massimo e un minimo di 0.5 e -0.5.
    cursor.y = - (e.clientY / sizes.height - 0.5);
})

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

// Camera
// Camera Prospettiva
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100) // near: la distanza minima dalla camera a cui gli oggetti vengono renderizzati. Qualsiasi oggetto più vicino di questa distanza non verrà visualizzato.
                                                                                   // far: la distanza massima dalla camera a cui gli oggetti vengono renderizzati. Oggetti più lontani di questa distanza non saranno visibili.
// Camera ortogonale
// const aspectRadio = sizes.width / sizes.height; // L'aspect ratio garantisce che la scena 3D: Non appaia distorta quando viene renderizzata sullo schermo. Mantenga le proporzioni corrette degli oggetti, indipendentemente dalla dimensione della finestra o del dispositivo
// const camera = new THREE.OrthographicCamera(
//     -1 * aspectRadio, // sinistra
//     1 * aspectRadio, // destra
//     1, // sopra
//     -1, // sotto
//     0.1,
//     100
// ); // Gli oggetti mantengono le loro dimensioni indipendentemente dalla distanza dalla telecamera (Si usa nelle interfacce 2D)

// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)

// ORBIT CONTROLS
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true; // Per un effetto smooth di movimento

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // mesh.rotation.y = elapsedTime;

    // Caso di rotazione di camera con il mouse
    // camera.position.x = cursor.x * 10;
    // camera.position.y = cursor.y * 10;
    // camera.lookAt(mesh.position); // Per muovere la camera con il mouse nello spazio fissando l'oggetto

    // Caso di rotazione della camera intorno all'oggetto
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
    // camera.position.y = cursor.y * 5;
    // camera.lookAt(mesh.position);

    // SMOOTH ORBIT CONTROLS
    controls.update();

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()