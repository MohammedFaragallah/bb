import {
	Avatar,
	Box,
	CardContent,
	Divider,
	List,
	ListItem,
	ListItemText,
	makeStyles,
} from '@material-ui/core';
import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { LabeledLink, StoreUser } from '@types';
import { Card, Link, Socials, Typography } from 'Components';
import { getSocials, imageURL } from 'Helpers';
import { useTranslation } from 'Hooks';
import { UploadProfileImage } from 'Pages/Profile/UploadProfileImage';

const useStyles = makeStyles(theme => {
	const { spacing } = theme;

	return {
		root: {
			marginTop: spacing(2),
		},
		details: {
			display: 'flex',
			justifyContent: 'space-between',
		},
		avatar: {
			marginLeft: 'auto',
			height: 110,
			width: 100,
			flexShrink: 0,
			flexGrow: 0,
		},
		progress: {
			marginTop: spacing(2),
		},
	};
});

export interface ProfileCardProps {
	user: Partial<StoreUser>;
	profilePages: LabeledLink[];
}

export const ProfileCard: React.FC<ProfileCardProps> = props => {
	const { children, profilePages, user } = props;
	const { pathname } = useLocation();
	const { userId } = useParams();

	const classes = useStyles();
	const translate = useTranslation();

	return (
		<Card className={classes.root}>
			<CardContent>
				<Box className={classes.details}>
					<Box>
						<Typography fontWeight={700} gutterBottom>
							{user.userName}
						</Typography>
						{user.firstAddress && (
							<Typography color="textSecondary" fontWeight={400}>
								{user.firstAddress.country}{' '}
								{user.firstAddress.country === 'Egypt' &&
									user.firstAddress.city}
							</Typography>
						)}
						<Typography color="textSecondary" />
						<Box
							sx={{
								mt: 2,
							}}
						>
							<Socials socials={getSocials(user)} />
						</Box>
					</Box>
					<Box
						sx={{
							position: 'relative',
						}}
					>
						<Avatar
							alt={user.userName}
							className={classes.avatar}
							src={imageURL(user, 'profile')}
						/>
						{!userId && <UploadProfileImage />}
					</Box>
				</Box>
			</CardContent>
			<Divider />
			{children}
			<List disablePadding>
				{profilePages.map(({ to, label }, index) => (
					<Link key={JSON.stringify(label) + to} to={to}>
						<ListItem
							button
							divider={index < profilePages.length - 1}
							selected={pathname === to}
						>
							<ListItemText primary={translate(`pageTitle.${label}`)} />
						</ListItem>
					</Link>
				))}
			</List>
		</Card>
	);
};
