import * as React from 'react';
import { emptyBoard, GoRecord } from '../../goban/model/goban';
import { BoardCanvas, Board, Update } from '../../goban/component/canvas';
import { ControlPanel } from '../ControlPanel/ControlPanel';
import { AnchorButton, Intent } from '@blueprintjs/core';
import { EditorState } from '../../goban/component/editorState';
import { playPrimary } from '../../goban/model/mutators';
require('./Create.scss');

interface State extends Board {
    showPreview: boolean;
    correct?: boolean;
    copyRecord?: GoRecord;
}

export class Create extends React.PureComponent<{}, State> {

    constructor(props: {}) {
        super(props);

        const record = emptyBoard(19);;

        this.state = {
            showPreview: false,
            record,
            editorState: {
                mode: 'edit',
                action: 'play',
                moveStack: [],
                currentBoardState: record.initialBoardState,
                playerToMove: record.startingPlayer,
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
            <div className='create-container effect-fade-in'>
                <BoardCanvas
                    classNames='create-canvas-container'
                    record={this.state.record}
                    editorState={this.state.editorState}
                    renderingProps={this.state.renderingProps}
                    onUpdate={this.updateBoard}
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                />
                <div className='create-right columm'>
                    <ControlPanel
                        record={this.state.record}
                        editorState={this.state.editorState}
                        renderingProps={this.state.renderingProps}
                        correct={this.state.correct}
                        onUpdate={this.updateBoard}
                    />
                    {this.renderButtonPanel()}
                </div>
            </div>
        );
    }

    private renderButtonPanel() {
        if (this.state.showPreview) {
            return (
                <div className='button-panel'>
                    <AnchorButton
                        text='Return to Edit'
                        rightIcon='edit'
                        intent={Intent.PRIMARY}
                        onClick={this.onClickEdit}
                    />
                </div>
            );
        } else {
            return (
                <div className='button-panel'>
                    <AnchorButton
                        text='Preview'
                        icon='search'
                        intent={Intent.PRIMARY}
                        onClick={this.onClickPreview}
                    />
                    <div style={{ width: 20 }} />
                    <AnchorButton
                        text='Describe Problem'
                        rightIcon='arrow-right'
                        intent={Intent.SUCCESS}
                    />
                </div>
            );
        }
    }

    private updateBoard = (update: Update) => {
        let nextUpdate = update;
        let correct: boolean | undefined;
        if (this.state.editorState.mode === 'problem'
                && nextUpdate.playedMove && nextUpdate.editorState && nextUpdate.record) {
            const result = playPrimary(nextUpdate.record, nextUpdate.editorState);
            if (result.correct !== undefined) {
                correct = result.correct;
            }
            if (result.editorState) {
                nextUpdate.editorState = result.editorState;
            }
        }
        let partial: Partial<State> = {};
        if (nextUpdate.record) {
            partial.record = nextUpdate.record;
        }
        if (nextUpdate.editorState) {
            partial.editorState = nextUpdate.editorState;
        }
        if (nextUpdate.renderingProps) {
            partial.renderingProps = nextUpdate.renderingProps;
        }
        if (correct !== undefined) {
            partial.correct = correct;
        }
        this.setState(partial as State);
    }

    private onClickPreview = () => {
        const editorState: EditorState = {
            mode: 'problem',
            action: 'play',
            moveStack: [],
            currentBoardState: this.state.record.initialBoardState,
            playerToMove: this.state.record.startingPlayer,
        };
        const copyRecord = { ...this.state.record };
        this.setState({
            editorState,
            showPreview: true,
            copyRecord,
        });
    }

    private onClickEdit = () => {
        const copy = this.state.copyRecord || this.state.record;
        let editorState: EditorState;
        if (!copy.boardStates[this.state.editorState.currentBoardState]) {
            editorState = {
                mode: 'edit',
                action: 'play',
                moveStack: [],
                currentBoardState: copy.initialBoardState,
                playerToMove: copy.startingPlayer,
            };
        } else {
            editorState = {
                mode: 'edit',
                action: 'play',
                moveStack: this.state.editorState.moveStack,
                currentBoardState: this.state.editorState.currentBoardState,
                playerToMove: this.state.editorState.playerToMove,
            };
        }
        this.setState({
            record: copy,
            editorState,
            showPreview: false,
            correct: undefined,
            copyRecord: undefined,
        });
    }
}