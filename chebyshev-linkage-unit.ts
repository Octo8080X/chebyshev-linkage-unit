import * as BABYLON from "babylonjs";

function getMaterial(lBabyon: BABYLON, color: string, alpha: number) {
  const redMaterial = new lBabyon.StandardMaterial("redMaterial");
  redMaterial.diffuseColor = new lBabyon.Color3(0.6, 0.0, 0.0);
  redMaterial.alpha = alpha;

  const blueMaterial = new lBabyon.StandardMaterial("blueMaterial");
  blueMaterial.diffuseColor = new lBabyon.Color3(0.0, 0.0, 0.6);
  blueMaterial.alpha = alpha;

  const greenMaterial = new lBabyon.StandardMaterial("greenMaterial");
  greenMaterial.diffuseColor = new lBabyon.Color3(0.0, 0.6, 0.0);
  greenMaterial.alpha = alpha;

  const yellowMaterial = new lBabyon.StandardMaterial("yellowMaterial");
  yellowMaterial.diffuseColor = new lBabyon.Color3(0.6, 0.6, 0.0);
  yellowMaterial.alpha = alpha;

  const whiteMaterial = new lBabyon.StandardMaterial("whiteMaterial");
  whiteMaterial.diffuseColor = new lBabyon.Color3(1.0, 1.0, 1.0);
  whiteMaterial.alpha = alpha;

  const blackMaterial = new lBabyon.StandardMaterial("blackMaterial");
  blackMaterial.diffuseColor = new lBabyon.Color3(0.0, 0.0, 0.0);
  blackMaterial.alpha = alpha;

  const grayMaterial = new lBabyon.StandardMaterial("grayMaterial");
  grayMaterial.diffuseColor = new lBabyon.Color3(0.3, 0.3, 0.3);
  grayMaterial.alpha = alpha;

  const darkGrayMaterial = new lBabyon.StandardMaterial("darkGrayMaterial");
  darkGrayMaterial.diffuseColor = new lBabyon.Color3(0.1, 0.1, 0.1);
  darkGrayMaterial.alpha = alpha;

  const rightGrayMaterial = new lBabyon.StandardMaterial("rightGrayMaterial");
  rightGrayMaterial.diffuseColor = new lBabyon.Color3(0.6, 0.6, 0.6);
  rightGrayMaterial.alpha = alpha;

  return {
    red: redMaterial,
    blue: blueMaterial,
    green: greenMaterial,
    yellow: yellowMaterial,
    white: whiteMaterial,
    black: blackMaterial,
    gray: grayMaterial,
    darkGray: darkGrayMaterial,
    rightGray: rightGrayMaterial,
  }[color] || whiteMaterial;
}

function createPanel1(
  lBabyon: BABYLON,
  scene: BABYLON.Scene,
  position: BABYLON.Vector3,
  rotation: BABYLON.Vector3,
  thickness: number,
  alpha: number,
) {
  const panel = lBabyon.MeshBuilder.CreateBox("panel", {
    width: 8,
    height: thickness,
    depth: 5,
  }, scene);
  panel.material = getMaterial(lBabyon, "gray", alpha);

  const panel2 = lBabyon.MeshBuilder.CreateBox("panel", {
    width: 4.5,
    height: 20 * thickness,
    depth: 4.5,
  }, scene);
  panel2.position = new lBabyon.Vector3(0.5, 0, 0);

  const panel3 = lBabyon.MeshBuilder.CreateBox("panel", {
    width: 6,
    height: 20 * thickness,
    depth: 2,
  }, scene);
  panel3.position = new lBabyon.Vector3(2.5, 0, 1.5);

  const subCSG = lBabyon.CSG.FromMesh(panel)
    .subtract(
      lBabyon.CSG.FromMesh(panel2),
    )
    .subtract(
      lBabyon.CSG.FromMesh(panel3),
    );

  panel.dispose();
  panel2.dispose();
  panel3.dispose();

  const newMesh = subCSG.toMesh(
    "csg",
    getMaterial(lBabyon, "gray", alpha),
    scene,
    true,
  );
  newMesh.position = position;
  newMesh.rotation = rotation;

  const physics = new lBabyon.PhysicsAggregate(
    newMesh,
    lBabyon.PhysicsShapeType.MESH,
    { mass: 1, friction: 0.2 },
    scene,
  );

  return physics;
}

