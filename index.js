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

var frog;
var spine;
var back;
var front;
var neck;
var RUpperArm;
var LUpperArm;
var RUpperLeg;
var LUpperLeg;
var RUpperArm2;
var RLowerArm;
var RLowerArm2;
var RWrist;
var LLowerArm;
var LUpperArm2;
var LLowerArm2;
var LWrist;
var RLowerLeg;
var RLowerLeg2;
var RAnkle;
var LLowerLeg;
var LLowerLeg2;
var LAnkle;
const loader = new GLTFLoader();
loader.load(
  "Frog.gltf",
  function (object) {
    scene.add(object.scene);
    frog = object.scene.children[0];
    console.log(frog);
    spine = frog.children[97];
    back = spine.children[0];
    front = spine.children[1];
    RUpperArm = front.children[0];
    LUpperArm = front.children[1];
    neck = front.children[2];
    RUpperLeg = back.children[0];
    LUpperLeg = back.children[1];
    RUpperArm2 = RUpperArm.children[0];
    RLowerArm = RUpperArm2.children[0];
    RLowerArm2 = RLowerArm.children[0];
    RWrist = RLowerArm2.children[0];
    LUpperArm2 = LUpperArm.children[0];
    LLowerArm = LUpperArm2.children[0];
    LLowerArm2 = LLowerArm.children[0];
    LWrist = LLowerArm2.children[0];
    RLowerLeg = RUpperLeg.children[0];
    RLowerLeg2 = RLowerLeg.children[0];
    RAnkle = RLowerLeg2.children[0];
    LLowerLeg = LUpperLeg.children[0];
    LLowerLeg2 = LLowerLeg.children[0];
    LAnkle = LLowerLeg2.children[0];

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

camera.position.set(0, 10, -10);
// camera.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), 3.14159 / 2);

var counter = 1;
function animate() {
  counter += 0.4;
  requestAnimationFrame(animate);
  // bone.rotation.x = 3.14159 / 10 + 0.2 * Math.sin(counter);
  // bone.rotation.y = 0.2 * Math.cos(0.7 * counter);
  // RUpperArm.rotation.y = 3.14159 / 10 + 0.2 * Math.sin(counter);
  // ArmIKR.position.set(
  //   ArmIKR.position.x + Math.sin(counter),
  //   ArmIKR.position.y + Math.cos(counter),
  //   ArmIKR.position.z
  // );
  // b.rotation.y = Math.cos(0.7 * counter);
  // frog.position.y =
  renderer.render(scene, camera);
}
animate();
