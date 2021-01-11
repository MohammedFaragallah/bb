import { Box, makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';

interface StyleProps {
	direction: 'right' | 'left';
}

const useStyles = makeStyles<Theme, StyleProps>(theme => {
	const { palette, spacing, zIndex } = theme;

	return {
		arrow: ({ direction }) => ({
			display: 'block',
			backgroundColor: palette.background.paper,
			[direction]: spacing(2, '!important'),
			zIndex: zIndex.tooltip,
			borderRadius: spacing(8),
		}),
	};
});

interface Props extends StyleProps {
	className?: string;
	onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export const Arrow: React.FC<Props> = props => {
	const { className, onClick, direction } = props;
	const classes = useStyles({ direction });
	return <Box className={clsx(className, classes.arrow)} onClick={onClick} />;
};
