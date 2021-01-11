import { Grid } from '@material-ui/core';
import React, { ReactNode } from 'react';
import { Waypoint } from 'react-waypoint';
import { StringParam, useQueryParams, withDefault } from 'use-query-params';

import { CategorySchema, StoriesViews, StorySchema, ViewGrids } from '@types';
import { ConditionalWrapper } from 'Components';
import { StoryCard, StoryWideCard } from 'Components/Cards';
import { imageURL, StoryURL } from 'Helpers';

const viewsGrid: ViewGrids = {
	module: { xl: 3, lg: 3, md: 4, sm: 6, xs: 12 },
	list: { xl: 6, lg: 6, md: 12, sm: 12, xs: 12 },
};

interface Props {
	stories: StorySchema[];
	fallback?: ReactNode;
	view: StoriesViews;
	categories?: CategorySchema[];
	loadMore: () => void;
}

export const StoriesGrid: React.FC<Props> = props => {
	const {
		view: defaultView,
		stories,
		fallback = null,
		categories,
		loadMore,
	} = props;

	const [{ view = defaultView }] = useQueryParams({
		view: withDefault(StringParam, defaultView),
	});

	return (
		<Grid container spacing={2}>
			{stories.length ? (
				<>
					{stories.map((story, index) => {
						const cardData = {
							to: StoryURL(story),
							image: imageURL(story, 'featured'),
							label: categories?.find(
								category => category.id === story.categoryId,
							)?.name,
						};

						return (
							<ConditionalWrapper
								condition={stories.length === index + 1}
								key={story.id}
								wrapper={children => (
									<Waypoint onEnter={loadMore}>{children}</Waypoint>
								)}
							>
								<Grid
									item
									lg={viewsGrid?.[view as StoriesViews]?.lg}
									md={viewsGrid?.[view as StoriesViews]?.md}
									sm={viewsGrid?.[view as StoriesViews]?.sm}
									xl={viewsGrid?.[view as StoriesViews]?.xl}
									xs={viewsGrid?.[view as StoriesViews]?.xs}
								>
									{/* /// TODO: add options[bookmark story,report story, open in new tab,hide] menu to cards  */}
									{view === 'module' && <StoryCard {...cardData} {...story} />}
									{view === 'list' && (
										<StoryWideCard {...cardData} {...story} />
									)}
								</Grid>
							</ConditionalWrapper>
						);
					})}
				</>
			) : (
				fallback
			)}
		</Grid>
	);
};
