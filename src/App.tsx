import "@h5web/lib/dist/styles.css";

import { useState } from "react";

import {
  DefaultInteractions,
  Line,
  ResetZoomButton,
  VisCanvas,
  SelectionTool,
} from "@h5web/lib";

function MyApp() {
  // State Handling for function drawn
  const [mathFunction, changeMathFunction] = useState("sine");

  const toggleFunction = () => {
    changeMathFunction((prev) => {
      return prev === "sine" ? "cosine" : "sine";
    });
  };

  const generatePoints = (waveType = "sine", points = 360) => {
    const xValues = Array.from({ length: points }, (_, i) => i);
    const yValues = xValues.map((xValue) => {
      return waveType === "sine"
        ? Math.sin(xValue * (Math.PI / 180))
        : Math.cos(xValue * (Math.PI / 180));
    });
    return [xValues, yValues];
  };

  const [xValues, yValues] = generatePoints(mathFunction);

  //State Handling for points highlighted
  // const [selectedPoints, changeSelectedPoints] = useState({ x: 0, y: 0 });

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div>
        <header
          style={{
            backgroundColor: "#f0f0f0",
            padding: "1rem",
            textAlign: "center",
            position: "sticky",
            top: 0,
            zIndex: 1000,
          }}
        >
          <h2>A Demo of Features 1 & 3</h2>
        </header>
      </div>
      <br></br>
      <div>
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

          {/* Attempt at Slection Tool */}
          {/* <SelectionTool
          id="my-selection-tool"
          onSelectionStart={() => console.log("Selection started")}
          onSelectionChange={(selection, rawSelection, isValid) => {
            console.log("Selection changed:", selection, rawSelection, isValid);
          }}
          onSelectionEnd={(selection, isValid) => {
            console.log("Selection ended:", selection, isValid);
          }}
          onValidSelection={(selection) => {
            console.log("Valid selection made:", selection);
          }}
        >
          {(selection, rawSelection, isValid) => (
            <div>
              <p>Current Selection: {JSON.stringify(selection)}</p>
              <p>Raw Selection: {JSON.stringify(rawSelection)}</p>
              <p>Is Valid: {isValid ? "Yes" : "No"}</p>
            </div>
          )}
        </SelectionTool> */}
        </VisCanvas>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "1rem",
          }}
        >
          <button
            style={{
              marginTop: "1rem",
              backgroundColor: "white",
              border: "1px solid #ccc",
              padding: "10px 20px",
              cursor: "pointer",
            }}
            onClick={toggleFunction}
          >
            Toggle Wave
          </button>
        </div>
      </div>

      {/* <SelectionTool></SelectionTool> */}
    </div>
  );
}

export default MyApp;
