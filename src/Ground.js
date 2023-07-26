import { useTexture } from "@react-three/drei";
import {
  RigidBody,
  useRapier,
  HeightfieldCollider,
  CuboidCollider,
} from "@react-three/rapier";
import { useMemo } from "react";
import getPixels from "get-image-pixels";
import { PlaneGeometry } from "three";

export function Ground({ displacementScale = 1, displacementOffset = 0 }) {
  const texture = useTexture("/Heightmap.png");
  const { rapier, world } = useRapier();

  var pixels = getPixels(texture.image);
  const heights = [];
  const w = texture.image.width;
  const h = texture.image.height;

  const geo = useMemo(() => {
    for (var i = 0; i < w * h * 4; i += 4)
      heights.push((pixels[i] / 255) * displacementScale + displacementOffset);

    // create physics collider - should be replaced with HeightfieldCollider
    let rigidBody = world.createRigidBody(rapier.RigidBodyDesc.fixed());
    let colliderDesc = rapier.ColliderDesc.heightfield(
      w - 1,
      h - 1,
      new Float32Array(heights),
      { x: w * 10, y: 1.0, z: h * 10 }
    );
    world.createCollider(colliderDesc, rigidBody);

    // create mesh
    // initially tried using displacment but shader and height field hieght values were differnt
    // also order of heightfield and geo are slightly differnt, def a way to do this simpler
    const geo = new PlaneGeometry(w * 10, h * 10, w - 1, h - 1);
    const f = chunk(heights, w).reverse().flat();
    const vertices = geo.attributes.position.array;
    for (var i = 0; i < vertices.length; i++) vertices[i * 3 + 2] = f[i];
    return geo;
  }, [displacementOffset, displacementScale, texture]);

  if (!geo) return null;
  return (
    <>
      <CuboidCollider position={[0, -2, 0]} args={[50, 0.5, 20]} />
    </>
  );
}

// used to correct differing ordering between collider and mesh
function chunk(arr, size) {
  return arr.reduce(
    (acc, e, i) => (
      i % size ? acc[acc.length - 1].push(e) : acc.push([e]), acc
    ),
    []
  );
}
