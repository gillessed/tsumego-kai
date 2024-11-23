import { Classes } from '@blueprintjs/core';
import classNames from 'classnames';
import React from 'react';
import './LoadingProblemView.css';
import "./ProblemViewTitleRow.css";

export const LoadingProblemView = React.memo(() => {
  return (
    <div className='loading-problem-container'>
      <div className={classNames(Classes.SKELETON, 'problem-view-title-row')} />
      <div className='loading-goban-container'>
        <div className={classNames(Classes.SKELETON, 'loading-goban')} />
        <div className={classNames(Classes.SKELETON, 'loading-controls')} />
      </div>
    </div>
  );
});
