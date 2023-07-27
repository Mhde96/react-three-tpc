// Import necessary components from React and Three.js
import { RigidBody } from "@react-three/rapier"; // Component for rigid body physics simulation
import * as THREE from "three"; // Three.js library

// Function to convert an angle from degrees to radians
const angleToRadians = (angleInDeg) => (Math.PI / 180) * angleInDeg;

// Array of data defining the positions and rotations of walls
const data = [
  {
    position: [0, 0, -20],
    rotation: [0, 0, 0],
  },
  {
    position: [0, 0, 20],
    rotation: [0, 0, 0],
  },
  {
    position: [25, 0, 0],
    rotation: [0, angleToRadians(90), 0],
  },
  {
    position: [-25, 0, 0],
    rotation: [0, angleToRadians(-90), 0],
  },
];

// Walls component - creates walls and grounds using RigidBody components
export function Walls() {
  return (
    <>
      {/* Use data array to create multiple walls */}
      {data.map((item) => (
        <RigidBody
          colliders="cuboid" // Type of collider shape for the wall (a cuboid in this case)
          lockTranslations // Lock translations to prevent movement during physics simulation
          lockRotations // Lock rotations to prevent unwanted rotations during physics simulation
          position={item.position} // Position of the wall in 3D space
          rotation={item.rotation} // Rotation of the wall in 3D space
        >
          {/* 3D mesh representing the wall */}
          <mesh>
            <planeGeometry args={[50, 50]} />{" "}
            {/* Plane geometry with specified dimensions */}
            <meshNormalMaterial side={THREE.DoubleSide} />{" "}
            {/* Material for the mesh */}
          </mesh>
        </RigidBody>
      ))}
      {/* Create a ground using another RigidBody component */}
      <RigidBody
        colliders="cuboid" // Type of collider shape for the ground (a cuboid in this case)
        lockTranslations={true} // Lock translations to prevent movement during physics simulation
        lockRotations // Lock rotations to prevent unwanted rotations during physics simulation
        position={[0, -2, 0]} // Position of the ground in 3D space
        rotation={[angleToRadians(-90), 0, 0]} // Rotation of the ground in 3D space
      >
        {/* 3D mesh representing the ground */}
        <mesh receiveShadow>
          {/* Allow the ground to receive shadows */}
          <planeGeometry args={[100, 50]} />{" "}
          {/* Plane geometry with specified dimensions */}
          <meshNormalMaterial /> {/* Material for the mesh */}
        </mesh>
      </RigidBody>
      {/* Create a point light to illuminate the scene */}
      <pointLight position={[0, 10, 0]} /> {/* Position of the point light */}
    </>
  );
}
