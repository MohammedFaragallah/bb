import 'braft-editor/dist/index.css';

import BraftEditor, { EditorState } from 'braft-editor';
import { FieldProps } from 'formik';
import React from 'react';

import { LanguageCode } from '@types';

interface Props extends FieldProps {}

// initEditorState() {
// 	//TODO: get last created story / not approved

// 	const content = this.props.field.value;
// 	if (content) return BraftEditor.createEditorState(content);
// 	else return BraftEditor.createEditorState(null);
// }

export const Editor: React.FC<Props> = props => {
	const formikProps = formikAdapter(props);

	return (
		<BraftEditor
			{...formikProps}
			language={LanguageCode.en}
			media={{
				accepts: {
					video: false,
					audio: false,
				},
			}}
			onChange={formikProps.input.onChange}
		/>
	);
};

const formikAdapter = ({ field, form, ...props }: FieldProps) => ({
	...props,
	name: field.name,
	input: {
		...field,
		onBlur: () => form.handleBlur(field.name),
		onChange: (value: EditorState) => {
			const article = value.toHTML(true);
			form.setFieldValue(field.name, article);
		},
	},
	meta: {
		touched: form.touched[field.name] || false,
		dirty: form.dirty,
		error: form.errors[field.name] || '',
		valid: form.isValid,
		submitting: form.isSubmitting,
	},
});
