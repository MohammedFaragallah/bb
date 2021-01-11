import { makeStyles } from '@material-ui/core';
import React from 'react';
import { AppBar as RAAppBar } from 'react-admin';

import { Logo } from 'Custom/Layout/Logo';

const useStyles = makeStyles(theme => ({
	'@global': {
		body: {
			backgroundColor: theme.palette.common.white,
		},
		'::selection': {
			backgroundColor: theme.palette.primary.main,
			color: theme.palette.secondary.main,
			textShadow: 'none',
		},
		'::-webkit-scrollbar': {
			width: 8,
		},
		'::-webkit-scrollbar-track': {
			boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
			borderRadius: 1,
		},
		'::-webkit-scrollbar-thumb': {
			borderRadius: 1,
			boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.5)',
		},
	},
	title: {
		flex: 1,
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
	},
	spacer: {
		flex: 1,
	},
}));

export const AppBar: React.FC<any> = props => {
	const classes = useStyles();
	return (
		<RAAppBar {...props}>
			<span className={classes.spacer} />
			<Logo />
			<span className={classes.spacer} />
		</RAAppBar>
	);
};