function createPanel2(
  lBabyon: BABYLON,
  scene: BABYLON.Scene,
  position: BABYLON.Vector3,
  rotation: BABYLON.Vector3,
  thickness: number,
  alpha: number,
) {
  const panel = lBabyon.MeshBuilder.CreateBox("panel", {
    width: 7.5,
    height: thickness,
    depth: 5,
  }, scene);
  panel.material = getMaterial(lBabyon, "gray", alpha);

  const panel2 = lBabyon.MeshBuilder.CreateBox("panel", {
    width: 2.5,
    height: 20 * thickness,
    depth: 4.5,
  }, scene);
  panel2.position = new lBabyon.Vector3(1.5, 0, 0);

  const panel3 = lBabyon.MeshBuilder.CreateBox("panel", {
    width: 3.5,
    height: 18 * thickness,
    depth: 5.5,
  }, scene);
  panel3.position = new lBabyon.Vector3(-1, 0, 0.5);

  const panel4 = lBabyon.MeshBuilder.CreateBox("panel", {
    width: 4,
    height: 16 * thickness,
    depth: 4.5,
  }, scene);
  panel4.position = new lBabyon.Vector3(0, 0, 0);

  const panel5 = lBabyon.MeshBuilder.CreateBox("panel", {
    width: 6,
    height: 14 * thickness,
    depth: 2.25,
  }, scene);
  panel5.position = new lBabyon.Vector3(0, 0, 1);

  const panel6 = lBabyon.MeshBuilder.CreateBox("panel", {
    width: 4,
    height: 24 * thickness,
    depth: 4,
  }, scene);
  panel6.position = new lBabyon.Vector3(-4, 0, 1);

  const subCSG = lBabyon.CSG.FromMesh(panel)
    .subtract(
      lBabyon.CSG.FromMesh(panel2),
    )
    .subtract(
      lBabyon.CSG.FromMesh(panel3),
    )
    .subtract(
      lBabyon.CSG.FromMesh(panel4),
    )
    .subtract(
      lBabyon.CSG.FromMesh(panel5),
    )
    .subtract(
      lBabyon.CSG.FromMesh(panel6),
    );

  panel.dispose();
  panel2.dispose();
  panel3.dispose();
  panel4.dispose();
  panel5.dispose();
  panel6.dispose();

  const newMesh = subCSG.toMesh(
    "csg",
    getMaterial(lBabyon, "blue", alpha),
    scene,
    true,
  );
  newMesh.position = position;
  newMesh.rotation = rotation;

  const physics = new lBabyon.PhysicsAggregate(
    newMesh,
    lBabyon.PhysicsShapeType.MESH,
    { mass: 1, friction: 0.2 },
    scene,
  );

  return physics;
}

function createPanel3(
  lBabyon: BABYLON,
  scene: BABYLON.Scene,
  position: BABYLON.Vector3,
  rotation: BABYLON.Vector3,
  thickness: number,
  alpha: number,
) {
  const panel = lBabyon.MeshBuilder.CreateBox("panel", {
    width: 8,
    height: thickness,
    depth: 5,
  }, scene);
  panel.material = getMaterial(lBabyon, "gray", alpha);

  const panel2 = lBabyon.MeshBuilder.CreateCylinder("panel", {
    height: thickness,
    diameter: 1,
    tessellation: 12,
  }, scene);
  panel2.position = new lBabyon.Vector3(0, 0, -1);

  const subCSG = lBabyon.CSG.FromMesh(panel).subtract(
    lBabyon.CSG.FromMesh(panel2),
  );
  panel.dispose();
  panel2.dispose();

  const newMesh = subCSG.toMesh(
    "csg",
    getMaterial(lBabyon, "red", alpha),
    scene,
    true,
  );
  newMesh.position = position;
  newMesh.rotation = rotation;

  const physics = new lBabyon.PhysicsAggregate(
    newMesh,
    lBabyon.PhysicsShapeType.MESH,
    { mass: 1, friction: 2 },
    scene,
  );

  return physics;
}

