import * as THREE from "three";
import TWEEN from "https://cdn.jsdelivr.net/npm/@tweenjs/tween.js@18.5.0/dist/tween.esm.js";
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
var frogInitialRotation;
const loader = new GLTFLoader();
loader.load(
  "Frog.gltf",
  function (object) {
    frog = object.scene.children[0];
    frog.position.set(0, 0, 0);
    frogInitialRotation = [frog.rotation.x, frog.rotation.y, frog.rotation.z];
    scene.add(object.scene);
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

// var counter = 1;
// function animate() {
//   counter += 0.4;
//   requestAnimationFrame(animate);
//   // bone.rotation.x = 3.14159 / 10 + 0.2 * Math.sin(counter);
//   // bone.rotation.y = 0.2 * Math.cos(0.7 * counter);
//   // RUpperArm.rotation.y = 3.14159 / 10 + 0.2 * Math.sin(counter);
//   // ArmIKR.position.set(
//   //   ArmIKR.position.x + Math.sin(counter),
//   //   ArmIKR.position.y + Math.cos(counter),
//   //   ArmIKR.position.z
//   // );
//   // b.rotation.y = Math.cos(0.7 * counter);
//   frog.position.y = Math.sin(counter) + 1;
//   frog.position.z = Math.sin(counter * 0.5) + 1;
//   renderer.render(scene, camera);
// }

// document.addEventListener("keydown", function (event) {
//   switch (event.key) {
//     case "j": // Make the model walk
//       // mixer.timeScale = 1;
//       animate(); // Set the speed of the animation
//       break;
//     case "k": // Make the model jump
//       mixer.timeScale = 2; // Set the speed of the animation
//       var jumpAnimation = mixer.clipAction("Jump"); // Get the jump animation from the mixer
//       jumpAnimation.reset(); // Reset the animation to the beginning
//       jumpAnimation.play(); // Play the animation
//       break;
//   }
// });

// Define the jump animation
var frogJump = false;
function jumpAnimation() {
  const jumpHeight = 10;
  const jumpLength = -20;
  const jumpDuration = 500;
  const jumpPosition = frog.position
    .clone()
    .add(new THREE.Vector3(0, jumpHeight, jumpLength / 2));
  const jumpTween = new TWEEN.Tween(frog.position)
    .to(jumpPosition, jumpDuration)
    .easing(TWEEN.Easing.Quadratic.Out);
  const fallTween = new TWEEN.Tween(frog.position)
    .to({ y: 0, z: frog.position.z + jumpLength }, jumpDuration)
    .easing(TWEEN.Easing.Quadratic.In);
  jumpTween.chain(fallTween);
  jumpTween.start();
}

// Handle key presses
document.addEventListener("keydown", function (event) {
  if (event.key === "j") {
    if (frogJump) {
      return; // Jump animation is already playing
    }
    // frog.position.set(0, 0, 0);
    frog.rotation.set(
      frogInitialRotation[0],
      frogInitialRotation[1],
      frogInitialRotation[2]
    );
    frogJump = true; // Set flag to indicate that jump animation is playing
    jumpAnimation();
    setTimeout(function () {
      // frog.position.set(0, 0, 0); // Reset frog position
      frogJump = false; // Reset jump animation flag
    }, 1000); // Wait for jump animation to complete
  }
});

const keyStates = {}; // Object to keep track of which keys are being pressed
document.addEventListener("keydown", function (event) {
  keyStates[event.key] = true; // Set key state to "pressed"
  console.log(event.key);
});
document.addEventListener("keyup", function (event) {
  keyStates[event.key] = false; // Set key state to "not pressed"
});

// Update function
function update() {
  // Move frog based on arrow key state
  const speed = 0.2; // Set movement speed
  // frog.position.set(0, 0, 0); // Reset translation vector
  const rotationSpeed = 0.1;

  if (keyStates.ArrowUp && keyStates.Shift) {
    frog.rotation.x += rotationSpeed;
  } else if (keyStates.ArrowUp) {
    frog.position.z -= speed;
  }

  if (keyStates.ArrowDown && keyStates.Shift) {
    frog.rotation.x -= rotationSpeed;
  } else if (keyStates.ArrowDown) {
    frog.position.z += speed;
  }

  if (keyStates.ArrowLeft && keyStates.Shift) {
    frog.rotation.z -= rotationSpeed;
  } else if (keyStates.ArrowLeft) {
    frog.position.x -= speed;
  }

  if (keyStates.ArrowRight && keyStates.Shift) {
    frog.rotation.z += rotationSpeed;
  } else if (keyStates.ArrowRight) {
    frog.position.x += speed;
  }
  // frog.translateOnAxis(frogTranslation, speed);

  // Render scene and update animations
  renderer.render(scene, camera);
  TWEEN.update();

  // Call update() again on the next frame
  requestAnimationFrame(update);
}

// Start the update loop
requestAnimationFrame(update);

// Render loop
function render() {
  TWEEN.update(); // Update the animation
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();
