import ReactDOM from 'react-dom';
import React from 'react';
import { BoardCanvas, RenderingProps } from '../component/canvas';
import { emptyBoard, GoRecord } from '../model/goban';
import { EditorState } from '../component/editorState';

const size = 19;

function i(x: number, y: number) {
  return size * y + x;
}

interface State {
  record: GoRecord;
  editorState: EditorState;
  renderingProps: Partial<RenderingProps>;
}

class Demo extends React.PureComponent<{}, State> {
  constructor(props: {}) {
    super(props);
    
    const record = emptyBoard(19, 'game');
    // record.boardStates[record.initialBoardState].stones[i(1, 1)] = 'white';
    // record.boardStates[record.initialBoardState].stones[i(1, 2)] = 'white';
    // record.boardStates[record.initialBoardState].stones[i(1, 3)] = 'white';
    // record.boardStates[record.initialBoardState].stones[i(0, 3)] = 'white';
    // record.boardStates[record.initialBoardState].stones[i(3, 4)] = 'black';
    // record.boardStates[record.initialBoardState].stones[i(4, 4)] = 'black';
    // record.boardStates[record.initialBoardState].stones[i(5, 3)] = 'black';
    // record.boardStates[record.initialBoardState].stones[i(6, 3)] = 'black';
    
    this.state = {
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
    };
  }

  public render() {
    return (
      <BoardCanvas
        goRecord={this.state.record}
        editorState={this.state.editorState}
        renderingProps={this.state.renderingProps}
        onUpdate={this.onUpdate}
      />
    );
  }

  private onUpdate = (record: GoRecord, editorState: EditorState) => {
    this.setState({ record, editorState });
  }
}

ReactDOM.render(<Demo />, document.getElementById('main'));