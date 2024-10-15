import React, { useRef, useState } from "react";
import { Canvas, MeshProps, useFrame, useThree } from "@react-three/fiber";
import { Mesh, Vector3 } from "three";
import { OrbitControls } from "@react-three/drei";
import { ResetZoomButton, useVisCanvasContext, VisCanvas } from "@h5web/lib";

// Cuboids
interface CuboidProps extends MeshProps {
  color: string;
  // isSpinning1: boolean | null;
  // isSpinning2: boolean | null;
  pixelSize: number;
}
const Cuboids: React.FC<CuboidProps> = ({
  color,
  // isSpinning1,
  // isSpinning2,
  pixelSize,
}) => {
  const meshRef1 = useRef<Mesh>(null);
  const meshRef2 = useRef<Mesh>(null);
  const meshRef3 = useRef<Mesh>(null);

  const { htmlToWorld } = useVisCanvasContext();
  const { camera } = useThree();

  useFrame(() => {
    // Handle spinning animation on box 1&2 for each render
    // if (meshRef1.current && isSpinning1) {
    //   meshRef1.current.rotation.x += 0.05;
    // }

    // if (meshRef2.current && isSpinning2) {
    //   meshRef2.current.rotation.x += 0.05;
    // }

    // Handle zoom invariance for box 3
    if (meshRef3.current) {
      const pixelVector = new Vector3(pixelSize, pixelSize, 0);

      const worldSize = htmlToWorld(camera, pixelVector);

      meshRef3.current.scale.set(worldSize.x, worldSize.y, 1);
    }
  });

  return (
    <>
      <mesh position={[-6, 0, 0]} ref={meshRef1}>
        <boxGeometry args={[4, 2, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>

      <mesh position={[6, 0, 0]} ref={meshRef2}>
        <boxGeometry args={[4, 2, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>

      <mesh position={[0, 3, 0]} ref={meshRef3}>
        <boxGeometry args={[4, 2, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </>
  );
};

// Cuboids Canvas
const CuboidCanvas: React.FC = () => {
  const [color, setColor] = useState<string>("#ff0000");
  // const [isSpinning1, setIsSpinning1] = useState(true);
  // const [isSpinning2, setIsSpinning2] = useState(true);
  const [pixelSize, setPixelSize] = useState<number>(50);

  // const handleToggleSpin1 = () => {
  //   setIsSpinning1((prevState) => !prevState);
  // };
  // const handleToggleSpin2 = () => {
  //   setIsSpinning2((prevState) => !prevState);
  // };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
  };

  const handlePixelSizeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPixelSize(parseInt(event.target.value, 10));
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <input type="color" value={color} onChange={handleColorChange} />
      {/* Canvas for the Cuboids */}

      <VisCanvas
        abscissaConfig={{
          isIndexAxis: false,
          showGrid: false,
          visDomain: [0, 3],
        }}
        ordinateConfig={{
          isIndexAxis: false,
          showGrid: false,
          visDomain: [50, 100],
        }}
      >
        {/* use viscanvas context to determine the size of the invariant component */}

        <ambientLight intensity={2} />
        <pointLight position={[10, 10, 10]} />
        <Cuboids
          color={color}
          // isSpinning1={isSpinning1}
          // isSpinning2={isSpinning2}
          pixelSize={pixelSize}
        />
        <OrbitControls
          /* enablePan={true} */ enableZoom={true} /* enableRotate={true}*/
        />
        <ResetZoomButton />
      </VisCanvas>
      {/* <button onClick={handleToggleSpin1}>
        {isSpinning1 ? "Stop Spin" : "Start Spin"}
      </button>
      <button onClick={handleToggleSpin2}>
        {isSpinning2 ? "Stop Spin" : "Start Spin"}
      </button> */}
      <label>
        Set Pixel Size for Third Box:
        <input
          type="number"
          value={pixelSize}
          onChange={handlePixelSizeChange}
          min={1}
        />
      </label>
    </div>
  );
};

export default CuboidCanvas;
