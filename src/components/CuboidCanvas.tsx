import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { MeshProps } from "@react-three/fiber";

interface CuboidProps extends MeshProps {
  color: string; // Define the color prop type
}

const Cuboid: React.FC<CuboidProps> = ({ color }) => {
  return (
    <mesh>
      <boxGeometry args={[15, 4, 4]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const CuboidCanvas: React.FC = () => {
  const [color, setColor] = useState<string>("#ff0000");

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
        <Cuboid color={color} />
      </Canvas>
    </div>
  );
};

export default CuboidCanvas;
