import { Intent, Spinner } from '@blueprintjs/core';
import React from 'react';
import './LoadingView.css';

interface Props {
  type: 'app' | 'content';
}

export const LoadingView = React.memo(({
  type,
}: Props) => {
  return (
    <div className={`loading-view ${type}`}>
      <Spinner size={120} intent={Intent.SUCCESS} />
    </div>
  )
});
