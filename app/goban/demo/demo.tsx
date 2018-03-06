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
          bottom: 10,
          left: 0,
          right: 10,
        },
      },
    };
  }

  public render() {
    return (
      <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
        <h1>TS Goban Demo</h1>
        <div style={{display: 'flex', flexDirection: 'row', width: '100%', flexGrow: 1}}>
          <BoardCanvas
            goRecord={this.state.record}
            editorState={this.state.editorState}
            renderingProps={this.state.renderingProps}
            onUpdate={this.onUpdate}
            style={{flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}
          />
        </div>
      </div>
    );
  }

  private onUpdate = (record: GoRecord, editorState: EditorState) => {
    this.setState({ record, editorState });
  }
}

document.getElementsByTagName('body').item(0).style.width = '100%';
document.getElementsByTagName('body').item(0).style.height = '100%';
document.getElementsByTagName('body').item(0).style.overflow = 'hidden';

ReactDOM.render(<Demo />, document.getElementById('main'));