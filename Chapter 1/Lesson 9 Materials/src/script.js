import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
// Per scaricare file .hdr -> https://polyhaven.com/hdris

/**
 * Debugger
 */
const gui = new GUI();

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('./textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('./textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('./textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('./textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('./textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('./textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('./textures/matcaps/3.png')
const gradientTexture = textureLoader.load('./textures/gradients/3.jpg')

doorColorTexture.colorSpace = THREE.SRGBColorSpace;
matcapTexture.colorSpace = THREE.SRGBColorSpace;

/**
 * Oggetti
 */
// MeshBasicMaterial
// const material = new THREE.MeshBasicMaterial({map: doorColorTexture});
// Si puo' scrivere anche
//const material = new THREE.MeshBasicMaterial();
//material.map = doorColorTexture;
// Per il colore non funzion allo stesso modo, non posso scrivere material.color = 'red'
// Va gestito in questa maniera
//material.color = new THREE.Color('red');
// Per il wireframe posso tranquillamente scrivere material.wireframe = true
// Esiste anche
//material.transparent = true;
//material.opacity = 0.5; // Questo non puo' esistere senza transparent
//material.alphaMap = doorAlphaTexture; // Questo è particolarmente utile per creare oggetti come porte, finestre o qualsiasi altra superficie con dettagli di trasparenza non uniforme, come fori o motivi decorativi (ad esempio, porte di legno con parti trasparenti o perforate).
//material.side = THREE.DoubleSide; // Per renderizzare ambe facce di un piano ad esempio

// MeshNormalMaterial
// const material = new THREE.MeshNormalMaterial();
// material.flatShading = true;

// MeshMatcapMaterial
// https://github.com/nidorx/matcaps per diversi tipi di matcaps
// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcapTexture;

// MeshDepthMaterial
// const material = new THREE.MeshDepthMaterial();

// MeshLambertMaterial
// E' un materiale che richiede la luce
// const material = new THREE.MeshLambertMaterial();

// MeshPhongMaterial
// const material = new THREE.MeshPhongMaterial();
// material.shininess = 100; // Brillantezza
// material.specular = new THREE.Color(0x1188ff);

// MeshToonMaterial
// const material = new THREE.MeshToonMaterial();
// gradientTexture.minFilter = THREE.NearestFilter;
// gradientTexture.magFilter = THREE.NearestFilter;
// gradientTexture.generateMipmaps = false; // Per il GPU
// material.gradientMap = gradientTexture;

// MeshStandardMaterial
// const material = new THREE.MeshStandardMaterial();
// material.metalness = 1;
// material.roughness = 1;
// material.side = THREE.DoubleSide;
// material.map = doorColorTexture;
// material.aoMap = doorAmbientOcclusionTexture;
// material.aoMapIntensity = 1;
// material.displacementMap = doorHeightTexture;
// material.displacementScale = 0.1;
// material.metalnessMap = doorMetalnessTexture;
// material.roughnessMap = doorRoughnessTexture;
// material.normalMap = doorNormalTexture;
// material.normalScale.set(0.5, 0.5);
// material.transparent = true;
// material.alphaMap = doorAlphaTexture; // Si applica se transparent esiste

// Aggiungo nel debugger
// gui.add(material, 'metalness').name('Metalness').min(0).max(1).step(0.0001);
// gui.add(material, 'roughness').name('Roughness').min(0).max(1).step(0.0001);

// MeshPhysicalMaterial
const material = new THREE.MeshPhysicalMaterial();
material.metalness = 0;
material.roughness = 0;
material.side = THREE.DoubleSide;
// material.map = doorColorTexture;
// material.aoMap = doorAmbientOcclusionTexture;
// material.aoMapIntensity = 1;
// material.displacementMap = doorHeightTexture;
// material.displacementScale = 0.1;
// material.metalnessMap = doorMetalnessTexture;
// material.roughnessMap = doorRoughnessTexture;
// material.normalMap = doorNormalTexture;
// material.normalScale.set(0.5, 0.5);
// material.transparent = true;
// material.alphaMap = doorAlphaTexture; // Si applica se transparent esiste

gui.add(material, 'metalness').name('Metalness').min(0).max(1).step(0.0001);
gui.add(material, 'roughness').name('Roughness').min(0).max(1).step(0.0001);

// Clearcoat
// material.clearcoat = 1;
// material.clearcoatRoughness = 0;

// gui.add(material, 'clearcoat').name('Clearcoat').min(0).max(1).step(0.0001);
// gui.add(material, 'clearcoatRoughness').name('Clearcoat Roughness').min(0).max(1).step(0.0001);

// Sheen
// material.sheen = 1;
// material.sheenRoughness = 0.25;
// material.sheenColor.set(1, 1, 1)

// gui.add(material, 'sheen').name('Sheen').min(0).max(1).step(0.0001);
// gui.add(material, 'sheenRoughness').name('Sheen Roughness').min(0).max(1).step(0.0001);
// gui.addColor(material, 'sheenColor');

// Iridescenza
// material.iridescence = 1;
// material.iridescenceIOR = 1;
// material.iridescenceThicknessRange = [100, 800];

// gui.add(material, 'iridescence').name('Iridescence').min(0).max(1).step(0.0001);
// gui.add(material, 'iridescenceIOR').name('Iridescence IOR').min(1).max(2.333).step(0.0001);
// gui.add(material.iridescenceThicknessRange, '0').name('Iridescence Thickness Range').min(1).max(1000).step(1);
// gui.add(material.iridescenceThicknessRange, '1').name('Iridescence Thickness Range').min(1).max(1000).step(1);

// Transmission
material.transmission = 1;
material.ior = 1.5;
material.thickness = 0.5;

gui.add(material, 'transmission').name('Transmission').min(0).max(1).step(0.0001);
gui.add(material, 'ior').name('IOR').min(1).max(10).step(0.0001);
gui.add(material, 'thickness').name('Thickness').min(0).max(1).step(0.0001);

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64), material
)
sphere.position.x = - 1.5;

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100), material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 64, 128), material
)
torus.position.x = 1.5;

scene.add(sphere, plane, torus);

/**
 * Luci
 */
// const ambientLight = new THREE.AmbientLight(0xffffff, 1);
// scene.add(ambientLight);

// Punto luce
// const pointLight = new THREE.PointLight(0xffffff, 30);
// pointLight.position.x = 2;
// pointLight.position.y = 3;
// pointLight.position.z = 4;
// scene.add(pointLight);

/**
 * Enviroment map
 */
const rgbeLoader = new RGBELoader();
rgbeLoader.load('./textures/environmentMap/2k.hdr', (environmentMap) => {
    environmentMap.mapping = THREE.EquirectangularReflectionMapping;

    scene.background = environmentMap;
    scene.environment = environmentMap;
})

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

    sphere.rotation.y = 0.1 * elapsedTime;
    plane.rotation.y = 0.1 * elapsedTime;
    torus.rotation.y = 0.1 * elapsedTime;

    sphere.rotation.x = - 0.15 * elapsedTime;
    plane.rotation.x = - 0.15 * elapsedTime;
    torus.rotation.x = - 0.15 * elapsedTime;

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()