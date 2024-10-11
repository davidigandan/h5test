import React from "react";
import {
  VisCanvas,
  DefaultInteractions,
  SelectionTool,
  Box,
  SvgElement,
  SvgRect,
} from "@h5web/lib";

const TestSelection: React.FC = () => {
  return (
    <VisCanvas
      abscissaConfig={{ showGrid: true, visDomain: [0, 40] }}
      ordinateConfig={{ showGrid: true, visDomain: [0, 400] }}
      title="Selection Test"
    >
      <DefaultInteractions />
      <SelectionTool
        validate={({ html }) => {
          console.log("validate called with html:", html); // Should log
          return Box.fromPoints(...html).hasMinSize(1);
        }}
        onSelectionChange={(selection) => {
          console.log("Selection Changed:", selection);
        }}
        onSelectionEnd={() => {
          console.log("Selection Ended");
        }}
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
  );
};

export default TestSelection;
