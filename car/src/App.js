// Suspense library is for smoothly loading async tasks
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import "./style.css";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

function CarShow() {
  return (
    <>
      {/* OrbitControls helps us to move the camera around a fixed point, [0, 0.35, 0] basically represents center of the screen with a slight elevation in the y-axis, maxPolarAngle defines the tilt from which we view */}
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />
      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />

      {/* mesh object is basically used to create a 3d cube in the scene, boxGeometry is the dimensions of the cube */}
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={"red"} />
      </mesh>
    </>
  );
}

function App() {
  return (
    // here we are defining fallback as null, which means while components are loading, we don't actually load something else
    <Suspense fallback={null}>
      {/* the shadows let's us have shadow casting to increase realism */}
      <Canvas shadows>
        <CarShow />
      </Canvas>
    </Suspense>
  );
}

export default App;
