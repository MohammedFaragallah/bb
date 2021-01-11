import { Box, Grid } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useParams } from 'react-router-dom';

import { UserSchema } from '@types';
import { Loading, Page } from 'Components';
import { DataTypes, Paths, Resources } from 'Constants';
import { UserSelector } from 'Selectors';
import { useQueryWithStore } from 'core';

import { ProfileCard } from '../Profile/ProfileCard';

interface Props {}

export const AuthorLayout: React.FC<Props> = props => {
	const { userId } = useParams();

	const authorProfilePages = [
		{ label: 'profile', to: `${Paths.AUTHOR}/${userId}` },
		{ label: 'articles', to: `${Paths.AUTHOR}/${userId}${Paths.ARTICLES}` },
	];

	const user = useSelector(UserSelector);

	const { data: author, isLoading } = useQueryWithStore<UserSchema>({
		type: DataTypes.GET_ONE,
		resource: Resources.USERS,
		payload: { id: userId },
	});

	//? if the profile belongs to the current authenticated user
	//? redirect to his private profile
	if (user?.id === Number(userId)) return <Navigate to={Paths.PROFILE} />;

	if (isLoading) return <Loading />;

	if (!author) return null;

	// TODO: add title
	return (
		<Page>
			<Grid container spacing={2}>
				<Grid item lg={4} md={4} xl={4} xs={12}>
					<Box
						sx={{
							mb: 2,
						}}
					>
						<ProfileCard profilePages={authorProfilePages} user={author} />
					</Box>
				</Grid>
				<Grid item lg={8} md={8} xl={8} xs={12}>
					<Outlet />
				</Grid>
			</Grid>
		</Page>
	);
};
