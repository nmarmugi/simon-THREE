import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
// Creo un gruppo di oggetti
const group = new THREE.Group();
group.position.set(0, 1, 0);
group.scale.set(1, 2, 1);
group.rotation.set(0, 1, 0);

scene.add(group);

// Creo dei cubi
const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({color: 'red'})
);

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({color: 'blue'})
);
cube2.position.set(2, 0, 0);

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({color: 'yellow'})
);
cube3.position.set(-2, 0, 0);

group.add(cube1, cube2, cube3);
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// const mesh = new THREE.Mesh(geometry, material)

// Posizionamento
// Oltre a conferire posizione alla camara posso dare posizione anche alla mesh
// mesh.position.x = 0.7; // Muovo la mesh verso destra se ha valore positivo
// mesh.position.y = - 0.6; // Muovo la mesh verso il basso se ha valore negativo
// mesh.position.z = 1; // Muovo la mesh verso la camera se ha valore positivo
// Possiamo anche scrivere mesh.position.set(0.7, - 0.6, 1)
// mesh.position.normalize() Setta l'oggetto in posizione (1, 1, 1) nello spazio 3D
// mesh.position.length() Restituisce la distanza dell'oggetto dall'origine del sistema di coordinate (il punto (0, 0, 0) nello spazio 3D)
// mesh.position.distanceTo(camera) Restituisce la distanza tra un oggetto e l'altro

// Scala
// mesh.scale.set(2, 0.5, 0.5);

// // Rotazione
// mesh.rotation.reorder('YXZ'); // Riordina la sequenza di rotazione in questo caso parte da Y passa a X e poi a Z
// mesh.rotation.set(Math.PI / 2, Math.PI / 2, 0); // Math.PI mi permette di fare una rotazione sull'asse scelto di 180 gradi se volessi farlo di 90 mi basta dividere per 2

// scene.add(mesh)

// Assi d'aiuto
const axesHelper = new THREE.AxesHelper(); // Il numero che gli passiamo definisce la lunghezza degli assi
scene.add(axesHelper)

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.set(0, 0, 3);
// camera.lookAt(mesh.position) Per fissare la camera sull'oggetto che vogliamo
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera) // Questo è come se scattasse una foto del scena attuale in ordine di codice scritto, appena arriva qua scatta una foto della scena