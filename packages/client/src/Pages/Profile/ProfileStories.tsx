import { Box, Grid } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React from 'react';
import { useSelector } from 'react-redux';

import { Roles, StorySchema } from '@types';
import { Button, Link, Loading, RoleOnly } from 'Components';
import { StoryWideCard } from 'Components/Cards';
import { allAvailable, DataTypes, Paths, Resources } from 'Constants';
import { imageURL, StoryURL } from 'Helpers';
import { UserSelector } from 'Selectors';
import { useQueryWithStore } from 'core';

interface Props {}

export const ProfileStories: React.FC<Props> = () => {
	const user = useSelector(UserSelector);

	const { data: stories } = useQueryWithStore<StorySchema>({
		type: DataTypes.GET_LIST,
		resource: Resources.STORIES,
		payload: {
			...allAvailable,
			filter: { userId: user?.id },
		},
	});

	if (!stories) return <Loading />;

	return (
		<>
			<Box
				sx={{
					mt: 2,
				}}
			>
				<RoleOnly role={[Roles.admin, Roles.editor]}>
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
				</RoleOnly>
			</Box>
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
