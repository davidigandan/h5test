import React from "react";
import {
  VisCanvas,
  Line,
  DefaultInteractions,
  ResetZoomButton,
} from "@h5web/lib";
import { generatePoints } from "../utils/mathUtils";

interface TrigCanvasProps {
  mathFunction: string;
  toggleFunction: () => void;
}

const TrigCanvas: React.FC<TrigCanvasProps> = ({
  mathFunction,
  toggleFunction,
}) => {
  const [xValues, yValues] = generatePoints(mathFunction);

  return (
    <div>
      <VisCanvas
        abscissaConfig={{ showGrid: true, visDomain: [0, 360] }}
        ordinateConfig={{ showGrid: true, visDomain: [-1, 1] }}
        title="A Sine Curve"
      >
        <DefaultInteractions />
        <Line
          abscissas={xValues}
          ordinates={yValues}
          color="hsla(240, 100%, 50%, 1)"
          visible
        />
        <ResetZoomButton />
      </VisCanvas>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "2rem",
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
  );
};

export default TrigCanvas;
