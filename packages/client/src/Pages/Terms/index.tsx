import { Box } from '@material-ui/core';
import React from 'react';
import ReactMarkdown from 'react-markdown';

import { Page, Typography } from 'Components';
import { useMarkdownFile, useTranslation } from 'Hooks';

import file from './terms.md';

interface Props {}

export const Terms: React.FC<Props> = () => {
	const translate = useTranslation();
	const source = useMarkdownFile(file);

	const label = translate('pageTitle.terms');

	return (
		<Page titles={[label]}>
			<Box
				sx={{
					mb: 12,
					mt: 7,
				}}
			>
				<Typography align="center" fontWeight={900} gutterBottom>
					{label}
				</Typography>
				<ReactMarkdown source={source} />
			</Box>
		</Page>
	);
};
