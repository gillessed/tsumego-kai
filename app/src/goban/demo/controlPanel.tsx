import React from 'react';
import { GoRecord } from '../model/goban';
import { EditorState } from '../component/editorState';

interface Props {
    record: GoRecord;
    editorState: EditorState;
    onUpdate: (record: GoRecord, editorState: EditorState) => void;
}

export class ControlPanel extends React.PureComponent<Props, {}> {
    public render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', paddingRight: 50, maxWidth: 300 }}>
                <h1>Controls</h1>
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                    <span style={{ width: 100, height: 30, }}>Mode:</span>
                    <span style={{ width: 200 }}>
                        <select value={this.props.editorState.mode}>
                            <option value='view'>View</option>
                            <option value='play'>Play</option>
                            <option value='review'>Review</option>
                            <option value='edit'>Edit</option>
                            <option value='problem'>Problem</option>
                            <option value='solution'>Solution</option>
                        </select>
                    </span>

                    <span style={{ width: 100 }}>Action:</span>
                    <span style={{ width: 200 }}>
                        <select value={this.props.editorState.action}>
                            <option value='play'>Play</option>
                            <option value='erase'>Erase</option>
                            <option value='triangle'>Triangle</option>
                            <option value='square'>Square</option>
                            <option value='circle'>Circle</option>
                            <option value='letter'>Letter</option>

                            <option value='place-white'>Place White</option>
                            <option value='place-black'>Place Black</option>
                            <option value='delete'>Delete</option>
                        </select>
                    </span>
                </div>
            </div>
        );
    }
}