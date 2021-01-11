import { CardContent, CardMedia, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';

import { StorySchema } from '@types';
import { Card, Image, ImageLoader, Link, Typography } from 'Components';
import { getDescription } from 'Helpers';

const useStyles = makeStyles(theme => {
	const { spacing, palette, shadows } = theme;
	return {
		root: {
			boxShadow: shadows[1],
			display: 'flex',
			flexDirection: 'column',
			height: '100%',
			margin: 'auto',
			overflow: 'hidden',
			'&:hover': {
				boxShadow: shadows[8],
				'& $CardImage': {
					transform: 'scale(1.1)',
				},
			},
		},
		CardMedia: {
			paddingTop: '65%',
			position: 'relative',
			overflow: 'hidden',
		},
		CardContent: {
			padding: spacing(2),
		},
		TypographyCategory: {
			position: 'absolute',
			top: spacing(2),
			left: spacing(2),
			letterSpacing: 0.5,
			fontWeight: 600,
			padding: spacing(0, 1),
			borderRadius: spacing(0.5),
			backgroundColor: palette.background.paper,
		},
		CardImage: {
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100% !important',
			height: '100% !important',
		},
	};
});

/*
  TODO: add category link /reading time / last updated
  TODO: number of likes/comments/overall rating
*/

interface Props extends Partial<StorySchema> {
	to: string;
	label?: string;
	image: string;
}

export const StoryCard: React.FC<Props> = props => {
	const { to, title, label, image } = props;

	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<Link to={to}>
				<CardMedia className={classes.CardMedia}>
					<Image
						className={classes.CardImage}
						loader={<ImageLoader className={classes.CardImage} />}
						src={image}
					/>
					<Typography className={clsx(classes.TypographyCategory)}>
						{label}
					</Typography>
				</CardMedia>
			</Link>
			<Link to={to}>
				<CardContent className={classes.CardContent}>
					<Typography color="textPrimary" fontWeight={700} gutterBottom>
						{title}
					</Typography>
					<Typography color="textSecondary" fontWeight={400}>
						{/* // TODO: create get excerpt by words function (text,subWords count) */}
						{getDescription(props)}
					</Typography>
				</CardContent>
			</Link>
		</Card>
	);
};
