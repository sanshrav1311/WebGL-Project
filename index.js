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

const keyStates = {};
document.addEventListener("keydown", function (event) {
  keyStates[event.key] = true;
  console.log(event.key);
});
document.addEventListener("keyup", function (event) {
  keyStates[event.key] = false;
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
var RArmPosition = [];
var LArmPosition = [];
var RLegPosition = [];
var LLegPosition = [];
var resetArms;
var resetLegs;

const vertexShader = `
    varying vec3 Normal;
    varying vec3 Position;
    varying vec3 viewPosition;
    #include <common>
    #include <skinning_pars_vertex>

    void main() {
      #include <skinbase_vertex>
      #include <begin_vertex>
      #include <beginnormal_vertex>
      #include <defaultnormal_vertex>
      #include <skinning_vertex>
      #include <project_vertex>

      Normal = normalize(normalMatrix * normal);
      Position = vec3(modelViewMatrix * vec4(position, 1.0));
      viewPosition = -mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

const fragmentShader = `
varying vec3 Normal;
varying vec3 viewPosition;
uniform vec3 pointLightPosition;
uniform vec3 pointLightColor;
void main() {
  // calculate the diffuse and specular lighting
  vec3 normal = normalize(Normal);
  vec3 lightDirection = normalize(pointLightPosition - viewPosition);
  float diffuse = max(dot(normal, lightDirection), 0.0);
  vec3 halfway = normalize(lightDirection + normalize(viewPosition));
  float specular = pow(max(dot(normal, halfway), 0.0), 32.0);
  
  // calculate the final color
  vec3 color = mix(vec3(1.0, 1.0, 0.6), vec3(0.0, 1.0, 0.0), diffuse); // set the base color to green
  color *= pointLightColor; // multiply by the color of the point light
  color += specular; // add specular lighting

  gl_FragColor = vec4(color, 1.0);
}
`;
const fragmentShaderPlane = `
varying vec3 Normal;
varying vec3 viewPosition;
uniform vec3 pointLightPosition;
uniform vec3 pointLightColor;
void main() {
  // calculate the diffuse and specular lighting
  vec3 normal = normalize(Normal);
  vec3 lightDirection = normalize(pointLightPosition - viewPosition);
  float diffuse = max(dot(normal, lightDirection), 0.0);
  vec3 halfway = normalize(lightDirection + normalize(viewPosition));
  float specular = pow(max(dot(normal, halfway), 0.0), 32.0);
  
  // calculate the final color
  vec3 color = vec3(0.5, 0.5, 0.5); // set the base color to grey
  color *= pointLightColor; // multiply by the color of the point light
  color *= diffuse; // multiply by the diffuse lighting
  color += vec3(0.2); // add ambient lighting
  
  gl_FragColor = vec4(color, 1.0);
}
`;

const uniforms = {
  pointLightPosition: { value: new THREE.Vector3(0, 10, 0) },
  pointLightColor: { value: new THREE.Color(1, 1, 1) },
};

const geometry = new THREE.PlaneGeometry(1000, 1000);
const material = new THREE.ShaderMaterial({
  uniforms: uniforms,
  vertexShader: vertexShader,
  fragmentShader: fragmentShaderPlane,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(geometry, material);
plane.rotation.x = Math.PI / 2;
plane.position.y = -1.5;
// scene.add(plane);

const loader = new GLTFLoader();
loader.load(
  "Frog.gltf",
  function (object) {
    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });
    for (var i = 0; i < 97; i++) {
      object.scene.children[0].children[i].material = material;
    }
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
    RArmPosition.push(
      new THREE.Vector3(
        RLowerArm.rotation.x,
        RLowerArm.rotation.y,
        RLowerArm.rotation.z
      )
    );
    RArmPosition.push(
      new THREE.Vector3(
        RUpperArm.rotation.x,
        RUpperArm.rotation.y,
        RUpperArm.rotation.z
      )
    );
    RArmPosition.push(
      new THREE.Vector3(
        RLowerArm2.rotation.x,
        RLowerArm2.rotation.y,
        RLowerArm2.rotation.z
      )
    );
    RArmPosition.push(
      new THREE.Vector3(
        RUpperArm2.rotation.x,
        RUpperArm2.rotation.y,
        RUpperArm2.rotation.z
      )
    );
    LArmPosition.push(
      new THREE.Vector3(
        LLowerArm.rotation.x,
        LLowerArm.rotation.y,
        LLowerArm.rotation.z
      )
    );
    LArmPosition.push(
      new THREE.Vector3(
        LUpperArm.rotation.x,
        LUpperArm.rotation.y,
        LUpperArm.rotation.z
      )
    );
    LArmPosition.push(
      new THREE.Vector3(
        LLowerArm2.rotation.x,
        LLowerArm2.rotation.y,
        LLowerArm2.rotation.z
      )
    );
    LArmPosition.push(
      new THREE.Vector3(
        LUpperArm2.rotation.x,
        LUpperArm2.rotation.y,
        LUpperArm2.rotation.z
      )
    );
    RLegPosition.push(
      new THREE.Vector3(
        RLowerLeg.rotation.x,
        RLowerLeg.rotation.y,
        RLowerLeg.rotation.z
      )
    );
    RLegPosition.push(
      new THREE.Vector3(
        RUpperLeg.rotation.x,
        RUpperLeg.rotation.y,
        RUpperLeg.rotation.z
      )
    );
    RLegPosition.push(
      new THREE.Vector3(
        RLowerLeg2.rotation.x,
        RLowerLeg2.rotation.y,
        RLowerLeg2.rotation.z
      )
    );
    RLegPosition.push(
      new THREE.Vector3(RAnkle.rotation.x, RAnkle.rotation.y, RAnkle.rotation.z)
    );
    LLegPosition.push(
      new THREE.Vector3(
        LLowerLeg.rotation.x,
        LLowerLeg.rotation.y,
        LLowerLeg.rotation.z
      )
    );
    LLegPosition.push(
      new THREE.Vector3(
        LUpperLeg.rotation.x,
        LUpperLeg.rotation.y,
        LUpperLeg.rotation.z
      )
    );
    LLegPosition.push(
      new THREE.Vector3(
        LLowerLeg2.rotation.x,
        LLowerLeg2.rotation.y,
        LLowerLeg2.rotation.z
      )
    );
    LLegPosition.push(
      new THREE.Vector3(LAnkle.rotation.x, LAnkle.rotation.y, LAnkle.rotation.z)
    );
    resetArms = () => {
      RLowerArm.rotation.set(
        RArmPosition[0].x,
        RArmPosition[0].y,
        RArmPosition[0].z
      );
      RUpperArm.rotation.set(
        RArmPosition[1].x,
        RArmPosition[1].y,
        RArmPosition[1].z
      );
      RLowerArm2.rotation.set(
        RArmPosition[2].x,
        RArmPosition[2].y,
        RArmPosition[2].z
      );
      RUpperArm2.rotation.set(
        RArmPosition[3].x,
        RArmPosition[3].y,
        RArmPosition[3].z
      );
      LLowerArm.rotation.set(
        LArmPosition[0].x,
        LArmPosition[0].y,
        LArmPosition[0].z
      );
      LUpperArm.rotation.set(
        LArmPosition[1].x,
        LArmPosition[1].y,
        LArmPosition[1].z
      );
      LLowerArm2.rotation.set(
        LArmPosition[2].x,
        LArmPosition[2].y,
        LArmPosition[2].z
      );
      LUpperArm2.rotation.set(
        LArmPosition[3].x,
        LArmPosition[3].y,
        LArmPosition[3].z
      );
    };
    resetLegs = () => {
      RLowerLeg.rotation.set(
        RLegPosition[0].x,
        RLegPosition[0].y,
        RLegPosition[0].z
      );
      RUpperLeg.rotation.set(
        RLegPosition[1].x,
        RLegPosition[1].y,
        RLegPosition[1].z
      );
      RLowerLeg2.rotation.set(
        RLegPosition[2].x,
        RLegPosition[2].y,
        RLegPosition[2].z
      );
      RAnkle.rotation.set(
        RLegPosition[3].x,
        RLegPosition[3].y,
        RLegPosition[3].z
      );
      LLowerLeg.rotation.set(
        LLegPosition[0].x,
        LLegPosition[0].y,
        LLegPosition[0].z
      );
      LUpperLeg.rotation.set(
        LLegPosition[1].x,
        LLegPosition[1].y,
        LLegPosition[1].z
      );
      LLowerLeg2.rotation.set(
        LLegPosition[2].x,
        LLegPosition[2].y,
        LLegPosition[2].z
      );
      LAnkle.rotation.set(
        LLegPosition[3].x,
        LLegPosition[3].y,
        LLegPosition[3].z
      );
    };
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

const light2 = new THREE.PointLight(0xffffff, 1, 100);
light2.position.set(0, 10, 0);
scene.add(light2);

camera.position.set(0, 10, 10);

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
  resetArms();
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
  resetArms();
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
  resetLegs();
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
  resetLegs();
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
var isPlane = false;

document.addEventListener("keydown", function (event) {
  if (event.key === "j") {
    resetArms();
    resetLegs();
    extendArm = false;
    legextend = false;
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
  if (event.key === "x") {
    if (isPlane) {
      scene.remove(plane);
      isPlane = false;
    } else {
      scene.add(plane);
      isPlane = true;
    }
  }
});
var QKeyDown = false;
var timee = 0;
var timef = 0;
function update() {
  const speed = 0.2;
  const rotationSpeed = 0.1;

  if (keyStates.ArrowUp && keyStates.Shift) {
    frog.rotation.x -= rotationSpeed;
  } else if (keyStates.ArrowUp) {
    frog.position.z -= speed;
  }

  if (keyStates.ArrowDown && keyStates.Shift) {
    frog.rotation.x += rotationSpeed;
  } else if (keyStates.ArrowDown) {
    frog.position.z += speed;
  }

  if (keyStates.ArrowLeft && keyStates.Shift) {
    frog.rotation.y += rotationSpeed;
  } else if (keyStates.ArrowLeft) {
    frog.position.x -= speed;
  }

  if (keyStates.ArrowRight && keyStates.Shift) {
    frog.rotation.y -= rotationSpeed;
  } else if (keyStates.ArrowRight) {
    frog.position.x += speed;
  }

  if (!keyStates.w) {
    WkeyDown = false;
  }
  if (!keyStates.s) {
    SKeyDown = false;
  }
  const offset = -3.8;
  if (keyStates.q) {
    if (!QKeyDown) {
      resetArms();
      resetLegs();
      extendArm = false;
      legextend = false;
      RLowerArm.rotation.set(
        RLowerArm.rotation.x + offset,
        RLowerArm.rotation.y,
        RLowerArm.rotation.z - offset
      );
      LLowerArm.rotation.set(
        LLowerArm.rotation.x + offset,
        LLowerArm.rotation.y,
        LLowerArm.rotation.z + offset
      );
      QKeyDown = true;
    }
    timee += 0.1;
    timef += 0.1;
    if (timee >= 0.3) timee = 0;
    if (timef >= 0.3) timef = 0;
    RLowerArm.rotation.set(
      RLowerArm.rotation.x + Math.sin(timee * 0.6),
      RLowerArm.rotation.y,
      RLowerArm.rotation.z - Math.sin(timee * 0.6)
    );
    LLowerArm.rotation.set(
      LLowerArm.rotation.x + Math.sin(timee * 0.6),
      LLowerArm.rotation.y,
      LLowerArm.rotation.z + Math.sin(timee * 0.6)
    );
    RLowerLeg.rotation.set(
      RLowerLeg.rotation.x,
      RLowerLeg.rotation.y,
      RLowerLeg.rotation.z + Math.sin(timef * 0.6)
    );
    LLowerLeg.rotation.set(
      LLowerLeg.rotation.x,
      LLowerLeg.rotation.y,
      LLowerLeg.rotation.z - Math.sin(timef * 0.6)
    );
    RAnkle.rotation.set(
      RAnkle.rotation.x,
      RAnkle.rotation.y,
      RAnkle.rotation.z + Math.sin(timef * 0.6)
    );
    LAnkle.rotation.set(
      LAnkle.rotation.x,
      LAnkle.rotation.y,
      LAnkle.rotation.z - Math.sin(timef * 0.6)
    );
  }
  if (!keyStates.q) {
    QKeyDown = false;
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
