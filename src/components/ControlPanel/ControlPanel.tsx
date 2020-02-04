import * as React from 'react';
import { RenderingProps, BoardUpdate } from '../../goban/component/canvas';
import { ButtonGroup, AnchorButton, TextArea, Checkbox, RangeSlider, Button, Icon } from '@blueprintjs/core';
import { previousMove, nextMove } from '../../goban/model/mutators';
import { getCurrentBoardState } from '../../goban/model/selectors';
import { ActionButton } from './ActionButton';
import { EditorMode, EditorState, readonlyText } from '../../goban/component/editorState';
import { BoardState, Color, GoRecord } from '../../goban/model/goban';
import DotProp from 'dot-prop-immutable';
require('./ControlPanel.scss');

interface Props {
    record: GoRecord;
    editorState: EditorState;
    renderingProps: Partial<RenderingProps>;
    onUpdate: BoardUpdate;
    correct?: boolean;
}

export class ControlPanel extends React.PureComponent<Props, {}> {
    public render() {
        const boardState = getCurrentBoardState(this.props.record, this.props.editorState);
        const previousEnabled = this.props.editorState.moveStack.length > 0;
        const nextEnabled = Object.keys(boardState.moves).length > 0;
        const { mode } = this.props.editorState;
        const initialStateId = this.props.record.initialBoardState;
        const initialState = this.props.record.boardStates[initialStateId];
        const startPlayer = this.props.record.startingPlayer;
        return (
            <div className='control-panel-container'>
                {this.renderHeader(this.props.editorState.moveStack.length, boardState, mode)}
                {this.renderMoveButtonRow(previousEnabled, nextEnabled, mode)}
                {this.renderActionButtonRow(mode)}
                {this.renderFlagRow(initialState, startPlayer, boardState, mode)}
                {this.renderClipRow(mode)}
                <TextArea
                    className='comment-textarea'
                    value={boardState.text}
                    onChange={this.onChangeText}
                    large={true}
                    readOnly={readonlyText(mode)}
                />
            </div>
        );
    }

    private renderHeader(moveNumber: number, _currentState: BoardState, _mode: EditorMode) {
        return(
            <div className='header'>
                <h3 className='unselectable'>Move {moveNumber}</h3>
                {this.props.correct === true && <Icon icon='tick' color='#1F7745' iconSize={32}/>}
                {this.props.correct === false && <Icon icon='cross' color='#A82A2A' iconSize={32}/>}
            </div>
        )
    }

    private renderMoveButtonRow(previousEnabled: boolean, nextEnabled: boolean, mode: string) {
        if (mode === 'problem') {
            return;
        }
        return (
            <ButtonGroup
                className='move-number-button-group'
                fill={true}
                large={false}
            >
                <AnchorButton
                    icon='double-chevron-left'
                    disabled={!previousEnabled}
                    onClick={this.onPreviousVariation}
                />
                <AnchorButton
                    icon='chevron-left'
                    disabled={!previousEnabled}
                    onClick={this.onPreviousMove}
                />
                <AnchorButton
                    icon='chevron-right'
                    disabled={!nextEnabled}
                    onClick={this.onNextMove}
                />
                <AnchorButton
                    icon='double-chevron-right'
                    disabled={!nextEnabled}
                    onClick={this.onNextVariation}
                />
            </ButtonGroup>
        );
    }  

    private renderActionButtonRow(mode: string) {
        if (mode !== 'edit' && mode !== 'review') {
            return;
        }
        return (
            <ButtonGroup
                className='action-button-group'
                fill={true}
                large={false}
            >
                <ActionButton
                    className='play-button'
                    icon='play'
                    buttonAction='play'
                    editorState={this.props.editorState}
                    updateBoard={this.props.onUpdate}
                />
                { mode === 'edit' && <ActionButton
                    className='black-button'
                    icon='record'
                    buttonAction='place-black'
                    editorState={this.props.editorState}
                    updateBoard={this.props.onUpdate}
                />}
                { mode === 'edit' && <ActionButton
                    className='white-button'
                    icon='record'
                    buttonAction='place-white'
                    editorState={this.props.editorState}
                    updateBoard={this.props.onUpdate}
                />}
                <ActionButton
                    icon='symbol-triangle-up'
                    buttonAction='triangle'
                    editorState={this.props.editorState}
                    updateBoard={this.props.onUpdate}
                />
                <ActionButton
                    icon='stop'
                    buttonAction='square'
                    editorState={this.props.editorState}
                    updateBoard={this.props.onUpdate}
                />
                <ActionButton
                    icon='font'
                    buttonAction='letter'
                    editorState={this.props.editorState}
                    updateBoard={this.props.onUpdate}
                />
                <ActionButton
                    icon='eraser'
                    buttonAction='erase'
                    editorState={this.props.editorState}
                    updateBoard={this.props.onUpdate}
                />
                <ActionButton
                    icon='trash'
                    buttonAction='delete'
                    editorState={this.props.editorState}
                    updateBoard={this.props.onUpdate}
                />
            </ButtonGroup>
        );
    }

