import * as THREE from 'three';

// Seleziono il canvas nell'HTML
const canvas = document.querySelector('canvas.webgl');

// Creo una scena
const scene = new THREE.Scene();

// Creo una geometria o l'oggetto
const geometry = new THREE.BoxGeometry(1, 1, 1); // I valori passati sono i tre assi, larghezza, altezza e profondità
const material = new THREE.MeshBasicMaterial({color: 0xff0000}); // In questo caso passo il colore rosso al materiale, per vedere la geometria
																 // potrei aggiungere la chiave "wireframe": true
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh); // Aggiungo la mesh alla scena

// Dimensioni per la camera
const size = {
	width: 800,
	height: 600
};

// Creo una camera con prospettiva
const camera = new THREE.PerspectiveCamera( 75, size.width / size.height ); // Il primo valore è relativo al campo visivo verticale (zoom).
																			//  Il secondo valore è il risultato della larghezza fratto l'altezza.
camera.position.z = 3; // Decido la posizione della camera muovendola sull'asse delle z (la profonfità). Posso muoverla anche sull'asse delle x o y
scene.add( camera ); // Aggiungo la camera alla scena

// Renderer
const renderer = new THREE.WebGLRenderer({
	canvas: canvas
});
renderer.setSize(size.width, size.height); // Setto le dimensioni del canvas
renderer.render(scene, camera); // Passo al render la scena e la camera
