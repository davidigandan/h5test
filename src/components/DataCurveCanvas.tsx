import React from "react";
import {
  VisCanvas,
  DataCurve,
  DefaultInteractions,
  GlyphType,
  CurveType,
  ResetZoomButton,
  SelectionTool,
  Box,
  SvgElement,
  SvgRect,
  Selection,
} from "@h5web/lib";
import { useState } from "react";
import { getTitleForSelection } from "../utils/utils";

const DataCurveCanvas: React.FC = () => {
  const [activeSelection, setActiveSelection] = useState<Selection | undefined>(
    undefined
  );

  return (
    <VisCanvas
      abscissaConfig={{ showGrid: true, visDomain: [0, 40] }}
      ordinateConfig={{ showGrid: true, visDomain: [0, 400] }}
      raycasterThreshold={6}
      title={getTitleForSelection(activeSelection?.data)}
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
        glyphType={GlyphType.Circle}
        color="blue"
        curveType={CurveType.LineAndGlyphs}
        visible
      />
      <ResetZoomButton />
      <SelectionTool
        validate={({ html }) => {
          return Box.fromPoints(...html).hasMinSize(0);
        }}
        onSelectionChange={setActiveSelection}
        onSelectionEnd={() => setActiveSelection(undefined)}
      >
        {({ html: htmlSelection }, _, isValid) => {
          console.log("HTML Selection:", htmlSelection);
          e;
          return (
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
          );
        }}
      </SelectionTool>
    </VisCanvas>
  );
};

export default DataCurveCanvas;
