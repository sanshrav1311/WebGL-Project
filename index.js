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

const keyStates = {}; // Object to keep track of which keys are being pressed
document.addEventListener("keydown", function (event) {
  keyStates[event.key] = true; // Set key state to "pressed"
  console.log(event.key);
});
document.addEventListener("keyup", function (event) {
  keyStates[event.key] = false; // Set key state to "not pressed"
});

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
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

//add light
// const light = new THREE.AmbientLight(0xFFFFFF); // soft white light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
const light2 = new THREE.PointLight(0xffffff, 1, 100);
light2.position.set(2, 10, -2);
scene.add(light2);
// scene.add(light);
scene.add(directionalLight);

camera.position.set(0, 10, -10);

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

var extendArm;
const rotateVal = -1.5;
const rotateVal2 = -1.5;
const rotateVal3 = -1.5;

function RextendArms() {
  const extendTime = 500;
  const armPosition = new THREE.Vector3(
    RUpperArm2.rotation.x,
    RUpperArm2.rotation.y,
    RUpperArm2.rotation.z - rotateVal
  );
  const extendTween = new TWEEN.Tween(RUpperArm2.rotation)
    .to(armPosition, extendTime)
    .easing(TWEEN.Easing.Quadratic.Out);

  const lowerarmPosition = new THREE.Vector3(
    RLowerArm.rotation.x + rotateVal2,
    RLowerArm.rotation.y,
    RLowerArm.rotation.z
  );
  const lowerextendTween = new TWEEN.Tween(RLowerArm.rotation)
    .to(lowerarmPosition, extendTime)
    .easing(TWEEN.Easing.Quadratic.Out);

  const lowerarmPosition2 = new THREE.Vector3(
    RLowerArm2.rotation.x - rotateVal3,
    RLowerArm2.rotation.y,
    RLowerArm2.rotation.z
  );
  const lowerextendTween2 = new TWEEN.Tween(RLowerArm2.rotation)
    .to(lowerarmPosition2, extendTime)
    .easing(TWEEN.Easing.Quadratic.Out);
  extendTween.start();
  lowerextendTween.start();
  lowerextendTween2.start();
}

function LextendArms() {
  const extendTime = 500;
  const armPosition = new THREE.Vector3(
    LUpperArm2.rotation.x,
    LUpperArm2.rotation.y,
    LUpperArm2.rotation.z + rotateVal
  );
  const extendTween = new TWEEN.Tween(LUpperArm2.rotation)
    .to(armPosition, extendTime)
    .easing(TWEEN.Easing.Quadratic.Out);
  const lowerarmPosition = new THREE.Vector3(
    LLowerArm.rotation.x + rotateVal2,
    LLowerArm.rotation.y,
    LLowerArm.rotation.z
  );
  const lowerextendTween = new TWEEN.Tween(LLowerArm.rotation)
    .to(lowerarmPosition, extendTime)
    .easing(TWEEN.Easing.Quadratic.Out);
  const lowerarmPosition2 = new THREE.Vector3(
    LLowerArm2.rotation.x - rotateVal3,
    LLowerArm2.rotation.y,
    LLowerArm2.rotation.z
  );
  const lowerextendTween2 = new TWEEN.Tween(LLowerArm2.rotation)
    .to(lowerarmPosition2, extendTime)
    .easing(TWEEN.Easing.Quadratic.Out);
  extendTween.start();
  lowerextendTween.start();
  lowerextendTween2.start();
}

function RbackArms() {
  const extendTime = 500;
  const armPosition = new THREE.Vector3(
    RUpperArm2.rotation.x,
    RUpperArm2.rotation.y,
    RUpperArm2.rotation.z + rotateVal
  );
  const extendTween = new TWEEN.Tween(RUpperArm2.rotation)
    .to(armPosition, extendTime)
    .easing(TWEEN.Easing.Quadratic.Out);
  const lowerarmPosition = new THREE.Vector3(
    RLowerArm.rotation.x - rotateVal2,
    RLowerArm.rotation.y,
    RLowerArm.rotation.z
  );
  const lowerextendTween = new TWEEN.Tween(RLowerArm.rotation)
    .to(lowerarmPosition, extendTime)
    .easing(TWEEN.Easing.Quadratic.Out);
  const lowerarmPosition2 = new THREE.Vector3(
    RLowerArm2.rotation.x + rotateVal3,
    RLowerArm2.rotation.y,
    RLowerArm2.rotation.z
  );
  const lowerextendTween2 = new TWEEN.Tween(RLowerArm2.rotation)
    .to(lowerarmPosition2, extendTime)
    .easing(TWEEN.Easing.Quadratic.Out);
  extendTween.start();
  lowerextendTween.start();
  lowerextendTween2.start();
}

