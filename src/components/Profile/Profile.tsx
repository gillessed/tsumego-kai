import React from 'react';
import { MatchProps } from '../Navigation/MatchProps';
import './Profile.scss';

interface Props extends MatchProps {
}

export class Profile extends React.Component<Props, {}> {
  public render() {
    return (
      <div className='profile-container'>
        {JSON.stringify(this.props.match.params, null, 2)}
      </div>
    );
  }
}
