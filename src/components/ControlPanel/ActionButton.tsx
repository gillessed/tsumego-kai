import * as React from 'react';
import { BoardUpdate } from '../../goban/component/canvas';
import { AnchorButton, IconName } from '@blueprintjs/core';
import { EditAction, EditorState } from '../../goban/component/editorState';

interface Props {
    className?: string;
    icon: IconName;
    editorState: EditorState;
    buttonAction: EditAction;
    updateBoard: BoardUpdate;
}

export class ActionButton extends React.PureComponent<Props, {}> {
    public render() {
        return (
            <AnchorButton
                className={this.props.className}
                icon={this.props.icon}
                active={this.props.editorState.action === this.props.buttonAction}
                onClick={this.onClick}
            />
        );
    }

    private onClick = () => {
        const newEditorState = {
            ...this.props.editorState,
            action: this.props.buttonAction,
        };
        this.props.updateBoard({
            editorState: newEditorState,
        });
    }
}