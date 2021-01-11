import { Box, CardHeader, Divider } from '@material-ui/core';
import React from 'react';

import { StorySchema } from '@types';
import {
	ArticleBody,
	Card,
	LastUpdated,
	Loading,
	ReadingTime,
	Typography,
	Views,
} from 'Components';
import { EditStory } from 'Components/Stories/EditStory';

interface Props {
	story: StorySchema;
}

export const StoryBody: React.FC<Props> = props => {
	const { story } = props;

	const {
		id,
		title,
		readingTime,
		updatedAt,
		articleBody,
		views,
		approved,
	} = story;

	return story ? (
		<Card>
			<Box
				sx={{
					displayPrint: 'none',
				}}
			>
				<CardHeader
					subheader={
						<Box
							sx={{
								width: '100%',
							}}
						>
							<Divider />
							<LastUpdated date={updatedAt} />
							<ReadingTime minutes={readingTime?.minutes} />
							{approved && <Views storyId={id} views={views} />}
						</Box>
					}
					title={
						<Box
							sx={{
								alignItems: 'center',
								display: 'flex',
								justifyContent: 'space-between',
							}}
						>
							<Typography fontSize="big" fontWeight={700}>
								{title}
							</Typography>
							<EditStory id={id} title="Edit Story" />
						</Box>
					}
				/>
			</Box>
			<Box
				component="div"
				sx={{
					mb: { md: 4 },
					pl: 2,
					pr: 2,
				}}
			>
				<ArticleBody articleBody={articleBody} />
			</Box>
		</Card>
	) : (
		<Loading />
	);
};
