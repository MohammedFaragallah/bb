import { Box, ButtonBase, makeStyles } from '@material-ui/core';
import React from 'react';

import { SportSchema } from '@types';
import { Link, Loading, Page, Typography } from 'Components';
import { allAvailable, DataTypes, Resources } from 'Constants';
import { generate, imageURL, SportURL } from 'Helpers';
import { useTranslation } from 'Hooks';
import { useQueryWithStore } from 'core';

const useStyles = makeStyles(theme => {
	const { spacing, breakpoints, palette } = theme;

	return {
		images: {
			display: 'flex',
			flexWrap: 'wrap',
		},
		imageWrapper: {
			borderRadius: 0,
			display: 'block',
			height: '40vh',
			margin: spacing(0, 0.5, 0.5, 0),
			padding: 0,
			position: 'relative',
			[breakpoints.down('sm')]: {
				width: '100% !important',
			},
			'&:hover': {
				zIndex: 1,
			},
			'&:hover $imageBackdrop': {
				opacity: 0.15,
			},
			'&:hover $imageMarked': {
				opacity: 0,
			},
			'&:hover $imageTitle': {
				border: '4px solid currentColor',
			},
		},
		imageButton: {
			alignItems: 'center',
			bottom: 0,
			color: palette.common.white,
			display: 'flex',
			justifyContent: 'center',
			left: 0,
			position: 'absolute',
			right: 0,
			top: 0,
		},
		imageSrc: {
			backgroundPosition: 'center 40%',
			backgroundSize: 'cover',
			bottom: 0,
			left: 0,
			position: 'absolute',
			right: 0,
			top: 0,
		},
		imageBackdrop: {
			background: palette.common.black,
			bottom: 0,
			left: 0,
			opacity: 0.5,
			position: 'absolute',
			right: 0,
			top: 0,
		},
		imageTitle: {
			position: 'relative',
			padding: spacing(2),
		},
		imageMarked: {
			backgroundColor: palette.background.paper,
			bottom: -2,
			height: 3,
			left: 'calc(50% - 9px)',
			position: 'absolute',
			width: 18,
		},
	};
});

interface Props {}

export const CommunityHome: React.FC<Props> = () => {
	const classes = useStyles();
	const translate = useTranslation();

	const label = translate('pageTitle.community');

	const { data: sports } = useQueryWithStore<SportSchema>({
		type: DataTypes.GET_LIST,
		resource: Resources.SPORTS,
		payload: { ...allAvailable },
	});

	if (!sports) return <Loading />;

	const TILES_PER_ROW = 3;

	const widths: number[] = [];
	for (let start = 0; start < sports.length; start++) {
		if (start % TILES_PER_ROW === 0) {
			const tiles =
				start === sports.length - (sports.length % TILES_PER_ROW)
					? sports.length % TILES_PER_ROW
					: TILES_PER_ROW;
			widths.push(...generate(100, tiles, 25, 40));
		}
	}

	return (
		<Page loading={sports.length < 1} titles={[label]}>
			<Box className={classes.images}>
				{sports.map((sport, index) => {
					return (
						<ButtonBase
							className={classes.imageWrapper}
							key={sport.id}
							style={{ width: `calc(${sport.width || widths[index]}% - 4px)` }}
						>
							<Link to={SportURL(sport)}>
								<Box
									className={classes.imageSrc}
									style={{
										backgroundImage: `url(${imageURL(sport, 'cover')})`,
									}}
								/>
								<Box className={classes.imageBackdrop} />
								<Box className={classes.imageButton}>
									<Typography className={classes.imageTitle}>
										{sport.name}
										<Box className={classes.imageMarked} component="span" />
									</Typography>
								</Box>
							</Link>
						</ButtonBase>
					);
				})}
			</Box>
		</Page>
	);
};
