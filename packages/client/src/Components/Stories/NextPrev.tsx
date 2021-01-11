import { Box, Grid, Paper } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';

import { StorySchema } from '@types';
import { Link, Typography } from 'Components';
import { DataTypes, FIRST_ITEM, onlyOne, Resources } from 'Constants';
import { StoryURL } from 'Helpers';
import { useTranslation } from 'Hooks';
import { useQueryWithStore } from 'core';

interface Props {}

export const NextPrev: React.FC<Props> = () => {
	const { storyId } = useParams();
	const translate = useTranslation();

	const { data: prevStories } = useQueryWithStore<StorySchema>({
		type: DataTypes.GET_LIST,
		resource: Resources.STORIES,
		payload: {
			...onlyOne,
			filter: { approved: true, id: { $lt: storyId } },
		},
	});

	const { data: nextStories } = useQueryWithStore<StorySchema>({
		type: DataTypes.GET_LIST,
		resource: Resources.STORIES,
		payload: {
			...onlyOne,
			filter: { approved: true, id: { $gt: storyId } },
		},
	});

	const stories = [
		{ story: prevStories?.[FIRST_ITEM], label: 'previous' },
		{ story: nextStories?.[FIRST_ITEM], label: 'next' },
	];

	return (
		<Grid container spacing={2}>
			{stories
				.filter(item => item.story)
				.map(({ story, label }) => (
					<Grid item key={label} sm={6} xs={12}>
						<Box
							component={Paper}
							sx={{
								displayPrint: 'none',
								mt: 1,
								p: 1,
							}}
						>
							<Link to={StoryURL(story)}>
								<Typography fontWeight={500}>
									{translate(`label.${label}`)} : {story?.title}
								</Typography>
							</Link>
						</Box>
					</Grid>
				))}
		</Grid>
	);
};
