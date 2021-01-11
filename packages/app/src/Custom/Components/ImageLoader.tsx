import { CircularProgress, makeStyles } from '@material-ui/core';
import { Skeleton, SkeletonProps } from '@material-ui/lab';
import clsx from 'clsx';
import React from 'react';

const useStyles = makeStyles({
	root: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export const ImageLoader: React.FC<SkeletonProps> = props => {
	const { className } = props;
	const classes = useStyles();

	return (
		<Skeleton
			className={clsx(className, classes.root)}
			variant="rect"
			{...props}
		>
			<CircularProgress color="secondary" />
		</Skeleton>
	);
};
