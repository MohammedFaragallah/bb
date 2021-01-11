import { Grid, ImageListItemBar, makeStyles } from '@material-ui/core';
import React from 'react';

import { SlideSchema } from '@types';
import { Image, ImageLoader, InternalOrExternal } from 'Components';
import { imageURL } from 'Helpers';

const useStyles = makeStyles(theme => {
	const { spacing } = theme;

	return {
		grid: {
			width: '100%',
			position: 'relative',
		},
		image: {
			width: '100%',
			height: 'calc(100% - 24px)',
			marginTop: spacing(2),
			borderRadius: spacing(0.5),
		},
		caption: {
			bottom: spacing(2),
			left: spacing(1),
			right: spacing(1),
			borderRadius: spacing(0.5),
		},
	};
});

interface Props {
	ad: SlideSchema;
}

export const MegaMenuAD: React.FC<Props> = props => {
	const { ad } = props;
	const classes = useStyles();

	return (
		<Grid className={classes.grid} item md={3} sm={6}>
			<InternalOrExternal link={ad.link}>
				<Image
					alt={ad.title}
					className={classes.image}
					loader={<ImageLoader height="300px" width="100%" />}
					src={imageURL(ad, 'cover')}
				/>
				<ImageListItemBar className={classes.caption} title={ad.title} />
			</InternalOrExternal>
		</Grid>
	);
};
