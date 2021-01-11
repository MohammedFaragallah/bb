import { Box } from '@material-ui/core';
import React, { createElement } from 'react';

import { StorySchema } from '@types';
import { SLOTS } from 'Components/ArticleBody/Slots';
import { FIRST_ITEM } from 'Constants';

interface Props {
	articleBody: StorySchema['articleBody'];
}

export const ArticleBody: React.FC<Props> = props => {
	const { articleBody } = props;

	const slotsRegex = /%%/g;

	if (!articleBody) return null;
	const sections = articleBody.split(slotsRegex);

	return (
		<>
			{sections.map((section, index) => {
				const key = section
					.split('/')
					[FIRST_ITEM].toUpperCase() as keyof typeof SLOTS;
				const slot = SLOTS[key];

				return (
					<React.Fragment key={`${section}${index}`}>
						{slot ? (
							createElement(slot, { section })
						) : (
							<Box dangerouslySetInnerHTML={{ __html: section }} />
						)}
					</React.Fragment>
				);
			})}
		</>
	);
};
