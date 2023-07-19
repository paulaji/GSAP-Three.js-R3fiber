import { MeshReflectorMaterial } from "@react-three/drei";

export function Ground() {
  return (
    // to rotate the plane -90degrees so that it will appear like a ground lying flat on the x-z plane, the normal oreintation was to lie on the x-y plane, but that will make the ground appear to be standing upright (weird :0)
    <mesh rotation-x={-Math.PI * 0.5} castShadow receiveShadow>
      {/* the ground plane will be of dimensions 30 width and 30 height */}
      <planeGeometry args={[30, 30]} />
      {/* applies reflecting property on the ground */}
      <MeshReflectorMaterial />
    </mesh>
  );
}
