import { makeStyles, StepIconProps, Box } from '@material-ui/core';
import { Home, CreditCard, RemoveRedEye } from '@material-ui/icons';
import clsx from 'clsx';
import React from 'react';

const useStepIconStyles = makeStyles(theme => {
	const { palette } = theme;

	return {
		root: {
			backgroundColor: palette.action.disabled,
			zIndex: 1,
			color: palette.background.paper,
			width: 50,
			height: 50,
			display: 'flex',
			borderRadius: '50%',
			justifyContent: 'center',
			alignItems: 'center',
		},
		active: {
			backgroundImage:
				'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
			boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
		},
		completed: {
			backgroundImage:
				'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
		},
	};
});

interface Props extends StepIconProps {}

export const StepIcon: React.FC<Props> = props => {
	const classes = useStepIconStyles();
	const { active, completed } = props;

	const icons: { [index: string]: React.ReactElement } = {
		1: <Home />,
		2: <CreditCard />,
		3: <RemoveRedEye />,
	};

	return (
		<Box
			className={clsx(classes.root, {
				[classes.active]: active,
				[classes.completed]: completed,
			})}
		>
			{icons[String(props.icon)]}
		</Box>
	);
};
