import * as React from 'react';
import { Board } from '../../goban/component/canvas';
import { ButtonGroup, AnchorButton, TextArea, Checkbox } from '@blueprintjs/core';
import { previousMove, nextMove } from '../../goban/model/mutators';
import { getCurrentBoardState } from '../../goban/model/selectors';
import { ActionButton } from './ActionButton';
import { EditorMode } from '../../goban/component/editorState';
import { BoardState} from '../../goban/model/goban';
import DotProp from 'dot-prop-immutable';
require('./ControlPanel.scss');

interface Props {
    board: Board;
    updateBoard: (board: Board) => void;
}

export class ControlPanel extends React.PureComponent<Props, {}> {
    public render() {
        const boardState = getCurrentBoardState(this.props.board.record, this.props.board.editorState);
        const previousEnabled = this.props.board.editorState.moveStack.length > 0;
        const nextEnabled = Object.keys(boardState.moves).length > 0;
        const { mode } = this.props.board.editorState;
        return (
            <div className='control-panel-container'>
                <h3 className='unselectable'>Move {this.props.board.editorState.moveStack.length}</h3>
                {this.renderMoveButtonRow(previousEnabled, nextEnabled)}
                {this.renderActionButtonRow(mode)}
                {this.renderCorrectnessRow(boardState, mode)}
                <TextArea
                    className='comment-textarea'
                    value={boardState.text}
                    onChange={this.onChangeText}
                    large={true}
                />
            </div>
        );
    }

    private renderMoveButtonRow(previousEnabled: boolean, nextEnabled: boolean) {
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
                    board={this.props.board}
                    updateBoard={this.props.updateBoard}
                />
                { mode === 'edit' && <ActionButton
                    className='black-button'
                    icon='record'
                    buttonAction='place-black'
                    board={this.props.board}
                    updateBoard={this.props.updateBoard}
                />}
                { mode === 'edit' && <ActionButton
                    className='white-button'
                    icon='record'
                    buttonAction='place-white'
                    board={this.props.board}
                    updateBoard={this.props.updateBoard}
                />}
                <ActionButton
                    icon='symbol-triangle-up'
                    buttonAction='triangle'
                    board={this.props.board}
                    updateBoard={this.props.updateBoard}
                />
                <ActionButton
                    icon='stop'
                    buttonAction='square'
                    board={this.props.board}
                    updateBoard={this.props.updateBoard}
                />
                <ActionButton
                    icon='circle'
                    buttonAction='circle'
                    board={this.props.board}
                    updateBoard={this.props.updateBoard}
                />
                <ActionButton
                    icon='font'
                    buttonAction='letter'
                    board={this.props.board}
                    updateBoard={this.props.updateBoard}
                />
                <ActionButton
                    icon='eraser'
                    buttonAction='erase'
                    board={this.props.board}
                    updateBoard={this.props.updateBoard}
                />
                <ActionButton
                    icon='trash'
                    buttonAction='delete'
                    board={this.props.board}
                    updateBoard={this.props.updateBoard}
                />
            </ButtonGroup>
        );
    }

    private renderCorrectnessRow(boardState: BoardState, mode: EditorMode) {
        const isTerminal = boardState.moves.length === 0;
        if (mode === 'edit') {
            return (
                <div className='correctness-row'>
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

    private onPreviousVariation = () => {
        let newEditorState = previousMove(this.props.board.record, this.props.board.editorState);
        while (newEditorState.moveStack.length > 0
                && this.props.board.record.boardStates[newEditorState.currentBoardState].moves.length < 2) {
            newEditorState = previousMove(this.props.board.record, newEditorState);
        }
        this.props.updateBoard({ ...this.props.board, editorState: newEditorState });
    }

    private onPreviousMove = () => {
        const newEditorState = previousMove(this.props.board.record, this.props.board.editorState);
        this.props.updateBoard({ ...this.props.board, editorState: newEditorState });
    }

    private onNextMove = () => {
        const newEditorState = nextMove(this.props.board.record, this.props.board.editorState);
        this.props.updateBoard({ ...this.props.board, editorState: newEditorState });
    }

    private onNextVariation = () => {
        let newEditorState = nextMove(this.props.board.record, this.props.board.editorState);
        while (this.props.board.record.boardStates[newEditorState.currentBoardState].moves.length === 1) {
            newEditorState = nextMove(this.props.board.record, newEditorState);
        }
        this.props.updateBoard({ ...this.props.board, editorState: newEditorState });
    }
    
    private onChangeText = (e: { target: { value: string }}) => {
        const state = this.props.board.editorState.currentBoardState;
        const record = DotProp.set(this.props.board.record, `boardStates.${state}.text`, e.target.value);
        this.props.updateBoard({ ...this.props.board, record });
    }

    private onChangeCorrect = (e: any) => {
        const state = this.props.board.editorState.currentBoardState;
        const record = DotProp.set(this.props.board.record, `boardStates.${state}.correct`, e.target.checked);
        this.props.updateBoard({ ...this.props.board, record });
    }

    private onChangePrimary = (e: any) => {
        const state = this.props.board.editorState.currentBoardState;
        const record = DotProp.set(this.props.board.record, `boardStates.${state}.primary`, e.target.checked);
        this.props.updateBoard({ ...this.props.board, record });
    }
}
