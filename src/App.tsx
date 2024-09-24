import "@h5web/lib/dist/styles.css";

import { useState } from "react";

import {
  DefaultInteractions,
  Line,
  ResetZoomButton,
  SelectionTool,
  VisCanvas,
} from "@h5web/lib";

function MyApp() {
  // State Handling for function drawn
  const [mathFunction, changeMathFunction] = useState("sine");

  let toggleFunction = () => {
    changeMathFunction((prev) => {
      return prev === "sine" ? "cosine" : "sine";
    });
  };

  const generatePoints = (waveType = "sine", points = 360) => {
    let xValues = Array.from({ length: points }, (_, i) => i);
    let yValues = xValues.map((xValue) => {
      return waveType === "sine"
        ? Math.sin(xValue * (Math.PI / 180))
        : Math.cos(xValue * (Math.PI / 180));
    });
    return [xValues, yValues];
  };

  const [xValues, yValues] = generatePoints(mathFunction);

  //State Handling for points highlighted
  const [selectedPoints, changeSelectedPoints] = useState({ x: 0, y: 0 });

  return (
    <div style={{ display: "flex", height: "30rem" }}>
      <VisCanvas
        abscissaConfig={{
          showGrid: true,
          visDomain: [0, 360],
        }}
        ordinateConfig={{
          showGrid: true,
          visDomain: [-1, 1],
        }}
        title="H5Web/lib Demo with Trig Functions"
      >
        <DefaultInteractions />

        <Line
          abscissas={xValues}
          color="hsla(240, 100%, 50%, 1)"
          ordinates={yValues}
          visible
        />
        <ResetZoomButton />
      </VisCanvas>

      <button
        style={{
          position: "absolute",
          top: "900px",
          left: "900px",
          zIndex: 1,
          backgroundColor: "white",
          border: "1px solid #ccc",
          padding: "5px 10px",
          cursor: "pointer",
        }}
        onClick={toggleFunction}
      >
        Toggle Wave
      </button>
    </div>
  );
}

export default MyApp;
