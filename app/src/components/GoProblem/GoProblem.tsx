import * as React from 'react';
import { GoRecord } from '../../goban/model/goban';
import { EditorState } from '../../goban/component/editorState';
import { ControlPanel } from '../ControlPanel/ControlPanel';
import { BoardCanvas, RenderingProps } from '../../goban/component/canvas';
require('./GoProblem.scss');

interface Props {
    record: GoRecord;
}

interface State {
    editorState: EditorState;
    renderingProps: Partial<RenderingProps>;
}

export class GoProblem extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = this.getStateFromProps(props);
    }
    
    public componentWillReceiveProps(nextProps: Props) {
        if (this.props.record !== nextProps.record) {
            this.setState({ ...this.getStateFromProps(nextProps) });
        }
    }

    private getStateFromProps(props: Props): State {
        return {
            editorState: {
                mode: 'problem',
                action: 'play',
                moveStack: [],
                currentBoardState: props.record.initialBoardState,
                playerToMove: props.record.startingPlayer,
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
        const board = {
            record: this.props.record,
            editorState: this.state.editorState,
            renderingProps: this.state.renderingProps,
        }
        return (
            <div className='go-problem-container'>
                <BoardCanvas
                    classNames='go-problem-canvas-container'
                    record={this.props.record}
                    editorState={this.state.editorState}
                    renderingProps={this.state.renderingProps}
                    onUpdate={this.onUpdate}
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                />
                <ControlPanel
                    board={board}
                    updateBoard={this.updateBoard}
                />
            </div>
        );
    }

    private onUpdate = (newRecord: GoRecord, newEditorState: EditorState) => {
        this.setState({
            editorState: newEditorState,
        });
    }
}