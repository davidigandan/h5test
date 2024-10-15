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
  Line,
  DataCurve,
  GlyphType,
  CurveType,
} from "@h5web/lib";
import { useThrottledState } from "@react-hookz/web";
import SelectedDataTable from "./SelectedDataTable";

function getTitleForSelection(selection: Rect | undefined) {
  if (!selection) {
    return "No selection";
  }

  const [start, end] = selection;
  return `Selection from (${start.x.toFixed(3)}, ${start.y.toFixed(
    3
  )}) to (${end.x.toFixed(3)}, ${end.y.toFixed(3)})`;
}

function MySelectionCanvas() {
  const [activeSelection, setActiveSelection] = useThrottledState<
    Selection | undefined
  >(undefined, 50);

  const xValues = [0, 1, 2, 3, 4, 5, 6];
  const yValues = xValues.map(squared);

  function squared(num: number) {
    return num ** 2;
  }

  const getSelectedData(selection: Rect | undefined, xValues:Array<number> , yValues:Array<number>) => {
    const [selectionStart, selectionEnd] = selection;
    let dataInSelection:any =[];
    for (let dataPointIndex=0; xValues.length; dataPointIndex++) {
      if ((selectionStart.x<xValues[dataPointIndex] && xValues[dataPointIndex]<selectionEnd.x) && (selectionStart.y<yValues[dataPointIndex] && yValues[dataPointIndex]<selectionEnd.y)) {
        dataInSelection.push({xValues[dataPointIndex], yValues[dataPointIndex]})
      }
    }
    return dataInSelection;
  }

  return (

    <div>
      <VisCanvas
        title={getTitleForSelection(activeSelection?.data)}
        abscissaConfig={{ visDomain: [0, 10], showGrid: true }}
        ordinateConfig={{ visDomain: [0, 40], showGrid: true }}
      >
        <Pan modifierKey={"Control"} />
        <Zoom />
        <ResetZoomButton />
        <DataCurve
          abscissas={xValues}
          ordinates={yValues}
          color="hsla(240, 100%, 50%, 1)"
          visible
          glyphType={GlyphType.Circle}
          curveType={CurveType.LineAndGlyphs}
        />
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
      {/* <SelectedDataTable selectedData={dataInSelection} /> */}
    </div>
  );
}

export default MySelectionCanvas;
