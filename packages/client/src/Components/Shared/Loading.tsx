import { Box, BoxProps, CircularProgress, makeStyles } from '@material-ui/core';
import React from 'react';

import { Logo } from 'Layout/Logo';

const useStyles = makeStyles({
	root: {
		pointerEvents: 'none',
	},
});

interface Props extends BoxProps {
	logo?: boolean;
	fullPage?: boolean;
}

export const Loading: React.FC<Props> = props => {
	const { logo, fullPage, children, ...rest } = props;
	const classes = useStyles();

	return (
		<Box
			className={classes.root}
			{...rest}
			sx={{
				alignItems: 'center',
				display: 'flex',
				flexDirection: 'column',
				height: fullPage ? '100vh' : '60vh',
				justifyContent: 'center',
				width: '100vw',
				zIndex: 5000,
			}}
		>
			{logo && <Logo link={false} size={100} sx={{ mb: 6 }} />}
			{children}
			<CircularProgress color="secondary" />
		</Box>
	);
};
