import * as React from 'react';
import { Button, Intent } from '@blueprintjs/core';
import { inject, observer } from 'mobx-react';
import { RootStoreProps } from '../../state/RootStore';
import { paths } from '../path';
import { browserHistory } from '../../history';
require('./Login.scss');

interface State {
    username: string;
    password: string;
}

@inject('rootStore')
@observer
export class Login extends React.Component<{}, State> {
    get injected() {
        return this.props as RootStoreProps;
    }

    constructor(props: {}) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }

    public render() {
        const loginError = this.injected.rootStore.sessionStore.loginError;
        const disableLoginButton = this.state.username.length === 0 || this.state.password.length === 0;
        return (
            <div className='login-container'>
                <div className='login-form'>
                    <input
                        className='pt-input pt-large'
                        type='text'
                        placeholder='Username'
                        dir='auto'
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                        onKeyUp={this.onKeyUp}
                    />
                    <input
                        className='pt-input pt-large'
                        type='password'
                        placeholder='Password'
                        dir='auto'
                        value={this.state.password}
                        onChange={this.onChangePassword}
                        onKeyUp={this.onKeyUp}
                    />
                    <Button
                        className='login-button pt-large'
                        text='Login'
                        intent={Intent.PRIMARY}
                        disabled={disableLoginButton}
                        onClick={this.onClickLogin}
                        loading={this.injected.rootStore.sessionStore.loggingIn}
                    />
                    <Button
                        className='signup-button pt-large'
                        text='Sign Up'
                        onClick={this.onClickSignup}
                    />
                    <div className='login-error-container'>
                        {loginError}
                    </div>
                </div>
            </div>
        );
    }

    private onKeyUp = (e: any) => {
        if (e.key === 'Enter') {
            this.onClickLogin();
        }
    }

    private onChangeUsername = (e: any) => {
        this.setState({ username: e.target.value });
    }

    private onChangePassword = (e: any) => {
        this.setState({ password: e.target.value });
    }

    private onClickLogin = () => {
        this.injected.rootStore.sessionStore.login(this.state.username, this.state.password);
    }

    private onClickSignup = () => {
        browserHistory.push(paths.signup());
    }
}