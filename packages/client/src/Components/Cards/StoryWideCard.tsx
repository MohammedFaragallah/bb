import { CardContent, CardMedia, makeStyles } from '@material-ui/core';
import React from 'react';

import { StorySchema } from '@types';
import {
	Card,
	Image,
	ImageLoader,
	LastUpdated,
	Link,
	ReadingTime,
	Typography,
} from 'Components';
import { getDescription } from 'Helpers';

const useStyles = makeStyles(theme => {
	const { breakpoints, spacing, transitions } = theme;

	return {
		PostCard: {
			margin: spacing(0, 'auto'),
			transition: transitions.create('all', { duration: 300 }),
			maxWidth: breakpoints.values.md,
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			'&:hover': {
				transform: `translateX(${spacing(0.5)})`,
				'& $CardImage': {
					transform: 'scale(1.1)',
				},
			},
			[breakpoints.up('sm')]: {
				flexDirection: 'row',
			},
		},
		CardMedia: {
			position: 'relative',
			width: '100%',
			paddingTop: '48%',
			backgroundSize: 'cover',
			'&:after': {
				content: '" "',
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				borderRadius: spacing(2),
				opacity: 0.5,
			},
			[breakpoints.up('sm')]: {
				width: '40%',
			},
			overflow: 'hidden',
		},
		CardContent: {
			width: '100%',
			textAlign: 'center',
			[breakpoints.up('sm')]: {
				paddingLeft: spacing(3),
				textAlign: 'left',
				width: '60%',
			},
		},
		CardImage: {
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
		},
		readMore: {
			paddingLeft: spacing(3),
			paddingRight: spacing(3),
		},
	};
});

interface Props extends Partial<StorySchema> {
	to: string;
	label?: string;
	image: string;
}

export const StoryWideCard: React.FC<Props> = props => {
	const { to, image, readingTime, updatedAt, title, label, approved } = props;

	const classes = useStyles();

	return (
		<Link to={to}>
			<Card className={classes.PostCard}>
				<CardMedia className={classes.CardMedia}>
					<Image
						className={classes.CardImage}
						loader={<ImageLoader className={classes.CardImage} />}
						src={image}
					/>
				</CardMedia>
				<CardContent className={classes.CardContent}>
					<Typography color="textSecondary" fontWeight={400}>
						{label}
					</Typography>
					<Typography color="error" fontWeight={600}>
						{!approved && 'NOT APPROVED YET'}
					</Typography>
					<ReadingTime minutes={readingTime?.minutes} />
					<LastUpdated date={updatedAt} />
					<Typography color="textPrimary" fontWeight={700} gutterBottom>
						{title}
					</Typography>
					<Typography color="textSecondary" fontWeight={400}>
						{getDescription(props)}
					</Typography>
				</CardContent>
			</Card>
		</Link>
	);
};
