import { Box, makeStyles } from '@material-ui/core';
import { ImageSearch } from '@material-ui/icons';
import { supportsTouchEvents } from 'detect-it';
import React from 'react';

const useStyles = makeStyles(theme => {
	const { palette, spacing } = theme;

	return {
		root: {
			width: '100%',
			display: 'flex',
			justifyContent: 'center',
			position: 'absolute',
			bottom: spacing(3),
		},
		container: {
			display: 'flex',
			alignItems: 'center',
			padding: spacing(0.5, 1),
			backgroundColor: palette.background.paper,
			borderRadius: spacing(1),
			opacity: '0.70',
		},
		label: {},
		icon: {},
	};
});

interface Props {
	active: boolean;
}

export const MagnifiersHint: React.FC<Props> = props => {
	const { active } = props;
	const classes = useStyles();

	return active ? null : (
		<Box className={classes.root}>
			<Box className={classes.container}>
				<Box
					className={classes.label}
					sx={{
						mr: 1,
					}}
				>
					{supportsTouchEvents ? 'Long-Touch to Zoom' : 'Hover to Zoom'}
				</Box>
				<ImageSearch className={classes.icon} />
			</Box>
		</Box>
	);
};
