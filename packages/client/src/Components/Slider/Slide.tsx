import {
	Box,
	Container,
	makeStyles,
	Slide as MuiSlide,
} from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import { Waypoint } from 'react-waypoint';

import { SlideSchema } from '@types';
import { ImageLoader, Typography } from 'Components';
import { imageURL } from 'Helpers';

const useStyles = makeStyles(theme => {
	const { breakpoints, palette, spacing } = theme;

	return {
		content: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			height: 730,
			width: 580,
			maxWidth: '100%',
			[breakpoints.down('md')]: {
				height: '600px',
			},
			[breakpoints.down('sm')]: {
				height: '450px',
			},
		},
		title: {
			fontSize: 70,
			lineHeight: 1.2,
			marginBottom: spacing(5),
			marginTop: spacing(-2),
			color: palette.common.white,
		},
		subTitle: {
			fontSize: spacing(2),
			lineHeight: 1.8,
			marginBottom: spacing(8),
			color: palette.common.white,
		},
	};
});

interface Props {
	slide: SlideSchema;
	In: boolean;
}

export const Slide: React.FC<Props> = props => {
	const { slide, In } = props;
	const classes = useStyles();
	const [loaded, setLoaded] = useState('');

	const startLoading = useCallback(() => {
		const image = imageURL(slide, 'cover');
		const imageLoader = new Image();

		imageLoader.src = image;

		imageLoader.onload = () => {
			setLoaded(image);
		};
	}, [slide]);

	return (
		<Waypoint horizontal onEnter={startLoading}>
			<Box
				style={{
					width: '100vw',
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center',
					backgroundImage: `url(${loaded})`,
				}}
				sx={{
					height: '50vh',
				}}
				title={slide.title}
			>
				{loaded ? (
					<Container>
						<Box className={classes.content}>
							<MuiSlide direction="down" in={In}>
								<Typography className={classes.title}>{slide.title}</Typography>
							</MuiSlide>
							<MuiSlide direction="up" in={In}>
								<Typography className={classes.subTitle}>
									{slide.description}
								</Typography>
							</MuiSlide>
						</Box>
					</Container>
				) : (
					<ImageLoader height="50vh" width="100vw" />
				)}
			</Box>
		</Waypoint>
	);
};
