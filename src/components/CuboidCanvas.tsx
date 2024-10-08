import React, { useRef, useState } from "react";
import { Canvas, MeshProps, useFrame } from "@react-three/fiber";
import { Mesh } from "three";

// Cuboid
interface CuboidProps extends MeshProps {
  color: string; // Define the color prop type
  isSpinning: boolean;
}
const Cuboid: React.FC<CuboidProps> = ({ color, isSpinning }) => {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current && isSpinning) {
      meshRef.current.rotation.x += 0.05;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[4, 2, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

// Cuboid Canvas
const CuboidCanvas: React.FC = () => {
  const [color, setColor] = useState<string>("#ff0000");
  const [isSpinning, setIsSpinning] = useState(true);
  const handleToggleSpin = () => {
    setIsSpinning((prevState) => !prevState);
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <input type="color" value={color} onChange={handleColorChange} />
      {/* Canvas for the Cuboid */}
      <Canvas style={{ width: "200px", height: "200px" }}>
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} />
        <Cuboid color={color} isSpinning={isSpinning} />
      </Canvas>
      <button onClick={handleToggleSpin}>
        {isSpinning ? "Stop Spin" : "Start Spin"}
      </button>
    </div>
  );
};

export default CuboidCanvas;
