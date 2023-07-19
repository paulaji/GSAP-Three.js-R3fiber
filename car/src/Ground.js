import { MeshReflectorMaterial } from "@react-three/drei";
import { useEffect } from "react";

// to load external textures, models, images, assets
import { useLoader } from "@react-three/fiber";
// we need to impose texture/2d into 3d models, therefore, we use RepeatWrapping
import { TextureLoader, RepeatWrapping } from "three";

export function Ground() {
  // load the textures from the public dir
  // we don't need to seperately import process.env
  // we create a URL to access the image
  // in react, we usually place images in a folder inside the public directory so that the static images/files can be served properly and we use the below shown syntax to do so!
  const [roughness, normal] = useLoader(TextureLoader, [
    process.env.PUBLIC_URL + "textures/terrain-roughness.jpeg",
    process.env.PUBLIC_URL + "textures/terrain-normal.jpeg",
  ]);

  // useEffect is used to perform side effects after the component has been rendered
  // side effects usually refer to changes brought about by a function outside it's local scope
  // here, we are performing side effects on normal and roughness
  // side effect here is repeating the textures over a 3d object (3d object here is the MeshReflectorMaterial)
  // we are using useEffect here because of many factors and one key factor would be timing
  // the repeating is happening after the render of the texture is complete (otherwise it would be awkward)
  useEffect(() => {
    [normal, roughness].forEach((t) => {
      // wrapS is for horizontal wrapping
      // wrapT is for vertical wrapping
      // both S and T wrappings are usually done for 3d models, but in our case we are wrapping a 'ground' which we created in such a way that it doesn't have a thickness, but because of standard practices, we apply both wrapping
      t.wrapS = RepeatWrapping;
      t.wrapT = RepeatWrapping;
      // to set how many times the texture is repeated horizontally and vertically respectively
      t.repeat.set(5, 5);
    });
  }, [normal, roughness]);

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
