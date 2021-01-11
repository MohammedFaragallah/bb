import { makeStyles, Paper, Step, StepLabel, Stepper } from '@material-ui/core';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { Page, Typography } from 'Components';
import { Paths } from 'Constants';
import { useTranslation } from 'Hooks';
import { AddressForm } from 'Pages/Store/Checkout/AddressForm';
import { PaymentForm } from 'Pages/Store/Checkout/PaymentForm';
import { Review } from 'Pages/Store/Checkout/Review';
import { StepConnector } from 'Pages/Store/Checkout/StepConnector';
import { StepIcon } from 'Pages/Store/Checkout/StepIcon';
import { CartSelector } from 'Selectors';

const useStyles = makeStyles(theme => {
	const { spacing, breakpoints } = theme;

	return {
		appBar: {
			position: 'relative',
		},
		layout: {
			width: 'auto',
			marginLeft: spacing(2),
			marginRight: spacing(2),
			[breakpoints.up(600)]: {
				width: 600,
				marginLeft: 'auto',
				marginRight: 'auto',
			},
		},
		paper: {
			maxWidth: breakpoints.values.md,
			margin: spacing(3, 'auto'),
			padding: spacing(2),
			[breakpoints.up(600)]: {
				marginTop: spacing(6),
				marginBottom: spacing(6),
				padding: spacing(3),
			},
		},
		stepper: {
			padding: spacing(3, 0, 5),
		},
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

interface Props {}

export const Checkout: React.FC<Props> = () => {
	const classes = useStyles();
	const [activeStep, setActiveStep] = useState(0);
	const translate = useTranslation();

	const cart = useSelector(CartSelector);

	if (!cart?.items.length)
		return <Navigate to={`${Paths.STORE}${Paths.CART}`} />;

	const steps = ['address', 'payment', 'review'];

	const handleNext = () => {
		setActiveStep(activeStep + 1);
	};

	const handleBack = () => {
		setActiveStep(activeStep - 1);
	};

	const getStepContent = (step: number) => {
		switch (step) {
			case 0:
				return <AddressForm handleNext={handleNext} />;
			case 1:
				return <PaymentForm handleBack={handleBack} handleNext={handleNext} />;
			case 2:
				return <Review handleBack={handleBack} handleNext={handleNext} />;
			default:
				throw new Error('Unknown step');
		}
	};

	return (
		<Page>
			<Paper className={classes.paper}>
				<Typography align="center" variant="h4">
					{translate('store.checkout')}
				</Typography>
				<Stepper
					activeStep={activeStep}
					alternativeLabel
					className={classes.stepper}
					connector={<StepConnector />}
				>
					{steps.map(step => (
						<Step key={step}>
							<StepLabel StepIconComponent={StepIcon}>
								{translate(`steps.${step}`)}
							</StepLabel>
						</Step>
					))}
				</Stepper>
				<>
					{activeStep === steps.length ? (
						<>
							<Typography gutterBottom variant="h5">
								Thank you for your order.
							</Typography>
							<Typography variant="subtitle1">
								We will email your order confirmation, and will send you an
								update when your order has shipped.
							</Typography>
						</>
					) : (
						getStepContent(activeStep)
					)}
				</>
			</Paper>
		</Page>
	);
};
