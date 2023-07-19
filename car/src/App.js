// Suspense library is for smoothly loading async tasks
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import "./style.css";
import { OrbitControls, PerspectiveCamera, SpotLight } from "@react-three/drei";

function CarShow() {
  return (
    <>
      {/* OrbitControls helps us to move the camera around a fixed point, [0, 0.35, 0] basically represents center of the screen with a slight elevation in the y-axis, maxPolarAngle defines the tilt from which we view */}
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />
      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />

      {/* let color = new Color(0, 0, 0); */}
      {/* here, we define inside arg, what color we want and attach='background' says it should be the background color */}
      <color arg={[0, 0, 0]} attach="background" />

      {/* let spotlight = new SpotLight();
          spotlight.intensity = 1.5;
          spotlight.position.set(...)
      */}
      {/* for the spotlight, smaller the value of angle, smaller the spotlight size, which means a more focused spotlight, penumbra is when a spotlight/ray of light hits an object and the balance light around the object goes to the back, higher penumbra results in smoother transition from full intensity to lower (refer googleimages), applying a tiny shadowBias will reduce shadow acne, shadow acne is improper shadow movement along with camera movement (say, pixelated shadow movement) */}
      <SpotLight
        color={[1, 0.25, 0.7]} // pinkish-purple
        intensity={1.5}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadowBias={-0.0001}
      />
      {/* going to create another spotlight which will be cast from another position, like lights front two ends of the stage */}
      <SpotLight
        color={[0.14, 0.5, 1]} // blue shade
        intensity={2}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadowBias={-0.0001}
      />
      {/* <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={"grey"} />
      </mesh> */}
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
