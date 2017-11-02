import ReactDOM from 'react-dom';
import React from 'react';
import { BoardCanvas, RenderingProps } from '../component/canvas';
import { GoRecord } from '../model/goban';
import { EditorState } from '../component/editorState';
import { demoRecord1 } from './records/demoRecord1';

interface State {
  record: GoRecord;
  editorState: EditorState;
  renderingProps: Partial<RenderingProps>;
}

class Demo extends React.PureComponent<{}, State> {
  constructor(props: {}) {
    super(props);
    
    const record = demoRecord1;
    
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