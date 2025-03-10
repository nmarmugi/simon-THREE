import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
// const geometry = new THREE.BoxGeometry(1, 1, 1, 4, 4, 4) // Aggiungo triangoli per comporre il cubo questo mi permette di modellare il cubo in maniera piu dettagliata, più trinagoli avremo e maggiore sarà il dettaglio
// Prima soluzione, nell'array appena creato passo in questa maniera i valori dei vertici
// const positionsArray = new Float32Array([
//     0, 0, 0, // x, y, z del primo vertice
//     0, 1, 0,
//     1, 0, 0
// ]);
// Seconda soluzione
// const positionsArray = new Float32Array(9); // 9 stà per la lunghezza dell'array
// // Creo il primo vertice
// positionsArray[0] = 0; // valore della x
// positionsArray[1] = 0; // valore della y
// positionsArray[2] = 0; // valore della z

// // Secondo vertice
// positionsArray[3] = 0;
// positionsArray[4] = 1;
// positionsArray[5] = 0;

// // Terzo vertice
// positionsArray[6] = 1;
// positionsArray[7] = 0;
// positionsArray[8] = 0;

// Coverto in maniera che THREEJS possa leggere
// const positionsAttributes = new THREE.BufferAttribute(positionsArray, 3); // indica quanti valori consecutivi appartengono a un singolo vertice. In questo caso, i valori sono gruppi di tre numeri, corrispondenti alle coordinate X, Y, Z nello spazio tridimensionale
// const geometry = new THREE.BufferGeometry();
// geometry.setAttribute('position', positionsAttributes);

const geometry = new THREE.BufferGeometry();

const count = 500000;
const positionsArray = new Float32Array(count * 3 * 3); // 3 vertici e per ogni vertice 3 valori, x, y, z

for(let i = 0; i < count * 3 * 3; i++) {
    positionsArray[i] = (Math.random() - 0.5) * 4;
}

const positionsAttributes = new THREE.BufferAttribute(positionsArray, 3);
geometry.setAttribute('position', positionsAttributes);

const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
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

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
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