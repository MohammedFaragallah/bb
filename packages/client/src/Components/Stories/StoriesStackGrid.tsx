import { Box } from '@material-ui/core';
import React, { ReactElement } from 'react';
import StackGrid from 'react-stack-grid';
import { StringParam, useQueryParams, withDefault } from 'use-query-params';

import { CategorySchema, StoriesViews, StorySchema, ViewGrids } from '@types';
import { StoryCard, StoryWideCard } from 'Components/Cards';
import { imageURL, StoryURL, useWidth } from 'Helpers';

const viewsGrid: ViewGrids = {
	module: { xl: 3, lg: 3, md: 4, sm: 6, xs: 12 },
	list: { xl: 6, lg: 6, md: 12, sm: 12, xs: 12 },
};

interface Props {
	stories: StorySchema[];
	fallback?: ReactElement;
	view: StoriesViews;
	categories?: CategorySchema[];
}

export const StoriesStackGrid: React.FC<Props> = props => {
	const { view: defaultView, stories, fallback = null, categories } = props;
	const width = useWidth();

	const [{ view = defaultView }] = useQueryParams({
		view: withDefault(StringParam, defaultView),
	});

	return stories.length ? (
		<StackGrid
			columnWidth={`${(
				100 /
				(12 / Number(viewsGrid?.[view as StoriesViews]?.[width]))
			).toFixed(2)}%`}
		>
			{stories.map(story => {
				const cardData = {
					to: StoryURL(story),
					image: imageURL(story, 'featured'),
					label: categories?.find(category => category.id === story.categoryId)
						?.name,
				};

				/* /// TODO: add options[bookmark story,report story, open in new tab,hide] menu to cards  */

				return (
					<Box
						key={story.id}
						sx={{
							m: 1,
						}}
					>
						{view === 'module' && <StoryCard {...cardData} {...story} />}
						{view === 'list' && <StoryWideCard {...cardData} {...story} />}
					</Box>
				);
			})}
		</StackGrid>
	) : (
		fallback
	);
};
