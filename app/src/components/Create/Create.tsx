import * as React from 'react';
import { GoRecord, emptyBoard } from '../../goban/model/goban';
import { EditorState } from '../../goban/component/editorState';
import { BoardCanvas, BoardState } from '../../goban/component/canvas';
import { ControlPanel } from '../ControlPanel/ControlPanel';
require('./Create.scss');

interface State {
    board: BoardState;
}

export class Create extends React.PureComponent<{}, State> {

    constructor(props: {}) {
        super(props);

        const record = emptyBoard(19, 'problem');;

        this.state = {
            board: {
                record,
                editorState: {
                    mode: 'play',
                    moveStack: [],
                    currentBoardState: record.initialBoardState,
                    playerToMove: 'black',
                },
                renderingProps: {
                    showCoordinates: true,
                    clipRegion: {
                        top: 0,
                        bottom: 18,
                        left: 0,
                        right: 18,
                    },
                },
            },
        };
    }

    public render() {
        console.log('render', this.state.board);
        return (
            <div className='create-container'>
                <BoardCanvas
                    classNames='create-canvas-container'
                    record={this.state.board.record}
                    editorState={this.state.board.editorState}
                    renderingProps={this.state.board.renderingProps}
                    onUpdate={this.onUpdate}
                    style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                />
                <ControlPanel
                    board={this.state.board}
                    updateBoard={this.updateBoard}
                />
            </div>
        );
    }

    private onUpdate = (record: GoRecord, editorState: EditorState) => {
        const newBoard = { ...this.state.board, record, editorState };
        this.setState({ board: newBoard });
    }

    private updateBoard = (board: BoardState) => {
        this.setState({ board: { ...this.state.board, ...board} });
    }
}