import { Card, CardContent, CardMedia, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';

import { StorySchema } from '@types';
import { Image, ImageLoader, Link, Typography } from 'Components';

const useStyles = makeStyles(theme => {
	const { spacing, palette } = theme;
	const ratio = 1.5;

	return {
		root: {
			margin: 'auto',
			borderRadius: spacing(ratio),
			padding: spacing(ratio),
		},
		media: {
			borderRadius: spacing(ratio / 2),
		},
		four: {
			width: '100%',
			height: 0,
			paddingBottom: '75%',
			position: 'relative',
			overflow: 'hidden',
		},
		shadow: {
			boxShadow: `${spacing(0, 2, 4)} rgba(34, 35, 58, 0.2)`,
		},
		CardImage: {
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100% !important',
			height: '100% !important',
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
	};
});

interface Props extends Partial<StorySchema> {
	to: string;
	label?: string;
	image: string;
}

export const SportCard: React.FC<Props> = props => {
	const { to, title, image, description } = props;

	const classes = useStyles();

	return (
		<Link to={to}>
			<Card className={clsx(classes.root, classes.shadow)}>
				<CardMedia className={clsx(classes.media, classes.four)}>
					<Image
						className={classes.CardImage}
						loader={<ImageLoader className={classes.CardImage} />}
						src={image}
					/>
					<Typography className={clsx(classes.TypographyCategory)}>
						{title}
					</Typography>
				</CardMedia>
				<CardContent>
					<Typography>{description}</Typography>
				</CardContent>
			</Card>
		</Link>
	);
};
