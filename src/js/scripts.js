import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75, //Feild of view
  window.innerWidth / window.innerHeight, //aspect ratio
  0.1, //near clipping plane
  1000 //far clipping plane
);

const orbit = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(5); //parameter is axis length
scene.add(axesHelper);

// camera.position.z = 5;
// camera.position.y = 2;
camera.position.set(0, 2, 5);
orbit.update();

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

// box.rotation.x = 5;
// box.rotation.y = 5;
// box.rotation.x = 5;

//gradual increment
// function animate() {
//   box.rotation.x += 0.01;
//   box.rotation.y += 0.01;
//   renderer.render(scene, camera);
// }
//using time argument
function animate(time) {
  box.rotation.x = time / 1000;
  box.rotation.y = time / 1000;
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