function LbackArms() {
  const extendTime = 500;
  const armPosition = new THREE.Vector3(
    LUpperArm2.rotation.x,
    LUpperArm2.rotation.y,
    LUpperArm2.rotation.z - rotateVal
  );
  const extendTween = new TWEEN.Tween(LUpperArm2.rotation)
    .to(armPosition, extendTime)
    .easing(TWEEN.Easing.Quadratic.Out);
  const lowerarmPosition = new THREE.Vector3(
    LLowerArm.rotation.x - rotateVal2,
    LLowerArm.rotation.y,
    LLowerArm.rotation.z
  );
  const lowerextendTween = new TWEEN.Tween(LLowerArm.rotation)
    .to(lowerarmPosition, extendTime)
    .easing(TWEEN.Easing.Quadratic.Out);
  const lowerarmPosition2 = new THREE.Vector3(
    LLowerArm2.rotation.x + rotateVal3,
    LLowerArm2.rotation.y,
    LLowerArm2.rotation.z
  );
  const lowerextendTween2 = new TWEEN.Tween(LLowerArm2.rotation)
    .to(lowerarmPosition2, extendTime)
    .easing(TWEEN.Easing.Quadratic.Out);

  extendTween.start();
  lowerextendTween.start();
  lowerextendTween2.start();
}

const rotateVal4 = -0.7;

var neckright = false;
var neckleft = false;

function NeckRight() {
  if (neckleft) {
    const rotateTime = 400;
    const neckPosition = new THREE.Vector3(
      neck.rotation.x,
      neck.rotation.y,
      neck.rotation.z - rotateVal4 * 2
    );
    const neckTween = new TWEEN.Tween(neck.rotation)
      .to(neckPosition, rotateTime)
      .easing(TWEEN.Easing.Quadratic.Out);
    neckTween.start();
    neckright = true;
    neckleft = false;
  } else if (neckright) {
    const rotateTime = 200;
    const neckPosition = new THREE.Vector3(
      neck.rotation.x,
      neck.rotation.y,
      neck.rotation.z + rotateVal4
    );
    const neckTween = new TWEEN.Tween(neck.rotation)
      .to(neckPosition, rotateTime)
      .easing(TWEEN.Easing.Quadratic.Out);
    neckTween.start();
    neckright = false;
    neckleft = false;
  } else {
    const rotateTime = 200;
    const neckPosition = new THREE.Vector3(
      neck.rotation.x,
      neck.rotation.y,
      neck.rotation.z - rotateVal4
    );
    const neckTween = new TWEEN.Tween(neck.rotation)
      .to(neckPosition, rotateTime)
      .easing(TWEEN.Easing.Quadratic.Out);
    neckTween.start();
    neckright = true;
    neckleft = false;
  }
}

function NeckLeft() {
  if (neckright) {
    const rotateTime = 400;
    const neckPosition = new THREE.Vector3(
      neck.rotation.x,
      neck.rotation.y,
      neck.rotation.z + rotateVal4 * 2
    );
    const neckTween = new TWEEN.Tween(neck.rotation)
      .to(neckPosition, rotateTime)
      .easing(TWEEN.Easing.Quadratic.Out);
    neckTween.start();
    neckleft = true;
    neckright = false;
  } else if (neckleft) {
    const rotateTime = 200;
    const neckPosition = new THREE.Vector3(
      neck.rotation.x,
      neck.rotation.y,
      neck.rotation.z - rotateVal4
    );
    const neckTween = new TWEEN.Tween(neck.rotation)
      .to(neckPosition, rotateTime)
      .easing(TWEEN.Easing.Quadratic.Out);
    neckTween.start();
    neckleft = false;
    neckright = false;
  } else {
    const rotateTime = 200;
    const neckPosition = new THREE.Vector3(
      neck.rotation.x,
      neck.rotation.y,
      neck.rotation.z + rotateVal4
    );
    const neckTween = new TWEEN.Tween(neck.rotation)
      .to(neckPosition, rotateTime)
      .easing(TWEEN.Easing.Quadratic.Out);
    neckTween.start();
    neckleft = true;
    neckright = false;
  }
}

const rotateVal5 = 0.2;
const rotateVal6 = -1.6;
var legextend;

