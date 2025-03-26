import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

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
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const particlesTexture = textureLoader.load('/textures/particles/1.png');
// const earthTexture = textureLoader.load('/textures/planets/red_mud_stones_diff_1k.jpg');
// earthTexture.colorSpace = THREE.SRGBColorSpace;
// const moonTexture = textureLoader.load('/textures/planets/red_mud_stones_disp_1k.png');
// moonTexture.colorSpace = THREE.SRGBColorSpace;

/**
 * Particles
 */
// const particlesGeometry = new THREE.SphereGeometry(1, 32, 32);
// const partclesMaterial = new THREE.PointsMaterial({
//     size: 0.02,
//     sizeAttenuation: true // Serve per gestire al meglio lo zoom delle particelle
// });
// const particles = new THREE.Points(particlesGeometry, partclesMaterial);
// scene.add(particles);

// Generare particelle in posizioni randomiche
const particlesGeometry = new THREE.BufferGeometry();
const count = 20000;
const positions = new Float32Array(count * 3);
const color = new Float32Array(count * 3);
for(let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10;
    color[i] = Math.random(); 
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(color, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.1,
    sizeAttenuation: true,
    color: '#ff88cc',
    // map: particlesTexture,
    transparent: true,
    alphaMap: particlesTexture,
    // alphaTest: 0.001
    // depthTest: false
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true
});
const particles = new THREE.Points(particlesGeometry, particlesMaterial);

scene.add(particles);

// Cube
// const cubeGometry = new THREE.BoxGeometry(1, 1, 1);
// const cubeMaterial = new THREE.MeshBasicMaterial();
// const cube = new THREE.Mesh(cubeGometry, cubeMaterial);
// scene.add(cube);

// Sun
// const sun = new THREE.Mesh(
//     new THREE.SphereGeometry(1, 32, 32),
//     new THREE.MeshBasicMaterial({
//         color: '#FF8000',
//         map: earthTexture
//     })
// );
// scene.add(sun);

// const groupEarth = new THREE.Group();

// const earth = new THREE.Mesh(
//     new THREE.SphereGeometry(0.25, 32, 32),
//     new THREE.MeshBasicMaterial()
// );
// const moon = new THREE.Mesh(
//     new THREE.SphereGeometry(0.10, 32, 32),
//     new THREE.MeshBasicMaterial({
//         map: moonTexture
//     })
// );
// groupEarth.add(earth, moon);

// scene.add(groupEarth);

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
camera.position.z = 3
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

    // Upadate PARTICLES
    // particles.rotation.y = elapsedTime * 0.2;
    for(let i = 0; i < count; i++) {
        const i3 = i * 3;

        const x = particlesGeometry.attributes.position.array[i3];
        particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + x);
    }

    particlesGeometry.attributes.position.needsUpdate = true;
    // groupEarth.position.x = Math.cos(elapsedTime * 0.02) * 4;
    // groupEarth.position.z = Math.sin(elapsedTime * 0.02) * 2;
    // moon.position.x = Math.cos(elapsedTime) * 0.5;
    // moon.position.z = Math.sin(elapsedTime) * 0.5;

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()