function createDisc(
  lBabyon: BABYLON,
  scene: BABYLON.Scene,
  position: BABYLON.Vector3,
  rotation: BABYLON.Vector3,
  height: number,
  diameter: number,
  tessellation: number,
  alpha: number,
) {
  const point = lBabyon.MeshBuilder.CreateCylinder("point", {
    height,
    diameter,
    tessellation,
  }, scene);
  point.material = getMaterial(lBabyon, "gray", alpha);
  point.position = position;
  point.rotation = rotation;

  const physics = new lBabyon.PhysicsAggregate(
    point,
    lBabyon.PhysicsShapeType.CYLINDER,
    { mass: 0.1, friction: 0.2 },
    scene,
  );

  return {
    mesh: point,
    physics,
  };
}

function createBone(
  lBabyon: BABYLON,
  scene: BABYLON.Scene,
  position: BABYLON.Vector3,
  rotation: BABYLON.Vector3,
  height: number,
  width: number,
  depth: number,
  alpha: number,
) {
  const point = lBabyon.MeshBuilder.CreateBox(
    "bone",
    { height, width, depth },
    scene,
  );
  point.material = getMaterial(lBabyon, "white", alpha);
  point.position = position;
  point.rotation = rotation;

  const physics = new lBabyon.PhysicsAggregate(
    point,
    lBabyon.PhysicsShapeType.BOX,
    { mass: 1, friction: 0.2 },
    scene,
  );

  return physics;
}

