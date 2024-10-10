import React, { useRef, useState } from "react";
import { Canvas, MeshProps, useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import { OrbitControls } from "@react-three/drei";
import { VisCanvas } from "@h5web/lib";

// Cuboids
interface CuboidProps extends MeshProps {
  color: string;
  isSpinning1: boolean | null;
  isSpinning2: boolean | null;
}
const Cuboids: React.FC<CuboidProps> = ({
  color,
  isSpinning1,
  isSpinning2,
}) => {
  const meshRef1 = useRef<Mesh>(null);
  const meshRef2 = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef1.current && isSpinning1) {
      meshRef1.current.rotation.x += 0.05;
    }

    if (meshRef2.current && isSpinning2) {
      meshRef2.current.rotation.x += 0.05;
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

      <mesh position={[0, 3, 0]}>
        <boxGeometry args={[4, 2, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </>
  );
};

// Cuboids Canvas
const CuboidCanvas: React.FC = () => {
  const [color, setColor] = useState<string>("#ff0000");
  const [isSpinning1, setIsSpinning1] = useState(true);
  const [isSpinning2, setIsSpinning2] = useState(true);

  const handleToggleSpin1 = () => {
    setIsSpinning1((prevState) => !prevState);
  };
  const handleToggleSpin2 = () => {
    setIsSpinning2((prevState) => !prevState);
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <input type="color" value={color} onChange={handleColorChange} />
      {/* Canvas for the Cuboids */}

      <VisCanvas
        abscissaConfig={{
          isIndexAxis: true,
          showGrid: true,
          visDomain: [0, 3],
        }}
        ordinateConfig={{
          isIndexAxis: true,
          showGrid: true,
          visDomain: [50, 100],
        }}
      >

        {/* use viscanvas context to determin the size of the invariant component */}
        <ambientLight intensity={2} />
        <pointLight position={[10, 10, 10]} />
        <Cuboids
          color={color}
          isSpinning1={isSpinning1}
          isSpinning2={isSpinning2}
        />
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      </VisCanvas>
      <button onClick={handleToggleSpin1}>
        {isSpinning1 ? "Stop Spin" : "Start Spin"}
      </button>
      <button onClick={handleToggleSpin2}>
        {isSpinning2 ? "Stop Spin" : "Start Spin"}
      </button>
    </div>
  );
};

export default CuboidCanvas;
