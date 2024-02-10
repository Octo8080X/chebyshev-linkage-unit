import * as BABYLON from "babylonjs";
import HavokPhysics from "@babylonjs/havok";
import havokWasmUrl from "[HavokPhysics.wasm path]?url"; // 'HavokPhysics.wasm' Path

import { createChebyshevLinkageUnit } from "http://esm.sh/chebyshev-linkage-unit";


const canvas = document.getElementById("renderCanvas");

const havok = await HavokPhysics({
  locateFile: () => havokWasmUrl,
});

const engine = new BABYLON.Engine(canvas, true, {
  preserveDrawingBuffer: true,
  stencil: true,
});

const scene = new BABYLON.Scene(engine);

scene.enablePhysics(
  new BABYLON.Vector3(0, -9.8, 0),
  new BABYLON.HavokPlugin(true, havok),

);

const camera = new BABYLON.ArcRotateCamera(
  "Camera",
  (Math.PI * 60) / 180,
  (Math.PI * 120) / 180,
  -25,
  BABYLON.Vector3.Zero(),
  scene,
);

camera.setTarget(BABYLON.Vector3.Zero());
camera.attachControl(canvas, true);

const ground = BABYLON.MeshBuilder.CreateGround(
  "Ground",
  { width: 30, height: 30 },
  scene,
);

new BABYLON.PhysicsAggregate(
  ground,
  BABYLON.PhysicsShapeType.BOX,
  { mass: 0, friction: 10 },
  scene,
);

new BABYLON.HemisphericLight(
  "light",
  new BABYLON.Vector3(-300, 300, 0),
  scene,
);

const baseMaterial = new BABYLON.StandardMaterial("baseMaterial");
baseMaterial.diffuseColor = new BABYLON.Color3(0.6, 0.6, 0.6);

const chebyshev = createChebyshevLinkageUnit(BABYLON, scene, {
  position: new BABYLON.Vector3(0, 3, 0),
  rotation: new BABYLON.Vector3(-Math.PI/2, 0, 0),
  alpha: 0.7,  
  thickness: 0.2,
});
engine.runRenderLoop(function () {
  chebyshev.drive(-50);

  scene.render();
});
