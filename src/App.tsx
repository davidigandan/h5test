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
      <Header title="A Demo of Feature 1: Toggling Trig Functions" />
      <TrigCanvas mathFunction={mathFunction} toggleFunction={toggleFunction} />
      <Header title="A Demo of Feature 3: Datapoint Annotations with DataCurve" />
      <DataCurveCanvas />
    </div>
  );
}

export default App;