export function createChebyshevLinkageUnit(
  lBabyon: BABYLON,
  scene: BABYLON.Scene,
  options?: {
    position?: BABYLON.Vector3;
    rotation?: BABYLON.Vector3;
    thickness?: number;
    alpha?: number;
  },
) {
  const basePosition = options?.position?.clone() || new lBabyon.Vector3.Zero();
  const baseRotation = options?.rotation?.clone() || new lBabyon.Vector3.Zero();
  const thickness = options?.thickness || 0.2;
  const alpha = options?.alpha || 0;

  const baseRotationMatrix = lBabyon.Matrix.RotationYawPitchRoll(
    baseRotation.y,
    baseRotation.x,
    baseRotation.z,
  );
  const baseRotationQuaternion = lBabyon.Quaternion.FromRotationMatrix(
    baseRotationMatrix,
  );

  // panel1
  const panel1Position = basePosition.clone();
  const panel1Rotation = baseRotation.clone();
  const panel1 = createPanel1(
    lBabyon,
    scene,
    panel1Position,
    panel1Rotation,
    thickness,
    alpha,
  );

  // Panel2
  const panel2Position = lBabyon.Vector3.TransformCoordinates(
    new lBabyon.Vector3(0, -1 * thickness, 0),
    baseRotationMatrix,
  ).add(basePosition);
  const panel2Rotation = baseRotation.clone();
  const panel2 = createPanel2(
    lBabyon,
    scene,
    panel2Position,
    panel2Rotation,
    thickness,
    alpha,
  );

  // Panel3
  const panel3Position = lBabyon.Vector3.TransformCoordinates(
    new lBabyon.Vector3(0, -2 * thickness, 0),
    baseRotationMatrix,
  ).add(basePosition);
  const panel3Rotation = baseRotation.clone();
  const panel3 = createPanel3(
    lBabyon,
    scene,
    panel3Position,
    panel3Rotation,
    thickness,
    alpha,
  );

  // Panel3
  const panel3FPosition = lBabyon.Vector3.TransformCoordinates(
    new lBabyon.Vector3(0, thickness, 0),
    baseRotationMatrix,
  ).add(basePosition);
  const panel3FRotation = baseRotation.clone();
  const panel3F = createPanel3(
    lBabyon,
    scene,
    panel3FPosition,
    panel3FRotation,
    thickness,
    alpha,
  );

  // 動力
  const powerPosition = lBabyon.Vector3.TransformCoordinates(
    new lBabyon.Vector3(0, -thickness, -1),
    baseRotationMatrix,
  ).add(basePosition);
  const powerRotation = baseRotation.clone();
  const power = createDisc(
    lBabyon,
    scene,
    powerPosition,
    powerRotation,
    thickness,
    2,
    12,
    alpha,
  );
  power.physics.body.mass = 10;

  // P1
  const p1Position = lBabyon.Vector3.TransformCoordinates(
    new lBabyon.Vector3(0, 0, 0),
    baseRotationMatrix,
  ).add(basePosition);
  const p1Rotation = baseRotation.clone();
  const p1 = createDisc(
    lBabyon,
    scene,
    p1Position,
    p1Rotation,
    thickness,
    .5,
    12,
    alpha,
  );

  // P2
  const p2Position = lBabyon.Vector3.TransformCoordinates(
    new lBabyon.Vector3(2, -thickness, -1),
    baseRotationMatrix,
  ).add(basePosition);
  const p2Rotation = baseRotation.clone();
  const p2 = createDisc(
    lBabyon,
    scene,
    p2Position,
    p2Rotation,
    thickness,
    .5,
    12,
    alpha,
  );

  // P3
  const p3Position = lBabyon.Vector3.TransformCoordinates(
    new lBabyon.Vector3(-2, -thickness, -1),
    baseRotationMatrix,
  ).add(basePosition);
  const p3Rotation = baseRotation.clone();
  const p3 = createDisc(
    lBabyon,
    scene,
    p3Position,
    p3Rotation,
    thickness,
    .5,
    12,
    alpha,
  );

  // P4

  const p4Position = lBabyon.Vector3.TransformCoordinates(
    new lBabyon.Vector3(2, -thickness, 1.5),
    baseRotationMatrix,
  ).add(basePosition);
  const p4Rotation = baseRotation.clone();

  const p4 = createDisc(
    lBabyon,
    scene,
    p4Position,
    p4Rotation,
    thickness,
    .5,
    12,
    alpha,
  );

  // P5

  const p5Position = lBabyon.Vector3.TransformCoordinates(
    new lBabyon.Vector3(-2, -thickness, 1.5),
    baseRotationMatrix,
  ).add(basePosition);
  const p5Rotation = baseRotation.clone();
  const p5 = createDisc(
    lBabyon,
    scene,
    p5Position,
    p5Rotation,
    thickness,
    .5,
    12,
    alpha,
  );

  // P6
  const p6Position = lBabyon.Vector3.TransformCoordinates(
    new lBabyon.Vector3(4, 0, 3),
    baseRotationMatrix,
  ).add(basePosition);
  const p6Rotation = baseRotation.clone();

  const p6 = createDisc(
    lBabyon,
    scene,
    p6Position,
    p6Rotation,
    2 * thickness,
    .5,
    12,
    alpha,
  );

  // P7
  const p7Position = lBabyon.Vector3.TransformCoordinates(
    new lBabyon.Vector3(0, -thickness, 3),
    baseRotationMatrix,
  ).add(basePosition);
  const p7Rotation = baseRotation.clone();
  const p7 = createDisc(
    lBabyon,
    scene,
    p7Position,
    p7Rotation,
    thickness,
    .5,
    12,
    alpha,
  );

  // B2
  const b2Position = lBabyon.Vector3.TransformCoordinates(
    new lBabyon.Vector3(2, -thickness, 0.25),
    baseRotationMatrix,
  ).add(basePosition);
  const b2Rotation = baseRotation.clone();
  const b2LocalRotation = new lBabyon.Vector3(0, 0, 0);

  const b2LocalRotationQuaternion = BABYLON.Quaternion.RotationYawPitchRoll(
    b2LocalRotation.y,
    b2LocalRotation.x,
    b2LocalRotation.z,
  );

  const combinedB2RotationQuaternion = baseRotationQuaternion.multiply(
    b2LocalRotationQuaternion,
  );

  const combinedB2Rotation = combinedB2RotationQuaternion.toEulerAngles();

  b2Rotation.copyFrom(combinedB2Rotation);

  const b2 = createBone(
    lBabyon,
    scene,
    b2Position,
    b2Rotation,
    thickness,
    0.2,
    2.2,
    alpha,
  );

  // B3
  const b3Position = lBabyon.Vector3.TransformCoordinates(
    new lBabyon.Vector3(2, 0, 1.5),
    baseRotationMatrix,
  ).add(basePosition);

  const b3Rotation = baseRotation.clone();
  const b3LocalRotation = new lBabyon.Vector3(0, Math.atan(2 / 1.5), 0);

  const b3LocalRotationQuaternion = BABYLON.Quaternion.RotationYawPitchRoll(
    b3LocalRotation.y,
    b3LocalRotation.x,
    b3LocalRotation.z,
  );

  const combinedB3RotationQuaternion = baseRotationQuaternion.multiply(
    b3LocalRotationQuaternion,
  );

  const combinedB3Rotation = combinedB3RotationQuaternion.toEulerAngles();

  b3Rotation.copyFrom(combinedB3Rotation);

  const b3 = createBone(
    lBabyon,
    scene,
    b3Position,
    b3Rotation,
    thickness,
    0.2,
    4.7,
    alpha,
  );

  // B4
  const b4Position = lBabyon.Vector3.TransformCoordinates(
    new lBabyon.Vector3(-2, -thickness, 0.25),
    baseRotationMatrix,
  ).add(basePosition);

  const b4Rotation = baseRotation.clone();
  const b4LocalRotation = new lBabyon.Vector3(0, 0, 0);

  const b4LocalRotationQuaternion = BABYLON.Quaternion.RotationYawPitchRoll(
    b4LocalRotation.y,
    b4LocalRotation.x,
    b4LocalRotation.z,
  );

  const combinedB4RotationQuaternion = baseRotationQuaternion.multiply(
    b4LocalRotationQuaternion,
  );

  const combinedB4Rotation = combinedB4RotationQuaternion.toEulerAngles();

  b4Rotation.copyFrom(combinedB4Rotation);

  const b4 = createBone(
    lBabyon,
    scene,
    b4Position,
    b4Rotation,
    thickness,
    0.2,
    2.2,
    alpha,
  );

  // B5
  const b5Position = lBabyon.Vector3.TransformCoordinates(
    new lBabyon.Vector3(0, -thickness, 1.5),
    baseRotationMatrix,
  ).add(basePosition);

  const b5Rotation = baseRotation.clone();
  const b5LocalRotation = new lBabyon.Vector3(0, 0, 0);

  const b5LocalRotationQuaternion = BABYLON.Quaternion.RotationYawPitchRoll(
    b5LocalRotation.y,
    b5LocalRotation.x,
    b5LocalRotation.z,
  );

  const combinedB5RotationQuaternion = baseRotationQuaternion.multiply(
    b5LocalRotationQuaternion,
  );

  const combinedB5Rotation = combinedB5RotationQuaternion.toEulerAngles();

  b5Rotation.copyFrom(combinedB5Rotation);

  const b5 = createBone(
    lBabyon,
    scene,
    b5Position,
    b5Rotation,
    thickness,
    3.7,
    0.2,
    alpha,
  );

  // B6
  const b6Position = lBabyon.Vector3.TransformCoordinates(
    new lBabyon.Vector3(-1, -thickness, 2.25),
    baseRotationMatrix,
  ).add(basePosition);

  const b6Rotation = baseRotation.clone();
  const b6LocalRotation = new lBabyon.Vector3(0, Math.atan(2 / 1.5), 0);

  const b6LocalRotationQuaternion = BABYLON.Quaternion.RotationYawPitchRoll(
    b6LocalRotation.y,
    b6LocalRotation.x,
    b6LocalRotation.z,
  );

  const combinedB6RotationQuaternion = baseRotationQuaternion.multiply(
    b6LocalRotationQuaternion,
  );

  const combinedB6Rotation = combinedB6RotationQuaternion.toEulerAngles();

  b6Rotation.copyFrom(combinedB6Rotation);

  const b6 = createBone(
    lBabyon,
    scene,
    b6Position,
    b6Rotation,
    thickness,
    0.2,
    2.2,
    alpha,
  );

  // B7
  const b7Position = lBabyon.Vector3.TransformCoordinates(
    new lBabyon.Vector3(2, -thickness, 3),
    baseRotationMatrix,
  ).add(basePosition);

  const b7Rotation = baseRotation.clone();
  const b7LocalRotation = new lBabyon.Vector3(0, 0, 0);

  const b7LocalRotationQuaternion = BABYLON.Quaternion.RotationYawPitchRoll(
    b7LocalRotation.y,
    b7LocalRotation.x,
    b7LocalRotation.z,
  );

  const combinedB7RotationQuaternion = baseRotationQuaternion.multiply(
    b7LocalRotationQuaternion,
  );

  const combinedB7Rotation = combinedB7RotationQuaternion.toEulerAngles();

  b6Rotation.copyFrom(combinedB7Rotation);
  const b7 = createBone(
    lBabyon,
    scene,
    b7Position,
    b7Rotation,
    thickness,
    3.7,
    0.2,
    alpha,
  );

  const panel3ToPanel1 = new BABYLON.LockConstraint(
    new BABYLON.Vector3(0, 2 * thickness, 0),
    new BABYLON.Vector3(0, 0, 0),
    new BABYLON.Vector3(0, 1, 0),
    new BABYLON.Vector3(0, 1, 0),
    scene,
  );
  panel3.body.addConstraint(panel1.body, panel3ToPanel1);

  const panel3FToPanel1 = new BABYLON.LockConstraint(
    new BABYLON.Vector3(0, -thickness, 0),
    new BABYLON.Vector3(0, 0, 0),
    new BABYLON.Vector3(0, 1, 0),
    new BABYLON.Vector3(0, 1, 0),
    scene,
  );
  panel3F.body.addConstraint(panel1.body, panel3FToPanel1);

  const panel2ToPanel1 = new BABYLON.LockConstraint(
    new BABYLON.Vector3(0, 1 * thickness, 0),
    new BABYLON.Vector3(0, 0, 0),
    new BABYLON.Vector3(0, 1, 0),
    new BABYLON.Vector3(0, 1, 0),
    scene,
  );
  panel2.body.addConstraint(panel1.body, panel2ToPanel1);

  const powerToPanel1 = new BABYLON.HingeConstraint(
    new BABYLON.Vector3(0, thickness, 0),
    new BABYLON.Vector3(0, 0, -1),
    new BABYLON.Vector3(0, 1, 0),
    new BABYLON.Vector3(0, 1, 0),
    scene,
  );
  power.physics.body.addConstraint(panel1.body, powerToPanel1);

  const p1ToPower = new BABYLON.LockConstraint(
    new BABYLON.Vector3(0, thickness, 1),
    new BABYLON.Vector3(0, 0, 0),
    new BABYLON.Vector3(0, 1, 0),
    new BABYLON.Vector3(0, 1, 0),
    scene,
  );
  power.physics.body.addConstraint(p1.physics.body, p1ToPower);

  const p2ToPanel1 = new BABYLON.HingeConstraint(
    new BABYLON.Vector3(0, 0, 0),
    new BABYLON.Vector3(2, -1 * thickness, -1),
    new BABYLON.Vector3(0, 1, 0),
    new BABYLON.Vector3(0, 1, 0),
    scene,
  );
  p2.physics.body.addConstraint(panel1.body, p2ToPanel1);

  const p3ToPanel1 = new BABYLON.HingeConstraint(
    new BABYLON.Vector3(0, 0, 0),
    new BABYLON.Vector3(-2, -1 * thickness, -1),
    new BABYLON.Vector3(0, 1, 0),
    new BABYLON.Vector3(0, 1, 0),
    scene,
  );
  p3.physics.body.addConstraint(panel1.body, p3ToPanel1);

  const b2ToP2 = new BABYLON.LockConstraint(
    new BABYLON.Vector3(0, 0, -1.25),
    new BABYLON.Vector3(0, 0, 0),
    new BABYLON.Vector3(0, 1, 0),
    new BABYLON.Vector3(0, 1, 0),
    scene,
  );
  b2.body.addConstraint(p2.physics.body, b2ToP2);

  const b3ToP1 = new BABYLON.HingeConstraint(
    new BABYLON.Vector3(0, 0, -2.5),
    new BABYLON.Vector3(0, 0, 0),
    new BABYLON.Vector3(0, 1, 0),
    new BABYLON.Vector3(0, 1, 0),
    scene,
  );
  b3.body.addConstraint(p1.physics.body, b3ToP1);

  const b3ToP4 = new BABYLON.HingeConstraint(
    new BABYLON.Vector3(0, 0, 0),
    new BABYLON.Vector3(0, 1 * thickness, 0),
    new BABYLON.Vector3(0, 1, 0),
    new BABYLON.Vector3(0, 1, 0),
    scene,
  );
  b3.body.addConstraint(p4.physics.body, b3ToP4);

  const p4ToB2 = new BABYLON.HingeConstraint(
    new BABYLON.Vector3(0, 0, 0),
    new BABYLON.Vector3(0, 0, 1.25),
    new BABYLON.Vector3(0, 1, 0),
    new BABYLON.Vector3(0, 1, 0),
    scene,
  );
  p4.physics.body.addConstraint(b2.body, p4ToB2);

  const b4ToP3 = new BABYLON.HingeConstraint(
    new BABYLON.Vector3(0, 0, -1.25),
    new BABYLON.Vector3(0, 0, 0),
    new BABYLON.Vector3(0, 1, 0),
    new BABYLON.Vector3(0, 1, 0),
    scene,
  );
  b4.body.addConstraint(p3.physics.body, b4ToP3);

  const p5ToB4 = new BABYLON.HingeConstraint(
    new BABYLON.Vector3(0, 0, 0),
    new BABYLON.Vector3(0, 0, 1.25),
    new BABYLON.Vector3(0, 1, 0),
    new BABYLON.Vector3(0, 1, 0),
    scene,
  );
  p5.physics.body.addConstraint(b4.body, p5ToB4);

  const b5ToP4 = new BABYLON.HingeConstraint(
    new BABYLON.Vector3(2, 0, 0),
    new BABYLON.Vector3(0, 0, 0),
    new BABYLON.Vector3(0, 1, 0),
    new BABYLON.Vector3(0, 1, 0),
    scene,
  );
  b5.body.addConstraint(p4.physics.body, b5ToP4);

  const p5ToB5 = new BABYLON.HingeConstraint(
    new BABYLON.Vector3(0, 0, 0),
    new BABYLON.Vector3(-2, 0, 0),
    new BABYLON.Vector3(0, 1, 0),
    new BABYLON.Vector3(0, 1, 0),
    scene,
  );
  p5.physics.body.addConstraint(b5.body, p5ToB5);

  const b6ToP5 = new BABYLON.HingeConstraint(
    new BABYLON.Vector3(0, 0, -1.25),
    new BABYLON.Vector3(0, 0, 0),
    new BABYLON.Vector3(0, 1, 0),
    new BABYLON.Vector3(0, 1, 0),
    scene,
  );
  b6.body.addConstraint(p5.physics.body, b6ToP5);

  const p7ToB6 = new BABYLON.HingeConstraint(
    new BABYLON.Vector3(0, 0, 0),
    new BABYLON.Vector3(0, 0, 1.25),
    new BABYLON.Vector3(0, 1, 0),
    new BABYLON.Vector3(0, 1, 0),
    scene,
  );
  p7.physics.body.addConstraint(b6.body, p7ToB6);

  const b7ToP7 = new BABYLON.HingeConstraint(
    new BABYLON.Vector3(-2, 0, 0),
    new BABYLON.Vector3(0, 0, 0),
    new BABYLON.Vector3(0, 1, 0),
    new BABYLON.Vector3(0, 1, 0),
    scene,
  );
  b7.body.addConstraint(p7.physics.body, b7ToP7);

  const p6ToB7 = new BABYLON.HingeConstraint(
    new BABYLON.Vector3(0, -.5 * thickness, 0),
    new BABYLON.Vector3(2, 0, 0),
    new BABYLON.Vector3(0, 1, 0),
    new BABYLON.Vector3(0, 1, 0),
    scene,
  );
  p6.physics.body.addConstraint(b7.body, p6ToB7);

  const p6ToB3 = new BABYLON.HingeConstraint(
    new BABYLON.Vector3(0, .5 * thickness, 0),
    new BABYLON.Vector3(0, 0, 2.5),
    new BABYLON.Vector3(0, 1, 0),
    new BABYLON.Vector3(0, 1, 0),
    scene,
  );
  p6.physics.body.addConstraint(b3.body, p6ToB3);

  function drive(value: number) {
    const f = new lBabyon.Vector3(0, value, 0);
    const m = power.mesh.getWorldMatrix();
    const nf = lBabyon.Vector3.TransformNormal(f, m);
    power.physics.body.setAngularVelocity(nf);
  }

  return {
    power,
    drive,
  };
}
