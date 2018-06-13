import * as React from 'react';
require('./Home.scss');

export class Home extends React.PureComponent<{}, {}> {
    public render() {
        return (
            <div className='home-container effect-fade-in'>
                <div className='home-jumbotron'>
                    <h1>Tsumego Kai</h1>
                    <p>Get better at Go in a better way</p>
                </div>
            </div>
        );
    }
}