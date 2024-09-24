import "@h5web/lib/dist/styles.css";

import React, { useState } from "react";
import ndarray from "ndarray";
import {
  DefaultInteractions,
  HeatmapVis,
  Line,
  VisCanvas,
  getDomain,
} from "@h5web/lib";

// Initialise source 2D array
const values = [
  [0, 1, 2],
  [3, 4, 5],
];

// Flatten source array
const flatValues: number[] = values.flat(1);

// Convert to ndarray and get domain
const dataArray = ndarray(flatValues, [2, 3]);
const domain = getDomain(dataArray);

/* LineVis plotting
 const xvalues = Array.from({ length: 360 }, (x, i) => i);
 const yvalues = Array.from({ length: 360 }, (x, i) => Math.sin(i));

 const linePlot = [xvalues, yvalues];

 const flatValuesLine: number[] = linePlot.flat(Infinity) as number[];

 // We need a way to programatically defin the x-values and y-values, which will then be passed into the line component.
let xValues = [];
 let yValues = [];
 let xDomainRange = 360;

 for (let i = 0; i <= xDomainRange; i++) {
   xValues.push(i);
 }

 yValues = xValues.map((element) => {
   return Math.sin(element * (Math.PI / 180));
 });

 const arrayOfX = xValues;
 const arrayOfY = yValues;
*/

// LineVis plotting

function MyApp() {
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

  return (
    <div style={{ display: "flex", height: "30rem" }}>
      <HeatmapVis dataArray={dataArray} domain={domain} />

      <VisCanvas
        abscissaConfig={{
          showGrid: true,
          visDomain: [0, 360],
        }}
        ordinateConfig={{
          showGrid: true,
          visDomain: [-1, 1],
        }}
      >
        <DefaultInteractions />

        <Line
          abscissas={xValues}
          color="hsla(240, 100%, 50%, 1)"
          ordinates={yValues}
          visible
        />
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