    private renderFlagRow(
        initialState: BoardState,
        startingPlayer: Color,
        boardState: BoardState,
        mode: EditorMode,
    ) {
        if (mode !== 'edit') {
            return;
        }

        const hasMoves = initialState.moves.length >= 1;
        const blackFirst = startingPlayer === 'black';
        const isTerminal = boardState.moves.length === 0;
        if (mode === 'edit') {
            return (
                <div className='correctness-row'>
                    <Checkbox
                        label='Black First'
                        checked={blackFirst}
                        disabled={hasMoves}
                        onChange={this.onChangeBlackFirst}
                    />
                    <div style={{ width: 20 }} />
                    <Checkbox
                        label='Correct'
                        checked={!!boardState.correct}
                        disabled={!isTerminal}
                        onChange={this.onChangeCorrect}
                    />
                    <div style={{ width: 20 }} />
                    <Checkbox
                        label='Primary'
                        checked={!!boardState.primary}
                        disabled={!isTerminal}
                        onChange={this.onChangePrimary}
                    />
                </div>
            );
        }
    }

    private renderClipRow = (mode: string) => {
        if (mode !== 'edit') {
            return;
        }
        const widthValue: [number, number] = [
            this.props.renderingProps.clipRegion!.left + 1,
            this.props.renderingProps.clipRegion!.right + 1,
        ];
        const heightValue: [number, number] = [
            this.props.renderingProps.clipRegion!.top + 1,
            this.props.renderingProps.clipRegion!.bottom + 1,
        ];
        return (
            <div className='clip-row'>
                <div className='slider-column'>
                    <div className='width-row'>
                        <div className='name-container'> Width </div>
                        <RangeSlider
                            min={1}
                            max={this.props.record.size}
                            stepSize={1}
                            labelStepSize={5}
                            onChange={this.onChangeWidth}
                            value={widthValue}
                        />
                    </div>
                    <div className='height-row'>
                        <div className='name-container'> Height </div>
                        <RangeSlider
                            min={1}
                            max={this.props.record.size}
                            stepSize={1}
                            labelStepSize={5}
                            onChange={this.onChangeHeight}
                            value={heightValue}
                        />
                    </div>
                </div>
                <div className='auto-clip-container'>
                    <Button
                        text='Auto Clip'
                    />
                </div>
            </div>
        )
    }

    private onPreviousVariation = () => {
        let newEditorState = previousMove(this.props.record, this.props.editorState);
        while (newEditorState.moveStack.length > 0
                && this.props.record.boardStates[newEditorState.currentBoardState].moves.length < 2) {
            newEditorState = previousMove(this.props.record, newEditorState);
        }
        this.props.onUpdate({ editorState: newEditorState });
    }

    private onPreviousMove = () => {
        const newEditorState = previousMove(this.props.record, this.props.editorState);
        this.props.onUpdate({ editorState: newEditorState });
    }

    private onNextMove = () => {
        const newEditorState = nextMove(this.props.record, this.props.editorState);
        this.props.onUpdate({ editorState: newEditorState });
    }

    private onNextVariation = () => {
        let newEditorState = nextMove(this.props.record, this.props.editorState);
        while (this.props.record.boardStates[newEditorState.currentBoardState].moves.length === 1) {
            newEditorState = nextMove(this.props.record, newEditorState);
        }
        this.props.onUpdate({ editorState: newEditorState });
    }
    
    private onChangeText = (e: { target: { value: string }}) => {
        const state = this.props.editorState.currentBoardState;
        const record = DotProp.set(this.props.record, `boardStates.${state}.text`, e.target.value);
        this.props.onUpdate({ record });
    }

    private onChangeBlackFirst = (e: any) => {
        const player: Color = e.target.checked ? 'black' : 'white';
        const record = DotProp.set(this.props.record, 'startingPlayer', player);
        const editorState = DotProp.set(this.props.editorState, 'playerToMove', player);
        this.props.onUpdate({ record, editorState });
    }

    private onChangeCorrect = (e: any) => {
        const state = this.props.editorState.currentBoardState;
        const record = DotProp.set(this.props.record, `boardStates.${state}.correct`, e.target.checked);
        this.props.onUpdate({ record });
    }

    private onChangePrimary = (e: any) => {
        const state = this.props.editorState.currentBoardState;
        const record = DotProp.set(this.props.record, `boardStates.${state}.primary`, e.target.checked);
        this.props.onUpdate({ record });
    }

    private onChangeWidth = (values: [number, number]) => {
        let renderingProps = DotProp.set(this.props.renderingProps, 'clipRegion.left', values[0] - 1);
        renderingProps = DotProp.set(renderingProps, 'clipRegion.right', values[1] - 1);
        this.props.onUpdate({ renderingProps });
    }

    private onChangeHeight = (values: [number, number]) => {
        let renderingProps = DotProp.set(this.props.renderingProps, 'clipRegion.top', values[0] - 1);
        renderingProps = DotProp.set(renderingProps, 'clipRegion.bottom', values[1] - 1);
        this.props.onUpdate({ renderingProps });
    }
}
