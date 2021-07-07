import { Checkbox } from "@blueprintjs/core";
import DotProp from 'dot-prop-immutable';
import React, { useCallback } from "react";
import { EditorState } from "../../goban/component/EditorState";
import { DefaultRenderingProps, RenderingProps } from "../../goban/component/RenderingProps";
import { BoardState, GoRecord } from "../../goban/model/goban";
import { getCurrentBoardState } from "../../goban/model/selectors";
import './FlagRow.scss';
import classNames from 'classnames';
import { swapColor } from "../../goban/model/utils";

export interface Props {
  record: GoRecord;
  editorState: EditorState;
  renderingProps: Partial<RenderingProps>;
  setRecord: (record: GoRecord) => void;
  boardState: BoardState;
}

export const FlagRow = React.memo(({
  record,
  editorState,
  renderingProps,
  setRecord,
  boardState,
}: Props) => {
  const handleSwapPlayerToPlay = useCallback(() => {
    const currentBoardState = getCurrentBoardState(record, editorState);
    const newPlayerToPlay = swapColor(currentBoardState.playerToPlay)
    const newRecord = DotProp.set(record, `boardStates.${currentBoardState.id}.playerToPlay`, newPlayerToPlay);
    setRecord(newRecord);
  }, [record, editorState, setRecord]);

  const onChangeCorrect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const state = editorState.currentBoardState;
    const newRecord = DotProp.set(record, `boardStates.${state}.correct`, e.target.checked);
    setRecord(newRecord);
  }, [record, setRecord, editorState.currentBoardState]);

  const onChangePrimary = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const state = editorState.currentBoardState;
    const newRecord = DotProp.set(record, `boardStates.${state}.primary`, e.target.checked);
    setRecord(newRecord);
  }, [record, setRecord, editorState.currentBoardState]);

  const isTerminal = boardState.moves.length === 0;
  const currentBoardState = getCurrentBoardState(record, editorState);
  const canEditPlayerToPlay = currentBoardState.moves.length === 0;

  const blackStoneImage = renderingProps.blackStoneImagePath ?? DefaultRenderingProps.blackStoneImagePath;
  const whiteStoneImage = renderingProps.whiteStoneImagePath ?? DefaultRenderingProps.whiteStoneImagePath;
  const toPlayStoneImage = currentBoardState.playerToPlay === 'black' ? blackStoneImage : whiteStoneImage;
  const toPlayContainerClasses = classNames('to-play-container', {
    'clickable': canEditPlayerToPlay,
  });

  return (
    <div className='correctness-row'>
      <div className={toPlayContainerClasses} onClick={handleSwapPlayerToPlay}>
        <img className='stone-image' src={toPlayStoneImage} alt='stone' />
        <span>to play</span>
      </div>
      <div style={{ width: 20 }} />
      <Checkbox
        label='Correct'
        checked={!!boardState.correct}
        disabled={!isTerminal}
        onChange={onChangeCorrect}
      />
      <div style={{ width: 20 }} />
      <Checkbox
        label='Primary'
        checked={!!boardState.primary}
        disabled={!isTerminal}
        onChange={onChangePrimary}
      />
    </div>
  );
});
