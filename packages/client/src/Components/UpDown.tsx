import { Box, makeStyles } from '@material-ui/core';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import clsx from 'clsx';
import React from 'react';

import { SmoothLink } from 'Components';

const useStyles = makeStyles(theme => {
	const { palette } = theme;

	return {
		root: {
			backgroundColor: palette.action.active,
			borderRadius: '50%',
			overflow: 'hidden',
		},
		hover: {
			width: '100%',
			display: 'flex',
			justifyContent: 'center',
			'&:hover': {
				backgroundColor: palette.action.hover,
			},
		},
	};
});

interface Props {}

export const UpDown: React.FC<Props> = () => {
	const classes = useStyles();

	return (
		<Box
			className={classes.root}
			sx={{
				alignItems: 'center',
				bottom: 50,
				display: 'flex',
				flexDirection: 'column',
				position: 'fixed',
				right: 50,
				width: 48,
			}}
		>
			<SmoothLink className={clsx(classes.hover)} href="#top">
				<KeyboardArrowUp color="secondary" />
			</SmoothLink>
			<SmoothLink className={clsx(classes.hover)} href="#bottom">
				<KeyboardArrowDown color="secondary" />
			</SmoothLink>
		</Box>
	);
};
