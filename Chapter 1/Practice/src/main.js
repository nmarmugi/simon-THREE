import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'; // Importo gli orbit controls
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

// Vado a selezionare il canvas dove il tutto verra' renderizzato
const canvas = document.querySelector('.canvas');

// Una scena ha bisogno di una camera e un oggetto
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.z = 20; // Allontano la camera dall'oggetto
scene.add(camera);

// Orbit controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true; // Effetto smooth ai controlli orbitali

// Applico una texture
const loader = new THREE.TextureLoader();
const texture = loader.load('textures/texture.png');
texture.colorSpace = THREE.SRGBColorSpace;

// Oggetto
// La mesh, quindi l'oggetto e' formato da una geometria e un materiale
const geometry = new THREE.BoxGeometry( 8, 1, 1 ); // A seconda della geometria avremo valori diversi da passare
const material = new THREE.MeshToonMaterial( { map: texture } ); // Anche al materiale possiamo definire vari valori come ad esempio il colore
const mesh = new THREE.Mesh(geometry, material);
mesh.position.y = -1.5;
scene.add( mesh );

// Testo
const fontLoader = new FontLoader()

fontLoader.load(
    '/font/font.json',
    (font) =>
    {
        // Material
        const material = new THREE.MeshBasicMaterial({ color: 'red' })

        // Text
        const textGeometry = new TextGeometry(
            'Big Shoulders Stencil',
            {
                font: font,
                size: 1,
                depth: 0.2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5
            }
        )
        textGeometry.center()

        const text = new THREE.Mesh(textGeometry, material)
        scene.add(text)
    }
)

// Luce d'ambiente
// In questo caso ho usato un materiale che ha bisogno della luce per essere renderizzato
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// Prvo ad aggiungere Mesh in punti casuali
const torusKnotGeometry = new THREE.TorusKnotGeometry( 3, 1, 100, 16 ); 
const sceneSize = 50; // Impostiamo un limite per la distribuzione (dimensione della scena)
for(let i = 0; i < 20; i++) {
  const materialTorusKnot = new THREE.MeshToonMaterial({
    color: new THREE.Color(Math.random(), Math.random(), Math.random()) // Colore casuale
  });

  const mesh = new THREE.Mesh(torusKnotGeometry, materialTorusKnot);

  mesh.position.x = (Math.random() - 0.5) * sceneSize;
  mesh.position.y = (Math.random() - 0.5) * sceneSize;
  mesh.position.z = (Math.random() - 0.5) * sceneSize;

  const randomScale = Math.random() * (1 - 0.2) + 0.2; // La scala varia tra 0.2 e 1
  mesh.scale.set(randomScale, randomScale, randomScale);

  scene.add( mesh );
}

// Adesso devo renderizzare
const rendered = new THREE.WebGLRenderer({canvas: canvas});
rendered.setSize(window.innerWidth, window.innerHeight); // Attribuisco al renderer una dimensione

// Funzione per generare un render continuo
let angle = 0;
function animate() {
  controls.update();
  camera.position.x = Math.sin(angle) * 10;
  camera.position.z = Math.cos(angle) * 50;
  angle += 0.001;
	rendered.render( scene, camera );
  requestAnimationFrame( animate );
}

animate();
