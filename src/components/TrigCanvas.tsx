import React, { useState } from "react";
import {
  VisCanvas,
  Line,
  DefaultInteractions,
  ResetZoomButton,
  SelectionTool,
  SvgElement,
  SvgRect,
  Box,
  Selection,
} from "@h5web/lib";
import { generatePoints } from "../utils/mathUtils";
import { getTitleForSelection } from "../utils/utils.ts";

interface TrigCanvasProps {
  mathFunction: string;
  toggleFunction: () => void;
}

const TrigCanvas: React.FC<TrigCanvasProps> = ({
  mathFunction,
  toggleFunction,
}) => {
  const [xValues, yValues] = generatePoints(mathFunction);

  const [activeSelection, setActiveSelection] = useState<Selection | undefined>(
    undefined
  );

  return (
    <div>
      <VisCanvas
        abscissaConfig={{ showGrid: true, visDomain: [0, 360] }}
        ordinateConfig={{ showGrid: true, visDomain: [-1, 1] }}
        title={getTitleForSelection(activeSelection?.data)}
      >
        <DefaultInteractions />
        <Line
          abscissas={xValues}
          ordinates={yValues}
          color="hsla(240, 100%, 50%, 1)"
          visible
        />
        <ResetZoomButton />

        <SelectionTool
          validate={({ html }) => Box.fromPoints(...html).hasMinSize(50)}
          onSelectionChange={setActiveSelection}
          onSelectionEnd={() => setActiveSelection(undefined)}
        >
          {({ html: htmlSelection }, _, isValid) => (
            <SvgElement>
              <SvgRect
                coords={htmlSelection}
                fill={isValid ? "teal" : "orangered"}
                fillOpacity={0.5}
                stroke={isValid ? "teal" : "orangered"}
                strokeWidth={2}
                strokePosition="inside"
              />
            </SvgElement>
          )}
        </SelectionTool>
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
