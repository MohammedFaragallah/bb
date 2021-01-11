import { Box, CardContent, CardMedia, makeStyles } from '@material-ui/core';
import Skeleton from '@material-ui/core/Skeleton';
import React, { ReactNode } from 'react';

import { Identifier, UserSchema } from '@types';
import { Card, Link, Typography } from 'Components';
import { AuthorStories } from 'Components/Stories';
import { DataTypes, Paths, Resources } from 'Constants';
import { imageURL } from 'Helpers';
import { useQueryWithStore } from 'core';

const useStyles = makeStyles(theme => {
	const { breakpoints, palette, spacing } = theme;

	return {
		root: {
			margin: 'auto',
			[breakpoints.up('sm')]: {
				display: 'flex',
			},
		},
		CardMedia: {
			backgroundColor: palette.grey[200],
			[breakpoints.only('xs')]: {
				paddingBottom: '56.25%',
			},
			[breakpoints.up('sm')]: {
				paddingRight: spacing(20),
			},
		},
		CardContent: {
			textAlign: 'left',
			padding: spacing(2),
		},
	};
});

interface Props {
	userId: Identifier;
	label: ReactNode;
}

export const AboutAuthor: React.FC<Props> = props => {
	const { userId } = props;
	const classes = useStyles();

	const {
		data: author,
		isPreviousData,
		isLoading,
	} = useQueryWithStore<UserSchema>({
		type: DataTypes.GET_ONE,
		resource: Resources.USERS,
		payload: { id: userId },
	});

	if (isPreviousData && !author) return null;

	if (author)
		return (
			<Card className={classes.root} profile>
				<CardMedia
					className={classes.CardMedia}
					image={
						imageURL(author, 'profile') ||
						`https://ui-avatars.com/api/?name=${author.userName}&size=512`
					}
				/>
				<CardContent className={classes.CardContent}>
					<Link to={`${Paths.AUTHOR}/${author.id}`}>
						<Typography fontWeight={900} gutterBottom>
							{author.userName}
						</Typography>
					</Link>
					<AuthorStories authorName={author.userName} {...props} />
				</CardContent>
			</Card>
		);

	if (isLoading)
		return (
			<Box
				sx={{
					m: 2,
				}}
			>
				<Skeleton height={40} variant="circular" width={40} />
				<CardContent className={classes.CardContent}>
					<Skeleton />
					<Skeleton />
					<Skeleton />
					<Skeleton />
				</CardContent>
			</Box>
		);

	return null;
};
