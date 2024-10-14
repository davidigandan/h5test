import {
  Rect,
  ResetZoomButton,
  SelectionTool,
  SvgElement,
  SvgRect,
  VisCanvas,
  Zoom,
  Selection,
  Pan,
} from "@h5web/lib";
import { useThrottledState } from "@react-hookz/web";

function getTitleForSelection(selection: Rect | undefined) {
  if (!selection) {
    return "No selection";
  }

  const [start, end] = selection;
  return `Selection from (${start.x.toFixed(3)}, ${start.y.toFixed(
    3
  )}) to (${end.x.toFixed(3)}, ${end.y.toFixed(3)})`;
}
export function MySelectionCanvas() {
  const [activeSelection, setActiveSelection] = useThrottledState<
    Selection | undefined
  >(undefined, 50);

  return (
    <VisCanvas
      title={getTitleForSelection(activeSelection?.data)}
      abscissaConfig={{ visDomain: [-10, 0], showGrid: true }}
      ordinateConfig={{ visDomain: [50, 100], showGrid: true }}
    >
      <Pan modifierKey={"Control"} />
      <Zoom />
      <ResetZoomButton />

      <SelectionTool
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
  );
}
