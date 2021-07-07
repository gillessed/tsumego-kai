import React from 'react';
import { Intent, Spinner } from '@blueprintjs/core';
import './LoadingView.scss';

interface Props {
  type: 'app' | 'content';
}

export const LoadingView = ({
  type,
}: Props) => {
  return (
    <div className={`loading-view ${type}`}>
      <Spinner size={120} intent={Intent.SUCCESS} />
    </div>
  )
}
