import * as React from 'react';
import { BoardState } from '../../goban/component/canvas';
import { ButtonGroup, Button, TextArea } from '@blueprintjs/core';
import { previousMove, nextMove } from '../../goban/model/mutators';
import { getCurrentBoardState } from '../../goban/model/selectors';
require('./ControlPanel.scss');

interface Props {
    board: BoardState;
    updateBoard: (board: BoardState) => void;
}

export class ControlPanel extends React.PureComponent<Props, {}> {
    public render() {
        const boardState = getCurrentBoardState(this.props.board.record, this.props.board.editorState);
        const previousEnabled = this.props.board.editorState.moveStack.length > 0;
        const nextEnabled = Object.keys(boardState.moves).length > 0;
        return (
            <div className='control-panel-container'>
                <ButtonGroup
                    className='move-number-button-group '
                    fill={true}
                    large={false}
                >
                    <Button
                        icon='double-chevron-left'
                    />
                    <Button
                        icon='chevron-left'
                        disabled={!previousEnabled}
                        onClick={this.onPreviousMove}
                    />
                    <Button
                        icon='chevron-right'
                        disabled={!nextEnabled}
                        onClick={this.onNextMove}
                    />
                    <Button
                        icon='double-chevron-right'
                    />
                </ButtonGroup>
                <TextArea
                    className='comment-textarea'
                    large={true}
                />
            </div>  
        );
    }

    private onPreviousMove = () => {
        const newEditorState = previousMove(this.props.board.record, this.props.board.editorState);
        this.props.updateBoard( { ...this.props.board, editorState: newEditorState });
    }

    private onNextMove = () => {
        const newEditorState = nextMove(this.props.board.record, this.props.board.editorState);
        this.props.updateBoard( { ...this.props.board, editorState: newEditorState });
    }
}
