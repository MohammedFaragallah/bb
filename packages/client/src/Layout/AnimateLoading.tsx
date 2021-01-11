import { Box, LinearProgress, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { LoadingSelector } from 'Selectors';

const useStyles = makeStyles(theme => {
	const { spacing, zIndex } = theme;

	return {
		progress: {
			height: spacing(0.5),
			zIndex: zIndex.modal,
		},
	};
});

interface Props {
	loading: boolean;
}

export const AnimateLoading: React.FC<Props> = props => {
	const { loading } = props;

	const classes = useStyles();
	const location = useLocation();
	const [run, setRun] = useState(false);
	const storeRun = useSelector(LoadingSelector);

	useEffect(() => {
		setRun(true);
		setTimeout(() => {
			setRun(false);
		}, 1200);
	}, [location.pathname]);

	return (
		<Box
			sx={{
				height: 4,
				width: '100%',
			}}
		>
			{storeRun || run || loading ? (
				<LinearProgress className={classes.progress} />
			) : null}
		</Box>
	);
};
