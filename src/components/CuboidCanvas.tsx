import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { MeshProps } from "@react-three/fiber";

interface CuboidProps extends MeshProps {
  color: string; // Define the color prop type
}

const Cuboid: React.FC<CuboidProps> = ({ color, ...props }) => {
  return (
    <mesh {...props}>
      <boxGeometry args={[2, 1, 1]} />
      <meshStandardMaterial  color={color}/>
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
      <input
        type="color"
        value={color}
        onChange={handleColorChange}
        style={{ marginBottom: "20px" }}
      />
      {/* Canvas for the Cuboid */}
      <Canvas style={{ width: "400px", height: "400px" }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Cuboid color={color} />
      </Canvas>
    </div>
  );
};

export default CuboidCanvas;
