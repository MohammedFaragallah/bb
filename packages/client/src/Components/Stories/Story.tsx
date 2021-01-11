import { Box, Grid, Paper } from '@material-ui/core';
import { Description } from '@material-ui/icons';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';

import {
	CategorySchema,
	CommentsTypes,
	LikesTypes,
	RatesTypes,
	StorySchema,
} from '@types';
import { Breadcrumbs, Loading, NotFound, Page, Share } from 'Components';
import { Comments, Likes, Rates } from 'Components/Feedback';
import {
	AboutAuthor,
	NextPrev,
	RelatedStories,
	StoryBody,
} from 'Components/Stories';
import { DataTypes, FIRST_ITEM, Paths, Resources } from 'Constants';
import { getDescription, imageURL, StoryCategoryURL } from 'Helpers';
import { useQueryWithStore } from 'core';

interface Props {}

export const Story: React.FC<Props> = () => {
	const { storyId, categoryId } = useParams();

	const label = 'pageTitle.articles';

	const { data = [], isPreviousData } = useQueryWithStore<StorySchema>({
		type: DataTypes.GET_LIST,
		resource: Resources.STORIES,
		payload: { filter: { id: storyId, categoryId } },
	});

	const { data: category } = useQueryWithStore<CategorySchema>({
		type: DataTypes.GET_ONE,
		resource: Resources.CATEGORIES,
		payload: { id: categoryId },
	});

	const story = data[FIRST_ITEM];

	if (isPreviousData && !story?.approved)
		return (
			<NotFound
				helpfulLinks={[{ label, to: Paths.ARTICLES }]}
				message="Couldn't find this Story"
			/>
		);

	const description = getDescription(story);

	return story && category ? (
		<Page customDisplayPrint titles={[story.title, label]}>
			<Helmet>
				<meta content={story.title} name="title" />
				<meta content={description} name="description" />
				<meta content="website" property="og:type" />
				<meta content={story.title} property="og:title" />
				<meta content={description} property="og:description" />
				<meta content={imageURL(story, 'featured')} property="og:image" />
			</Helmet>
			<Breadcrumbs
				paths={[
					{ label, to: Paths.ARTICLES, icon: <Description /> },
					{ label: category.name, to: StoryCategoryURL(story) },
				]}
			/>
			<Grid container spacing={2}>
				<Grid item lg={8} sm={12}>
					{story?.video && (
						<Box
							sx={{
								displayPrint: 'none',
								mb: 2,
							}}
						>
							<ReactPlayer light url={story?.video} width="100%" />
						</Box>
					)}
					<StoryBody story={story} />
					<NextPrev />
				</Grid>
				<Grid item lg={4} sm={12}>
					<Box
						sx={{
							displayPrint: 'none',
						}}
					>
						<AboutAuthor label={label} userId={story.userId} />
					</Box>
					<Grid container>
						<Grid item lg={12} sm={6}>
							<Share downloadable title={story.title} />
						</Grid>
						<Grid item lg={12} sm={6}>
							<Likes type={LikesTypes.story} />
						</Grid>
						<Grid item lg={12} sm={6}>
							<Rates label="Rate this: " type={RatesTypes.story} />
						</Grid>
					</Grid>
					<Box
						component={Paper}
						sx={{
							displayPrint: 'none',
							mb: 4,
							mt: 2,
						}}
					>
						<RelatedStories label={label} {...story} />
					</Box>
					<Comments type={CommentsTypes.story} />
				</Grid>
			</Grid>
		</Page>
	) : (
		<Loading />
	);
};
