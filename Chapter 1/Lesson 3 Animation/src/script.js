import * as THREE from 'three'
import gsap from 'gsap' // Libreria di animazioni da installare con il comando: npm install --save gsap@3.12 (3.12 è la versione piu recente)

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animazione
// Ogni computer può girare tot frame al secondo.
// Per uniformare la resa dell'animazione andiamo ad usare un trucco

// PRIMO METODO
// let time = Date.now();

// const rotateCube = () => {
//     // Gestione del tempo per ogni computer con frame per secondo diversi
//     const currentTime = Date.now();
//     const deltaTime = currentTime - time; // Qui calcolo la differenza tra il tempo in cui ho lanciato la funzione e il tempo iniziale
//     time = currentTime; // Risetto la variabile time con il tempo aggiornato del lancio della funzione per ripetere in loop questa dinamica

//     // Aggiornamento di movimento dell'oggetto
//     mesh.rotation.y += 0.001 * deltaTime; // Formula per determinare l'animazione dell'oggetto
//     mesh.rotation.x += 0.001 * deltaTime;

//     renderer.render(scene, camera);

//     window.requestAnimationFrame(rotateCube); // Questo chiama in loop la funzione di animazione
// };

// rotateCube();

// SECONDO METODO
// const clock = new THREE.Clock();

// const rotateCube = () => {

//     const elapsedTime = clock.getElapsedTime();
//     // Aggiornamento di movimento dell'oggetto
//     // mesh.rotation.y = elapsedTime; // Formula per determinare l'animazione dell'oggetto
//     // mesh.rotation.x = elapsedTime * Math.PI * 2; // Una giro completo per secondo
//     // L'unione di queste due fa si che l'oggetto ruoti nello spazio formando un movimento circolare
//     // mesh.position.y = Math.sin(elapsedTime); // Il seno di x in trigonometria rappresenta un grafico che va dall'alto verso il basso (una curva partendo da 0). In questo caso fa su e giu in loop
//     // mesh.position.x = Math.cos(elapsedTime); // Il coseno di x in trigonometria rappresenta un grafico che va dall'alto verso il basso (una curva partendo da 1). In questo caso fa destra e sinistra in loop

//     // Naturalmente possiamo far animare anche la camera essendo un oggetto
//     camera.position.y = Math.sin(elapsedTime);
//     camera.position.x = Math.cos(elapsedTime);
//     camera.lookAt(mesh.position); // Manterrà sempre il focus sull'oggetto passato

//     renderer.render(scene, camera);

//     window.requestAnimationFrame(rotateCube); // Questo chiama in loop la funzione di animazione
// };

// rotateCube();

// TERZO METODO
gsap.to(mesh.position, {duration: 1, delay: 1, x: 2})
gsap.to(mesh.position, {duration: 1, delay: 2, x: 0})

const rotateCube = () => {
    renderer.render(scene, camera);
    
    window.requestAnimationFrame(rotateCube);
};
    
rotateCube();
