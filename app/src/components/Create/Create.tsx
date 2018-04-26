import * as React from 'react';
import { emptyBoard } from '../../goban/model/goban';
import { BoardCanvas, Board } from '../../goban/component/canvas';
import { ControlPanel } from '../ControlPanel/ControlPanel';
require('./Create.scss');

export class Create extends React.PureComponent<{}, Board> {

    constructor(props: {}) {
        super(props);

        const record = emptyBoard(19, 'problem');;

        this.state = {
            record,
            editorState: {
                mode: 'edit',
                action: 'play',
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
        };
    }

    public render() {
        return (
            <div className='create-container'>
                <BoardCanvas
                    classNames='create-canvas-container'
                    record={this.state.record}
                    editorState={this.state.editorState}
                    renderingProps={this.state.renderingProps}
                    onUpdate={this.updateBoard}
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                />
                <ControlPanel
                    record={this.state.record}
                    editorState={this.state.editorState}
                    renderingProps={this.state.renderingProps}
                    onUpdate={this.updateBoard}
                />
            </div>
        );
    }

    private updateBoard = (board: Partial<Board>) => {
        this.setState(board as Board);
    }
}