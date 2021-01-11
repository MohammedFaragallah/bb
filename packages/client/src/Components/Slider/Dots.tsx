import { Box, makeStyles } from '@material-ui/core';
import noop from 'lodash/noop';
import React from 'react';

const useStyles = makeStyles(theme => {
	const { spacing, palette } = theme;

	return {
		root: {
			height: spacing(2.5),
			width: spacing(2.5),
			cursor: 'pointer',
			border: 0,
			background: 'none',
			padding: 0,
		},
		dot: {
			backgroundColor: palette.background.paper,
			height: spacing(1.5),
			width: spacing(1.5),
			borderRadius: spacing(0.75),
			margin: spacing(0.5),
		},
	};
});

interface Props {
	index: number;
	onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export const Dots: React.FC<Props> = (props: Props) => {
	const classes = useStyles();
	const { onClick, index } = props;

	return (
		<span
			aria-label="slider dot"
			className={classes.root}
			onClick={onClick}
			onKeyPress={noop}
			role="button"
			tabIndex={index}
		>
			<Box className={classes.dot} />
		</span>
	);
};
