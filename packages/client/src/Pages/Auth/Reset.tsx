import { makeStyles } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { StringParam, useQueryParams } from 'use-query-params';
import { object, string } from 'yup';

import { Button } from 'Components';
import { AuthPaths, Resources, SHORTEST_PASSWORD } from 'Constants';
import { app } from 'Helpers';
import { useTranslation } from 'Hooks';
import { TogglePasswordVisibility } from 'Pages/Auth/TogglePasswordVisibility';
import { enqueueSnackbar } from 'Store';

const ResetSchema = object().shape({
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

export const Reset: React.FC<Props> = () => {
	const navigate = useNavigate();
	const classes = useStyles();
	const dispatch = useDispatch();
	const translate = useTranslation();
	const [{ token }] = useQueryParams({ token: StringParam });

	return (
		<Formik
			initialValues={{ password: '' }}
			onSubmit={async ({ password }, { setSubmitting }) => {
				try {
					app
						.service(Resources.AUTH_MANAGEMENT)
						.create({ action: 'resetPwdLong', value: { token, password } })
						.then(() => {
							dispatch(
								enqueueSnackbar({
									message: 'Password reset',
									options: { variant: 'success' },
								}),
							);
							navigate(AuthPaths.LOGIN);
						});
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
			validationSchema={ResetSchema}
		>
			{({ isSubmitting, isValid }) => {
				return (
					<Form>
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
							{translate('label.submit')}
						</Button>
					</Form>
				);
			}}
		</Formik>
	);
};
