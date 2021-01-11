import {
	Box,
	FormHelperText,
	Grid,
	LinearProgress,
	makeStyles,
	MenuItem,
	OutlinedInput,
} from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import React, { ReactNode, useState } from 'react';
import { useDispatch } from 'react-redux';
import { object, string } from 'yup';
import zxcvbn from 'zxcvbn';

import { Button } from 'Components';
import { Select, TextField } from 'Components/Inputs';
import { egyptianCities } from 'Components/choices';
import { MAX_USER_NAME_LENGTH, Resources, SHORTEST_STRING } from 'Constants';
import { app } from 'Helpers';
import { useErrorNotifications, useTranslation } from 'Hooks';
import { SocialLoginButtons } from 'Pages/Auth/SocialLoginButtons';
import { TogglePasswordVisibility } from 'Pages/Auth/TogglePasswordVisibility';
import { loginSuccess } from 'Store';

const SignupSchema = object().shape({
	userName: string()
		.ensure()
		.trim()
		.min(SHORTEST_STRING, 'Too Short!')
		.max(MAX_USER_NAME_LENGTH, 'Too Long!')
		.required('Required'),
	email: string().ensure().trim().email('Invalid email').required('Required'),
	city: string().required('Required'),
	password: string().ensure().trim().min(6, 'Too Short!').required('Required'),
});

const strength = ['Worst', 'Bad', 'Weak', 'Good', 'Strong'];

const useStyles = makeStyles(theme => {
	const { spacing, palette } = theme;

	return {
		submit: {
			margin: spacing(3, 0, 2),
		},
		gradient: {
			backgroundImage: `linear-gradient(to right, ${palette.error.main}, ${palette.warning.main}, ${palette.success.main})`,
		},
	};
});

interface Props {}

export const Signup: React.FC<Props> = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const translate = useTranslation();

	const [score, setScore] = useState(0);
	const [helperText, setHelperText] = useState<ReactNode>('');
	const notifyErrors = useErrorNotifications();

	return (
		<Formik
			initialValues={{
				userName: '',
				email: '',
				password: '',
				city: 'Cairo',
			}}
			onSubmit={async (
				{ userName, email, password, city },
				{ setSubmitting },
			) => {
				try {
					await app.service(Resources.USERS).create({
						userName,
						email,
						password,
						firstAddress: { city },
					});
					const authResponse = await app.authenticate({
						strategy: 'local',
						userName: userName.trim(),
						email: email.trim(),
						password: password.trim(),
					});

					dispatch(loginSuccess(authResponse));
					setSubmitting(false);
				} catch (error) {
					notifyErrors(error);
					setSubmitting(false);
				}
			}}
			validationSchema={SignupSchema}
		>
			{({ isSubmitting, isValid }) => (
				<Form>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Field
								component={TextField}
								fullWidth
								id="userName"
								label="Name"
								name="userName"
								required
								variant="outlined"
							/>
						</Grid>
						<Grid item xs={12}>
							<Field
								component={TextField}
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								required
								variant="outlined"
							/>
						</Grid>
						<Grid item xs={12}>
							<Field
								component={Select}
								fullWidth
								input={<OutlinedInput name="city" />}
								inputProps={{
									id: 'city',
								}}
								name="city"
								variant="outlined"
							>
								{egyptianCities.map(option => {
									return (
										<MenuItem key={option.id} value={option.id}>
											{option.name}
										</MenuItem>
									);
								})}
							</Field>
						</Grid>
						<Grid item xs={12}>
							<Box
								sx={{
									position: 'relative',
								}}
							>
								<TogglePasswordVisibility
									helperText={helperText}
									validate={(password: string) => {
										const { score, feedback } = zxcvbn(password);

										feedback.suggestions.unshift(
											`Password strength: ${strength[score]} `,
										);

										setScore(score);
										setHelperText(
											feedback.suggestions.map((item, index) => (
												<FormHelperText
													component="span"
													key={`${item}${index}`}
													style={{ margin: 0, display: 'block' }}
												>
													{item}
												</FormHelperText>
											)),
										);

										return undefined;
									}}
								/>
								<LinearProgress
									classes={{ barColorPrimary: classes.gradient }}
									style={{
										position: 'absolute',
										borderBottomRightRadius: 15,
										borderBottomLeftRadius: 15,
										width: 'calc(100% - 2px)',
										top: 51,
										left: 1,
									}}
									value={score * 25}
									variant="determinate"
								/>
							</Box>
						</Grid>
					</Grid>
					<Button
						className={classes.submit}
						color="secondary"
						disabled={!isValid}
						fullWidth
						pending={isSubmitting}
						type="submit"
						variant="contained"
					>
						{translate('pageTitle.signup')}
					</Button>
					<SocialLoginButtons />
				</Form>
			)}
		</Formik>
	);
};
