import { Box, makeStyles } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AdsLocations, SlideSchema } from '@types';
import { Image, ImageLoader, InternalOrExternal, Typography } from 'Components';
import {
	DataTypes,
	FIRST_ITEM,
	newestFirst,
	onlyOne,
	Resources,
} from 'Constants';
import { imageURL } from 'Helpers';
import { PopupSelector } from 'Selectors';
import { closePopup } from 'Store';
import { useQueryWithStore } from 'core';

const useStyles = makeStyles(theme => {
	const { spacing, palette, shadows } = theme;
	const space = 4;

	return {
		promoFixed: {
			display: 'flex',
			backgroundColor: palette.background.paper,
			boxShadow: shadows[5],
			padding: spacing(1),
			position: 'fixed',
			bottom: spacing(space),
			left: spacing(space),
			borderRadius: spacing(0.5),
		},
		img: {
			width: spacing(10),
			height: 'auto',
			borderRadius: spacing(0.5),
		},
		description: {
			marginLeft: spacing(2),
			marginTop: spacing(-0.5),
			display: 'flex',
			flexDirection: 'column',
			paddingRight: spacing(2),
			color: palette.grey[700],
			width: '100%',
		},
		boxTop: {
			flex: '2 1 auto',
			width: '100%',
		},
		info: {
			marginTop: spacing(1),
			position: 'relative',
			top: 2,
		},
		icon: {
			position: 'absolute',
			right: 2,
			top: 3,
			display: 'block',
			cursor: 'pointer',
		},
	};
});

interface Props {}

export const PopUpAD: React.FC<Props> = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { open, id } = useSelector(PopupSelector);

	const { data: popup } = useQueryWithStore<SlideSchema>({
		type: DataTypes.GET_LIST,
		resource: Resources.SLIDES,
		payload: {
			...onlyOne,
			...newestFirst,
			filter: { location: AdsLocations.POPUP },
		},
	});

	const data = popup?.[FIRST_ITEM];

	//? if popup check if closed before
	return data && (open || data.id !== id) ? (
		<Box
			className={classes.promoFixed}
			sx={{
				displayPrint: 'none',
			}}
		>
			<Close
				className={classes.icon}
				onClick={() => dispatch(closePopup(data.id))}
			/>
			<InternalOrExternal link={data.link}>
				<Image
					alt={data.title}
					className={classes.img}
					loader={<ImageLoader height={60} width={80} />}
					src={imageURL(data, 'cover')}
				/>
			</InternalOrExternal>
			<Box className={classes.description}>
				<Box className={classes.boxTop}>
					<Typography>{data.title}</Typography>
					<Typography>
						<InternalOrExternal link={data.link}>
							{data.description}
						</InternalOrExternal>
					</Typography>
				</Box>
				<Box className={classes.info}>صناعة مصرية بخبرة امريكية</Box>
			</Box>
		</Box>
	) : null;
};
