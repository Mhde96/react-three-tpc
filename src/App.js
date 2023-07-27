import { Environment } from "@react-three/drei"; // Provides pre-built 3D environment with lighting and shadows.
import { Canvas } from "@react-three/fiber"; // Main component for creating a WebGL canvas.
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier"; // Components for handling physics.
import { Suspense } from "react"; // Allows for using React components as fallbacks during loading.

import { Player } from "./Player"; // Importing the Player component to control the character.
import { useMouseCapture } from "./useMouseCapture"; // Importing the hook for mouse input.
import { useKeyboard } from "./useKeyboard"; // Importing the hook for keyboard input.
import { Walls } from "./Walls"; // Importing the Walls component for creating walls and grounds.
import { Ball } from "./Ball"; // Importing the Ball component for creating physics-based balls.

// Function to get player input from keyboard and mouse
function getInput(keyboard, mouse) {
  let [x, y, z] = [0, 0, 0];
  // Checking keyboard inputs to determine movement direction
  if (keyboard["s"]) z += 1.0; // Move backward
  if (keyboard["w"]) z -= 1.0; // Move forward
  if (keyboard["d"]) x += 1.0; // Move right
  if (keyboard["a"]) x -= 1.0; // Move left
  if (keyboard[" "]) y += 1.0; // Jump

  // Returning an object with the movement and look direction
  return {
    move: [x, y, z],
    look: [mouse.x / window.innerWidth, mouse.y / window.innerHeight], // Mouse look direction
    running: keyboard["Shift"], // Boolean to determine if the player is running (Shift key pressed)
  };
}

// Scene component - where the 3D scene is set up and rendered
const Scene = () => {
  const keyboard = useKeyboard(); // Hook to get keyboard input
  const mouse = useMouseCapture(); // Hook to get mouse input

  return (
    <group>
      <Ball position={[7, 8, 0]} />{" "}
      {/* Creating a physics-based ball at the specified position */}
      <Ball position={[6, 15, 0]} />{" "}
      {/* Creating another ball at a different position */}
      <Walls /> {/* Rendering walls and grounds */}
      <Player walk={2} jump={5} input={() => getInput(keyboard, mouse)} />{" "}
      {/* Creating the player character */}
    </group>
  );
};

// App component - the main component of the application
const App = () => {
  return (
    <Canvas style={{ width: "100vw", height: "100vh" }} shadows>
      {/* Creating the 3D canvas */}
      <Suspense fallback={null}>
        {/* Using Suspense to handle loading */}
        <Physics debug>
          {/* Adding physics to the scene and enabling debug mode */}
          <Scene /> {/* Rendering the 3D scene */}
        </Physics>
        <Environment preset="studio" background />{" "}
        {/* Rendering the 3D environment */}
      </Suspense>
    </Canvas>
  );
};

export default App; // Exporting the App component as the main entry point of the application
