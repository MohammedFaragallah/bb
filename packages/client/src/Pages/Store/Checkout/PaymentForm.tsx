import { Box, makeStyles } from '@material-ui/core';
import React from 'react';

import { Button } from 'Components';
import { useTranslation } from 'Hooks';

const useStyles = makeStyles(theme => {
	const { spacing } = theme;
	return {
		buttons: {
			display: 'flex',
			justifyContent: 'flex-end',
		},
		button: {
			marginTop: spacing(3),
			marginLeft: spacing(1),
		},
	};
});

interface Props {
	handleNext: () => void;
	handleBack: () => void;
}

export const PaymentForm: React.FC<Props> = props => {
	const { handleBack, handleNext } = props;
	const classes = useStyles();
	const translate = useTranslation();

	return (
		<Box className={classes.buttons}>
			<Button className={classes.button} onClick={handleBack}>
				{translate('label.previous')}
			</Button>
			<Button
				className={classes.button}
				color="secondary"
				onClick={handleNext}
				variant="contained"
			>
				{translate('label.next')}
			</Button>
		</Box>
	);
};
