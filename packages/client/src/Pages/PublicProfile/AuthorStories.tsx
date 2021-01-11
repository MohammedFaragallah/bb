import { Box, Grid } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React from 'react';
import { useParams } from 'react-router-dom';

import { Roles, StorySchema } from '@types';
import { Button, Link, Loading, RoleOnly } from 'Components';
import { StoryWideCard } from 'Components/Cards';
import { allAvailable, DataTypes, Paths, Resources } from 'Constants';
import { imageURL, StoryURL } from 'Helpers';
import { useQueryWithStore } from 'core';

interface Props {}

export const AuthorStories: React.FC<Props> = () => {
	const { userId } = useParams();

	const { data: stories } = useQueryWithStore<StorySchema>({
		type: DataTypes.GET_LIST,
		resource: Resources.STORIES,
		payload: {
			...allAvailable,
			filter: { userId, approved: true },
		},
	});

	if (!stories) return <Loading />;

	return (
		<>
			<RoleOnly role={[Roles.admin, Roles.editor]}>
				<Box
					sx={{
						mt: 2,
					}}
				>
					<Link to={`${Paths.PROFILE}${Paths.ARTICLES}/create`}>
						<Button
							aria-label="profile"
							color="secondary"
							startIcon={<Add />}
							variant="contained"
						>
							Create new Article
						</Button>
					</Link>
				</Box>
			</RoleOnly>
			<Grid component={Box} container spacing={2} sx={{ pt: 2 }}>
				{stories.map(story => {
					const cardData = {
						to: StoryURL(story),
						image: imageURL(story, 'featured'),
					};

					return (
						<Grid item key={story.id} sm={12}>
							<StoryWideCard {...cardData} {...story} />
						</Grid>
					);
				})}
			</Grid>
		</>
	);
};
