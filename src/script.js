import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import BgSound from "../static/audio/bg.mp3";

const gui = new dat.GUI();

// ? Loading
const textureLoading = new THREE.TextureLoader();
const normalTexture = textureLoading.load("./texture.png");

// ? Canvas
const canvas = document.querySelector("canvas.webgl");

// ? Scene
const scene = new THREE.Scene();

// ? Objects
const SphereGeometry = new THREE.SphereGeometry(0.5, 64, 64);

// ? Materials
const material = new THREE.MeshStandardMaterial({ color: 0x259259259 });
material.metalness = 0.7;
material.roughness = 0.2;
material.normalMap = normalTexture;
material.wireframe = false;
// Mesh
const sphere = new THREE.Mesh(SphereGeometry, material);
scene.add(sphere);

// ? Lights 1
const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

// ? Light 2
const pointLight2 = new THREE.PointLight(0xff0000, 0.8);
pointLight2.position.set(1, 1, 1);
pointLight2.intensity = 1;

scene.add(pointLight2);

gui.add(pointLight2.position, "y").min(-3).max(3).step(0.01);
/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// ? Audio
const listner = new THREE.AudioListener();
camera.add(listner);

// ! Create global audio source
const sound = new THREE.Audio(listner);
// ! load sound
const audioLoader = new THREE.AudioLoader();
audioLoader.load(BgSound, function (buffer) {
  sound.setBuffer(buffer);
  sound.setLoop(true);
  sound.setVolume(1);
});
window.addEventListener("DOMContentLoaded", () => {
  sound.play();
});
// Controls
const controls = new OrbitControls(camera, canvas);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.1 * elapsedTime;

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
