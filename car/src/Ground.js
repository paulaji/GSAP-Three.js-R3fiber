import { MeshReflectorMaterial } from "@react-three/drei";

export function Ground() {
  return (
    // to rotate the plane -90degrees so that it will appear like a ground lying flat on the x-z plane, the normal oreintation was to lie on the x-y plane, but that will make the ground appear to be standing upright (weird :0)
    <mesh rotation-x={-Math.PI * 0.5} castShadow receiveShadow>
      {/* the ground plane will be of dimensions 30 width and 30 height */}
      <planeGeometry args={[30, 30]} />
      {/* applies reflecting property on the ground */}
      <MeshReflectorMaterial
        // we are using MeshReflectorMaterial to create a non-reflecting ground! how ironic :)
        envMapIntensity={0} // this sets the reflection as 0
        dithering={true} // smoother gradients
        color={[0.015, 0.015, 0.015]} // a very dark gray
        roughness={0.7} // higher the roughness, lower the reflection
        blur={[1000, 400]} // horizontal and vertical blur | blur here refers to the blurriness of the reflections
        mixBlur={30} // this refers the additional blur that happens when normal reflections and blurred reflections are blended
        mixStrength={80} // higher the this value, more pronounced will be the blending seen to us
        mixContrast={1} // contrast of the blending | higher the contrast, the blend will be more distinct
        resolution={1024} // higher the resolution, higher the quality
        mirror={0} // 0: disable mirror effect and shows reflections as they are | 1: enables mirror effect and shows inverted reflections
        depthScale={0.01} // 1/100 => 0.01 scales down the reflection making them smaller and closer to the screen (ig inorder to fit the screen)
        minDepthThreshold={0.9} // minimum depth/dist at which reflections are visible | here, 0.9 which means the reflections will only be visible when they are close to the reflective surface and at least 90% of the distance from the camera to the reflective surface
        maxDepthThreshold={1} // same as before but max depth/dist at which reflections are visible
        depthToBlurRatioBias={0.25} // 0: blur depends on distance of reflected object to reflective surface | 1: blur depends on distance between reflective surface and camera  | if we lower the amount, the reflections will appear less blurred for reflected objects from reflected surface eg: 0.25 | if we higher the amount, the reflections will appear less blurred near the camera eg: 0.75
        debug={0} // disables debug
        reflectorOffset={0.2} // to offset or slightly move the reflecting surface | by changing this, we can create ripples as like seen in water etc. | change the value based on what effect is desired
      />
    </mesh>
  );
}
