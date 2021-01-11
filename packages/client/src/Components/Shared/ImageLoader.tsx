import { CircularProgress, makeStyles } from '@material-ui/core';
import Skeleton, { SkeletonProps } from '@material-ui/core/Skeleton';
import clsx from 'clsx';
import React from 'react';

const useStyles = makeStyles(theme => {
	return {
		root: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		},
	};
});

interface Props extends SkeletonProps {}

export const ImageLoader: React.FC<Props> = props => {
	const { className, ...rest } = props;
	const classes = useStyles();

	return (
		<Skeleton
			className={clsx(className, classes.root)}
			variant="rectangular"
			{...rest}
		>
			<CircularProgress color="secondary" />
		</Skeleton>
	);
};
