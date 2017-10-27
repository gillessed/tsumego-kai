import ReactDOM from 'react-dom';
import React from 'react';
import { BoardCanvas } from '../component/canvas';
import { emptyBoard } from '../model/goban';

const canvas = (
  <BoardCanvas
    goRecord={emptyBoard(19, 'game')}
    mode='view'
    renderingProps={{
      showCoordinates: true,
      clipRegion: {
        top: 0,
        bottom: 9,
        left: 0,
        right: 8,
      }
    }}
  />
);

ReactDOM.render(canvas, document.getElementById('main'));