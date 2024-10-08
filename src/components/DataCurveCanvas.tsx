import React from "react";
import {
  VisCanvas,
  DataCurve,
  DefaultInteractions,
  ResetZoomButton,
} from "@h5web/lib";

const DataCurveCanvas: React.FC = () => {
  return (
    <VisCanvas
      abscissaConfig={{ showGrid: true, visDomain: [0, 40] }}
      ordinateConfig={{ showGrid: true, visDomain: [0, 400] }}
      raycasterThreshold={6}
      title="Choose a Datapoint"
    >
      <DefaultInteractions />
      <DataCurve
        abscissas={[
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
          20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
          37, 38, 39, 40,
        ]}
        ordinates={[
          400, 361, 324, 289, 256, 225, 196, 169, 144, 121, 100, 81, 64, 49, 36,
          25, 16, 9, 4, 1, 0, 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144,
          169, 196, 225, 256, 289, 324, 361, 400,
        ]}
        glyphType="Circle"
        color="blue"
        curveType="LineAndGlyphs"
        visible
        onDataPointClick={(index, evt) => console.log("trigger")}
      />
      <ResetZoomButton />
    </VisCanvas>
  );
};

export default DataCurveCanvas;
