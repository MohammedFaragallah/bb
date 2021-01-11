import { makeStyles } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { object, string } from 'yup';

import { Button } from 'Components';
import { TextField } from 'Components/Inputs';
import { SHORTEST_PASSWORD } from 'Constants';
import { app } from 'Helpers';
import { useTranslation } from 'Hooks';
import { SocialLoginButtons } from 'Pages/Auth/SocialLoginButtons';
import { TogglePasswordVisibility } from 'Pages/Auth/TogglePasswordVisibility';
import { enqueueSnackbar, loginSuccess } from 'Store';

const LoginSchema = object().shape({
	email: string().ensure().trim().email('Invalid email').required('Required'),
	password: string()
		.ensure()
		.trim()
		.min(SHORTEST_PASSWORD, 'Too Short!')
		.required('Required'),
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

export const Login: React.FC<Props> = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const translate = useTranslation();

	return (
		<Formik
			initialValues={{ email: '', password: '' }}
			onSubmit={async ({ email, password }, { setSubmitting }) => {
				try {
					const authResponse = await app.authenticate({
						strategy: 'local',
						email: email.trim(),
						password: password.trim(),
					});

					dispatch(loginSuccess(authResponse));
				} catch (error) {
					dispatch(
						enqueueSnackbar({
							message: error.message,
							options: {
								variant: 'warning',
							},
						}),
					);
					setSubmitting(false);
				}
			}}
			validationSchema={LoginSchema}
		>
			{({ isSubmitting, isValid }) => {
				return (
					<Form>
						<Field
							autoComplete="email"
							component={TextField}
							fullWidth
							id="email"
							label="Email Address"
							margin="normal"
							name="email"
							required
							variant="outlined"
						/>
						<TogglePasswordVisibility autoComplete="current-password" />
						<Button
							aria-label="submit sign in"
							className={classes.submit}
							color="secondary"
							disabled={!isValid}
							fullWidth
							pending={isSubmitting}
							type="submit"
							variant="contained"
						>
							{translate('pageTitle.login')}
						</Button>
						<SocialLoginButtons />
					</Form>
				);
			}}
		</Formik>
	);
};
