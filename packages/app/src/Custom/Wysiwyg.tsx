import 'braft-editor/dist/index.css';

import BraftEditor, { EditorState } from 'braft-editor';
import React from 'react';
import { FieldRenderProps } from 'react-final-form';

import { handleBraftUploads } from 'Utils';

export class Editor extends React.Component<FieldRenderProps<any, any>> {
	state = { editorState: this.initEditorState() };

	initEditorState() {
		const content = this.props.input.value;
		if (content) return BraftEditor.createEditorState(content);
		else return BraftEditor.createEditorState(null);
	}

	handleEditorChange = (editorState: EditorState) => {
		this.setState({ editorState });
		this.changeValue(editorState);
	};

	changeValue = (editorState: EditorState) => {
		// TODO: only when saving to improve performance avoid unnecessary conversions
		const value = editorState.toHTML(true);
		this.props.input.onChange(value);
	};

	// preview = () => {
	// 	if (window.previewWindow) {
	// 		window.previewWindow.close();
	// 	}

	// 	window.previewWindow = window.open();
	// 	window.previewWindow.document.write(
	// 		buildPreviewHtml(this.state.editorState.toHTML()),
	// 	);
	// 	window.previewWindow.document.close();
	// };

	// extendControls = [
	// 	{
	// 		key: 'custom-button',
	// 		type: 'button',
	// 		text: 'Preview',
	// 		onClick: this.preview,
	// 	},
	// ];

	render() {
		const { editorState } = this.state;

		return (
			<BraftEditor
				language="en"
				media={{
					uploadFn: handleBraftUploads,
					accepts: { video: false, audio: false },
				}}
				onChange={this.handleEditorChange}
				value={editorState}
				// onSave={this.submitContent}
				// extendControls={this.extendControls}
			/>
		);
	}
}
