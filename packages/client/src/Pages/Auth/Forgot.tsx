import { makeStyles } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { object, string } from 'yup';

import { Button } from 'Components';
import { TextField } from 'Components/Inputs';
import { Resources } from 'Constants';
import { app } from 'Helpers';
import { useTranslation } from 'Hooks';
import { enqueueSnackbar } from 'Store';

const ForgotSchema = object().shape({
	email: string().ensure().trim().email('Invalid email').required('Required'),
});

const useStyles = makeStyles(theme => {
	const { spacing } = theme;

	return {
		submit: {
			margin: spacing(3, 0, 2),
		},
	};
});

interface Props {}

export const Forgot: React.FC<Props> = () => {
	const translate = useTranslation();

	const classes = useStyles();
	const dispatch = useDispatch();

	return (
		<Formik
			initialValues={{ email: '' }}
			onSubmit={async (value, { setSubmitting }) => {
				try {
					const authResponse = await app
						.service(Resources.AUTH_MANAGEMENT)
						.create({ action: 'sendResetPwd', value });

					dispatch(
						enqueueSnackbar({
							message: `Password reset sent to ${authResponse.email}`,
							options: { variant: 'success' },
						}),
					);
				} catch (error) {
					dispatch(
						enqueueSnackbar({
							message: error.message,
							options: { variant: 'warning' },
						}),
					);
					setSubmitting(false);
				}
			}}
			validationSchema={ForgotSchema}
		>
			{({ isSubmitting, isValid }) => {
				return (
					<Form style={{ width: '100%' }}>
						<Field
							autoComplete="email"
							component={TextField}
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							required
							variant="outlined"
						/>
						<Button
							aria-label="submit forgot password"
							className={classes.submit}
							color="secondary"
							disabled={!isValid}
							fullWidth
							pending={isSubmitting}
							type="submit"
							variant="contained"
						>
							{translate('label.submit')}
						</Button>
					</Form>
				);
			}}
		</Formik>
	);
};
