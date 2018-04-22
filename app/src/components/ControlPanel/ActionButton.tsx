import * as React from 'react';
import { Board } from '../../goban/component/canvas';
import { AnchorButton, IconName } from '@blueprintjs/core';
import { EditAction } from '../../goban/component/editorState';

interface Props {
    className?: string;
    icon: IconName;
    board: Board;
    buttonAction: EditAction;
    updateBoard: (board: Board) => void;
}

export class ActionButton extends React.PureComponent<Props, {}> {
    public render() {
        return (
            <AnchorButton
                className={this.props.className}
                icon={this.props.icon}
                active={this.props.board.editorState.action === this.props.buttonAction}
                onClick={this.onClick}
            />
        );
    }

    private onClick = () => {
        const newEditorState = {
            ...this.props.board.editorState,
            action: this.props.buttonAction,
        };
        this.props.updateBoard({
            ...this.props.board,
            editorState: newEditorState,
        });
    }
}