function RLegExtend() {
  const rotateTime = 500;
  const upperlegPosition = new THREE.Vector3(
    RLowerLeg.rotation.x,
    RLowerLeg.rotation.y,
    RLowerLeg.rotation.z - rotateVal5 * 2
  );
  const upperlegTween = new TWEEN.Tween(RLowerLeg.rotation)
    .to(upperlegPosition, rotateTime)
    .easing(TWEEN.Easing.Quadratic.Out);
  const legPosition = new THREE.Vector3(
    RLowerLeg2.rotation.x + rotateVal6,
    RLowerLeg2.rotation.y,
    RLowerLeg2.rotation.z
  );
  const lowerlegTween = new TWEEN.Tween(RLowerLeg2.rotation)
    .to(legPosition, rotateTime)
    .easing(TWEEN.Easing.Quadratic.Out);

  lowerlegTween.start();
  upperlegTween.start();
}
function LLegExtend() {
  const rotateTime = 500;
  const upperlegPosition = new THREE.Vector3(
    LLowerLeg.rotation.x,
    LLowerLeg.rotation.y,
    LLowerLeg.rotation.z + rotateVal5 * 2
  );
  const upperlegTween = new TWEEN.Tween(LLowerLeg.rotation)
    .to(upperlegPosition, rotateTime)
    .easing(TWEEN.Easing.Quadratic.Out);
  const legPosition = new THREE.Vector3(
    LLowerLeg2.rotation.x + rotateVal6,
    LLowerLeg2.rotation.y,
    LLowerLeg2.rotation.z
  );
  const lowerlegTween = new TWEEN.Tween(LLowerLeg2.rotation)
    .to(legPosition, rotateTime)
    .easing(TWEEN.Easing.Quadratic.Out);
  lowerlegTween.start();
  upperlegTween.start();
}
function RLegBack() {
  const rotateTime = 500;
  const upperlegPosition = new THREE.Vector3(
    RLowerLeg.rotation.x,
    RLowerLeg.rotation.y,
    RLowerLeg.rotation.z + rotateVal5 * 2
  );
  const upperlegTween = new TWEEN.Tween(RLowerLeg.rotation)
    .to(upperlegPosition, rotateTime)
    .easing(TWEEN.Easing.Quadratic.Out);
  const legPosition = new THREE.Vector3(
    RLowerLeg2.rotation.x - rotateVal6,
    RLowerLeg2.rotation.y,
    RLowerLeg2.rotation.z
  );
  const lowerlegTween = new TWEEN.Tween(RLowerLeg2.rotation)
    .to(legPosition, rotateTime)
    .easing(TWEEN.Easing.Quadratic.Out);

  lowerlegTween.start();
  upperlegTween.start();
}
function LLegBack() {
  const rotateTime = 500;
  const upperlegPosition = new THREE.Vector3(
    LLowerLeg.rotation.x,
    LLowerLeg.rotation.y,
    LLowerLeg.rotation.z - rotateVal5 * 2
  );
  const upperlegTween = new TWEEN.Tween(LLowerLeg.rotation)
    .to(upperlegPosition, rotateTime)
    .easing(TWEEN.Easing.Quadratic.Out);
  const legPosition = new THREE.Vector3(
    LLowerLeg2.rotation.x - rotateVal6,
    LLowerLeg2.rotation.y,
    LLowerLeg2.rotation.z
  );
  const lowerlegTween = new TWEEN.Tween(LLowerLeg2.rotation)
    .to(legPosition, rotateTime)
    .easing(TWEEN.Easing.Quadratic.Out);
  lowerlegTween.start();
  upperlegTween.start();
}

var WkeyDown = false;
var SKeyDown = false;
document.addEventListener("keydown", function (event) {
  if (event.key === "j") {
    if (frogJump) {
      return;
    }

    frog.rotation.set(
      frogInitialRotation[0],
      frogInitialRotation[1],
      frogInitialRotation[2]
    );
    frogJump = true;
    jumpAnimation();
    RextendArms();
    LextendArms();
    RLegExtend();
    LLegExtend();
    setTimeout(function () {
      RbackArms();
      LbackArms();
      RLegBack();
      LLegBack();
    }, 500);
    setTimeout(function () {
      frogJump = false;
    }, 1000);
  }
  if (event.key === "w") {
    frog.rotation.set(
      frogInitialRotation[0],
      frogInitialRotation[1],
      frogInitialRotation[2]
    );
    if (extendArm && !WkeyDown) {
      RbackArms();
      LbackArms();
      setTimeout(function () {
        extendArm = false;
      }, 500);
    } else if (!extendArm && !WkeyDown) {
      RextendArms();
      LextendArms();
      setTimeout(function () {
        extendArm = true;
      }, 500);
    }
    WkeyDown = true;
  }
  if (event.key === "d") {
    frog.rotation.set(
      frogInitialRotation[0],
      frogInitialRotation[1],
      frogInitialRotation[2]
    );
    NeckRight();
  }
  if (event.key === "a") {
    frog.rotation.set(
      frogInitialRotation[0],
      frogInitialRotation[1],
      frogInitialRotation[2]
    );
    NeckLeft();
  }

  if (event.key === "s") {
    frog.rotation.set(
      frogInitialRotation[0],
      frogInitialRotation[1],
      frogInitialRotation[2]
    );
    if (legextend && !SKeyDown) {
      RLegBack();
      LLegBack();
      setTimeout(function () {
        legextend = false;
      }, 500);
    } else if (!legextend && !SKeyDown) {
      RLegExtend();
      LLegExtend();
      setTimeout(function () {
        legextend = true;
      }, 500);
    }
    SKeyDown = true;
  }
});

function update() {
  const speed = 0.2;
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

  if (!keyStates.w) {
    WkeyDown = false;
  }
  if (!keyStates.s) {
    SKeyDown = false;
  }

  renderer.render(scene, camera);
  TWEEN.update();

  requestAnimationFrame(update);
}

requestAnimationFrame(update);

function render() {
  TWEEN.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();
