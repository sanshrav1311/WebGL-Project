import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

// var bone;
// var b;
const loader = new GLTFLoader();
loader.load(
  "Frog.gltf",
  function (object) {
    scene.add(object.scene);
    console.log(object);
    // b = object.scene.children[0].children[98];
    // const frog = object.scene.children[0].children[0];
    // frog.rotation.z = 3.14159;
    // const armature = object.scene.children[0];
    // bone = armature.children[4].children[1].children[0].children[2];
    // console.log(frog);
    // frog.material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // frog.rotation.y = 3.14159 / 2;
    // console.log(frog);
    // console.log(armature);
    // scene.add(frog);
    // const bone = object.scene.children.find(
    //   (child) => child.name === "bone.002"
    // );
    // scene.add(frog);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);
// scene.add(cube);

//add light
// const light = new THREE.AmbientLight(0xFFFFFF); // soft white light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// const light2 = new THREE.PointLight(0xffffff, 1, 100);
// light2.position.set(2, 10, 2);
// scene.add(light2);
// scene.add(light);
scene.add(directionalLight);

camera.position.z = 10;
// camera.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), 3.14159 / 2);

var counter = 1;
function animate() {
  counter += 0.4;
  requestAnimationFrame(animate);
  // bone.rotation.x = 3.14159 / 10 + 0.2 * Math.sin(counter);
  // bone.rotation.y = 0.2 * Math.cos(0.7 * counter);
  // b.rotation.x = 3.14159 / 10 + 0.2 * Math.sin(counter);
  // b.rotation.y = Math.cos(0.7 * counter);
  renderer.render(scene, camera);
}
animate();
