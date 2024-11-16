import { GoRecord } from "../model/goban";
import { DerivedRenderStyle } from "./BoardProps";
import { EditorState } from "./EditorState";
import { ImageAsset } from "./ImageAsset";

export interface GobanComponentContext {
  readonly c2d: CanvasRenderingContext2D;
  readonly boardImage: ImageAsset;
  readonly whiteStoneImage?: ImageAsset;
  readonly blackStoneImage?: ImageAsset;
  readonly style: DerivedRenderStyle;
  readonly record: GoRecord;
  readonly editorState: EditorState;
  readonly mouseCoordinates: { x: number; y: number } | null;
}