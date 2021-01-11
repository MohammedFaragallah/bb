import { Box, BoxProps, makeStyles } from '@material-ui/core';
import React from 'react';

import { Image, ImageLoader, Link, LinkProps } from 'Components';

const useStyles = makeStyles(theme => {
	const { spacing, shadows, palette } = theme;

	return {
		banner: {
			minWidth: 200,
			flex: '0 0 220px',
			margin: spacing(0, 1, 0, 0),
			position: 'relative',
			overflow: 'hidden',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		},
		bannerBackgroundImg: {
			verticalAlign: 'middle',
			position: 'absolute',
			width: '100%',
			height: '100%',
		},
		text: {
			position: 'relative',
			color: palette.common.white,
			textAlign: 'center',
			margin: spacing(0, 0, 2.5),
			fontSize: 30,
		},
		action: {
			maxWidth: '90%',
			position: 'absolute',
			bottom: spacing(2.5),
			left: 0,
			right: 0,
			margin: spacing(0, 'auto'),
			display: 'flex',
			justifyContent: 'center',
		},
		link: {
			textDecoration: 'none',
			boxShadow: shadows[2],
			padding: spacing(1, 3),
			color: palette.common.white,
			borderRadius: spacing(0.5),
			fontSize: spacing(2.5),
			textAlign: 'center',
			textTransform: 'uppercase',
		},
	};
});

interface Props extends BoxProps {
	to: LinkProps['to'];
	title: string;
	description?: string;
	action: string;
	background: string;
}

export const SectionSliderBanner: React.FC<Props> = props => {
	const { to, title, description = '', action, background, ...rest } = props;
	const classes = useStyles();

	return (
		<Box className={classes.banner} {...rest}>
			<Image
				alt={title || description}
				className={classes.bannerBackgroundImg}
				loader={<ImageLoader className={classes.bannerBackgroundImg} />}
				src={background}
			/>
			<Box className={classes.text}>
				<Box>{title.toUpperCase()}</Box>
				<Box>{description.toUpperCase()}</Box>
			</Box>
			<Box className={classes.action}>
				<Link className={classes.link} to={to}>
					{action.toUpperCase()}
				</Link>
			</Box>
		</Box>
	);
};
