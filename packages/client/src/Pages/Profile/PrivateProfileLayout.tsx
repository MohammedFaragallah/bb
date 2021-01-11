import { Box, Grid } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';

import { LabeledLink } from '@types';
import { Page } from 'Components';
import { Paths } from 'Constants';
import { ProfileCard } from 'Pages/Profile/ProfileCard';
import { UserSelector } from 'Selectors';

export const privateProfilePages: LabeledLink[] = [
	{ label: 'profile', to: Paths.PROFILE },
	{ label: 'articles', to: `${Paths.PROFILE}${Paths.ARTICLES}` },
	{ label: 'firstAddress', to: `${Paths.PROFILE}${Paths.MAIN_ADDRESS}` },
	{ label: 'secondAddress', to: `${Paths.PROFILE}${Paths.SECONDARY_ADDRESS}` },
];

interface Props {}

export const PrivateProfileLayout: React.FC<Props> = () => {
	const { pathname } = useLocation();
	const user = useSelector(UserSelector);

	const title = pathname.split('/').reverse();

	if (!user) return null;

	return (
		<Page titles={[...title.filter(Boolean).map(item => `pageTitle.${item}`)]}>
			<Grid container spacing={2}>
				<Grid item lg={4} md={4} xl={4} xs={12}>
					<Box
						sx={{
							mb: 2,
						}}
					>
						<ProfileCard profilePages={privateProfilePages} user={user} />
					</Box>
				</Grid>
				<Grid item lg={8} md={8} xl={8} xs={12}>
					<Outlet />
				</Grid>
			</Grid>
		</Page>
	);
};
