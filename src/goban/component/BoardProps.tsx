import { ClipRegion, GoRecord } from "../model/goban";
import { Dimension } from "../model/utils";
import { EditorState } from "./EditorState";
import { RenderingProps } from "./RenderingProps";

export type DerivedRenderStyle = RenderingProps & {
  canvasSize: Dimension;
  fullInset: number;
  stoneSizePixels: number;
  finalClipRegion: ClipRegion;
}

export interface BoardProps {
  record: GoRecord;
  editorState: EditorState;
  renderingProps: Partial<RenderingProps>;
  setRecord?: (record: GoRecord) => void;
  setEditorState?: (editorState: EditorState) => void;
}

export interface EditorProps extends BoardProps {
  setRecord: (record: GoRecord) => void;
  setEditorState: (editorState: EditorState) => void;
  setRenderingProps: (renderingProps: Partial<RenderingProps>) => void;
}
