import { makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';
import React, { CSSProperties } from 'react';
import { ImgProps } from 'react-image';

import { SquareSize } from '@types';
import { Image, ImageLoader } from 'Components';

const useStyles = makeStyles<Theme, Props>(theme => {
	const { spacing } = theme;

	return {
		cover: ({ height, width }) => ({
			width,
			height,
			marginRight: spacing(1),
			borderRadius: spacing(0.5),
		}),
	};
});

interface Props extends ImgProps {
	size?: SquareSize;
	height?: CSSProperties['height'];
	width?: CSSProperties['width'];
}

export const CoverImage: React.FC<Props> = props => {
	const { className, size, height = size, width = size, ...rest } = props;
	const classes = useStyles({ ...props, height, width });

	return (
		<Image
			className={clsx(classes.cover, className)}
			loader={
				<ImageLoader className={classes.cover} height={height} width={width} />
			}
			{...rest}
		/>
	);
};
