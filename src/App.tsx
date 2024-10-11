import { useState } from "react";
import "./styles/styles.css";
import TrigCanvas from "./components/TrigCanvas";
import DataCurveCanvas from "./components/DataCurveCanvas";
import Header from "./components/Header";
import CuboidCanvas from "./components/CuboidCanvas";
import TestSelection from "./components/TestSelection";

function App() {
  const [mathFunction, setMathFunction] = useState("sine");

  const toggleFunction = () => {
    setMathFunction((prev) => (prev === "sine" ? "cosine" : "sine"));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* Feature 1 */}
      <div>
        <Header title="Feature 1: Toggling Trig Functions" />
        <TrigCanvas
          mathFunction={mathFunction}
          toggleFunction={toggleFunction}
        />
      </div>
      {/* Feature 2 */}
      <div>
        {/* <Header title="Feature 2: Choosing points with Selection Tool" /> */}
      </div>

      {/* Feature 3 */}
      <div style={{ display: "grid" }}>
        <Header title="Feature 3: Point Annotations with DataCurve" />
        <DataCurveCanvas />
      </div>

      {/* Feature 4 */}
      <div>
        <Header title="Feature 4, 5 and 6: Cuboid Control" />
        <CuboidCanvas />
      </div>

      <div style={{ display: "flex", width: "500px", height: "500px" }}>
        {/* <Header title="Test Selection" /> */}
        <TestSelection />
      </div>
    </div>
  );
}

export default App;
