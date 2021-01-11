import { Box } from '@material-ui/core';
import React from 'react';
import ReactMarkdown from 'react-markdown';

import { Page, Typography } from 'Components';
import { useMarkdownFile, useTranslation } from 'Hooks';

import file from './privacy.md';

interface Props {}

export const Privacy: React.FC<Props> = () => {
	const source = useMarkdownFile(file);
	const translate = useTranslation();

	const label = translate('pageTitle.privacy');

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
