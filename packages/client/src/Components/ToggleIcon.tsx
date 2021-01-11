//? source https://github.com/TeamWertarbyte/Components

import { Box, BoxProps, makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';
import React, { ReactElement, cloneElement } from 'react';

interface StyleProps
	extends Partial<{
		duration: number | string;
		easing: string;
		delay: number | string;
	}> {
	on?: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>(theme => {
	const { transitions, spacing } = theme;

	return {
		root: {
			width: spacing(3),
			height: spacing(3),
			position: 'relative',
			display: 'inline-block',
		},
		offIcon: ({ on, ...rest }) => ({
			transition: transitions.create('clip-path', rest),
			width: '100%',
			height: '100%',
			position: 'absolute',
			left: 0,
			top: 0,
			clipPath: on
				? 'polygon(0% 0%, 0% 0%, 0% 0%)'
				: 'polygon(0% 200%, 0% 0%, 200% 0%)',
			visibility: on ? 'hidden' : 'visible',
		}),
		onIcon: ({ on, ...rest }) => ({
			transition: transitions.create('clip-path', rest),
			width: '100%',
			height: '100%',
			position: 'absolute',
			left: 0,
			top: 0,
			clipPath: on
				? 'polygon(100% -100%, 100% 100%, -100% 100%)'
				: 'polygon(100% 100%, 100% 100%, 100% 100%)',
			visibility: on ? 'visible' : 'hidden',
		}),
	};
});

interface Props extends StyleProps, BoxProps {
	offIcon: ReactElement;
	onIcon: ReactElement;
}

export const ToggleIcon: React.FC<Props> = props => {
	const TOGGLE_DEFAULT_DURATION = 550;

	const {
		offIcon,
		onIcon,
		on,
		className,
		duration = TOGGLE_DEFAULT_DURATION,
		easing,
		delay,
		...other
	} = props;

	const classes = useStyles({ on, duration, easing, delay });

	return (
		<Box className={clsx(classes.root, className)} {...other}>
			{cloneElement(offIcon, {
				className: clsx(classes.offIcon, offIcon.props.className),
			})}
			{cloneElement(onIcon, {
				className: clsx(classes.onIcon, onIcon.props.className),
			})}
		</Box>
	);
};
