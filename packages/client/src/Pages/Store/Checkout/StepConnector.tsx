import {
	makeStyles,
	StepConnector as MuiStepConnector,
	StepConnectorProps,
} from '@material-ui/core';
import React from 'react';

const useConnectorStyles = makeStyles(theme => {
	const { palette } = theme;

	return {
		alternativeLabel: {
			top: 22,
		},
		active: {
			'& $line': {
				backgroundImage:
					'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
			},
		},
		completed: {
			'& $line': {
				backgroundImage:
					'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
			},
		},
		line: {
			height: 3,
			border: 0,
			backgroundColor: palette.background.paper,
			borderRadius: 1,
		},
	};
});

interface Props extends StepConnectorProps {}

export const StepConnector: React.FC<Props> = props => {
	const classes = useConnectorStyles();

	return <MuiStepConnector classes={classes} {...props} />;
};
