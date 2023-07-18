// Suspense library is for smoothly loading async tasks
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import "./style.css";

function CarShow() {
  return null;
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
