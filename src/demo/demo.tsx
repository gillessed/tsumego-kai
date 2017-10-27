import ReactDOM from 'react-dom';
import React from 'react';
import { BoardCanvas } from '../component/canvas';
import { record, editorState, renderingProps } from './demoModel';

const canvas = (
  <BoardCanvas
    goRecord={record}
    editorState={editorState}
    renderingProps={renderingProps}
  />
);

ReactDOM.render(canvas, document.getElementById('main'));