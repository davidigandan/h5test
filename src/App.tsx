import React, { useState } from "react";
import "./styles/styles.css";
import TrigCanvas from "./components/TrigCanvas";
import DataCurveCanvas from "./components/DataCurveCanvas";
import Header from "./components/Header";

function App() {
  const [mathFunction, setMathFunction] = useState("sine");

  const toggleFunction = () => {
    setMathFunction((prev) => (prev === "sine" ? "cosine" : "sine"));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Feature 1 */}
      <Header title="Feature 1: Toggling Trig Functions" />
      <TrigCanvas mathFunction={mathFunction} toggleFunction={toggleFunction} />

      {/* Feature 2 */}
      <Header title="Feature 2: Choosing points with Selection Tool" />

      {/* Feature 3 */}
      <Header title="Feature 3: Datapoint Annotations with DataCurve" />
      <DataCurveCanvas />
    </div>
  );
}

export default App;
