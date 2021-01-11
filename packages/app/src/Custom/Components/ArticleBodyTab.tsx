import React from 'react';
import { FormTab, TextInput } from 'react-admin';
import { Field } from 'react-final-form';

import { Editor } from 'Custom';

interface Props {}

export const ArticleBodyTab: React.FC<Props> = props => {
	return (
		<FormTab label="Article body" {...props}>
			<Field component={Editor} name="articleBody" />
			<TextInput fullWidth multiline rows={3} source="description" />
		</FormTab>
	);
};
