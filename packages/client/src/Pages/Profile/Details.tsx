import {
	CardActions,
	CardContent,
	CardHeader,
	Divider,
	FormControl,
	FormHelperText,
	Grid,
	InputAdornment,
	ListItemText,
	MenuItem,
	OutlinedInput,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { Field, FieldArray, Form, Formik } from 'formik';
import { toWordsOrdinal } from 'number-to-words';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { array, object, string } from 'yup';

import { Goals, Title, UserSchema } from '@types';
import { Button, Card, EmptyOption, Typography } from 'Components';
import { Select, TextField } from 'Components/Inputs';
import { MAX_USER_NAME_LENGTH, SHORTEST_STRING } from 'Constants';
import { stringToChoice } from 'Helpers';
import { useTranslation } from 'Hooks';
import { UserSelector } from 'Selectors';
import { enqueueSnackbar, updateUser } from 'Store';
import { LocalizationLanguages } from 'localization';

const DetailsSchema = object().shape({
	userName: string()
		.trim()
		.min(SHORTEST_STRING, 'Too Short!')
		.max(MAX_USER_NAME_LENGTH, 'Too Long!')
		.required('Required'),
	certifications: string().trim().min(SHORTEST_STRING, 'Too Short!'),
	biography: string().trim().min(SHORTEST_STRING, 'Too Short!'),
	links: array(string().trim().url()),
});

const goalOptions = Object.keys(Goals).map(stringToChoice);
const titleOptions = Object.keys(Title).map(stringToChoice);

interface Props {}

export const Details: React.FC<Props> = () => {
	const dispatch = useDispatch();
	const user = useSelector(UserSelector) as UserSchema;
	const Languages = Object.values(LocalizationLanguages);
	const translate = useTranslation();

	return (
		<Card plain>
			<CardHeader subheader="This information can be edited" title="Profile" />
			<Divider />
			<Formik
				initialValues={user}
				onSubmit={async (values, { setSubmitting }) => {
					try {
						// TODO: unique links/no empty links
						dispatch(updateUser(values));

						setSubmitting(false);
					} catch (error) {
						dispatch(
							enqueueSnackbar({
								message: JSON.stringify({ error, values }),
								options: {
									variant: 'warning',
								},
							}),
						);
						setSubmitting(false);
					}
				}}
				validationSchema={DetailsSchema}
			>
				{({ isSubmitting, dirty, values }) => (
					<Form>
						<CardContent>
							<Grid container spacing={3}>
								<Grid item md={6} xs={12}>
									<Field
										component={TextField}
										fullWidth
										label="user name"
										margin="dense"
										name="userName"
										variant="outlined"
									/>
								</Grid>
								<Grid item md={6} xs={12}>
									<Field
										component={TextField}
										fullWidth
										label="Phone Number"
										margin="dense"
										name="phone"
										variant="outlined"
									/>
								</Grid>
								<Grid item md={3} xs={6}>
									<Field
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">Cm</InputAdornment>
											),
										}}
										component={TextField}
										fullWidth
										label="Height"
										margin="dense"
										name="height"
										type="number"
										variant="outlined"
									/>
								</Grid>
								<Grid item md={3} xs={6}>
									<Field
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">Kg</InputAdornment>
											),
										}}
										component={TextField}
										fullWidth
										label="Weight"
										margin="dense"
										name="weight"
										type="number"
										variant="outlined"
									/>
								</Grid>
								<Grid item md={6} xs={12} />
								<Grid item md={6} xs={12}>
									<Field
										component={Select}
										fullWidth
										input={<OutlinedInput name="goal" />}
										inputProps={{
											id: 'goal',
										}}
										margin="dense"
										name="goal"
										variant="outlined"
									>
										<EmptyOption />
										{goalOptions.map(option => (
											<MenuItem key={option.id} value={option.id}>
												{option.name}
											</MenuItem>
										))}
									</Field>
								</Grid>
								<Grid item md={6} xs={12}>
									<Field
										component={Select}
										fullWidth
										input={
											<OutlinedInput id="outlined-age-simple" name="age" />
										}
										inputProps={{
											id: 'preferredLanguage',
										}}
										margin="dense"
										name="preferredLanguage"
										variant="outlined"
									>
										<EmptyOption />
										{Languages.map(({ label, code }) => (
											<MenuItem key={label} value={code}>
												{label}
											</MenuItem>
										))}
									</Field>
								</Grid>
								<Grid item md={6} xs={12}>
									<Field
										component={Select}
										fullWidth
										input={<OutlinedInput name="gender" />}
										inputProps={{
											id: 'gender',
										}}
										margin="dense"
										name="gender"
										variant="outlined"
									>
										<EmptyOption />
										<MenuItem value="Male">Male</MenuItem>
										<MenuItem value="Female">Female</MenuItem>
									</Field>
								</Grid>
								<Grid item md={6} xs={12}>
									<FormControl fullWidth>
										<Field
											component={Select}
											displayEmpty
											fullWidth
											input={<OutlinedInput name="titles" />}
											inputProps={{ id: 'titles' }}
											margin="dense"
											multiple
											name="titles"
											placeholder="Titles"
											renderValue={(selected: string[]) => {
												const MAX_TITLES = 2;
												if (selected) {
													if (selected.length > MAX_TITLES)
														return selected.pop();

													return selected.join(', ');
												}
											}}
											variant="outlined"
										>
											{titleOptions.map(option => (
												<MenuItem key={option.id} value={option.id}>
													<ListItemText
														primary={<Typography>{option.name}</Typography>}
													/>
												</MenuItem>
											))}
										</Field>
										<FormHelperText>You Should Select Only Two</FormHelperText>
									</FormControl>
								</Grid>
								<Grid item md={12} xs={12}>
									<Field
										component={TextField}
										fullWidth
										label="Certifications"
										margin="dense"
										multiline
										name="certifications"
										rows={3}
										variant="outlined"
									/>
								</Grid>
								<Grid item md={12} xs={12}>
									<Field
										component={TextField}
										fullWidth
										label="Biography"
										margin="dense"
										multiline
										name="biography"
										rows={5}
										variant="outlined"
									/>
								</Grid>
								<FieldArray
									name="links"
									render={arrayHelpers => (
										<>
											{values.links.map((link, index) => (
												<Grid item key={link} md={6} xs={12}>
													<Field
														component={TextField}
														fullWidth
														label={`${toWordsOrdinal(index + 1)} link`}
														margin="dense"
														name={`links.${index}`}
														variant="outlined"
													/>
												</Grid>
											))}
											<Grid item md={6} xs={12}>
												<FormControl margin="dense">
													<Button
														color="secondary"
														fullWidth
														onClick={() => arrayHelpers.push('')}
														startIcon={<Add />}
														variant="contained"
													>
														Add new link
													</Button>
												</FormControl>
											</Grid>
											{values.links.length % 2 === 0 && (
												<Grid item md={6} xs={12} />
											)}
										</>
									)}
								/>
								<Grid item md={6} xs={12}>
									<Field
										component={TextField}
										fullWidth
										label="bornAt"
										margin="dense"
										name="bornAt"
										type="date"
									/>
								</Grid>
							</Grid>
						</CardContent>
						<Divider />
						<CardActions>
							<Button
								aria-label="save"
								color="secondary"
								disabled={!dirty}
								pending={isSubmitting}
								type="submit"
								variant="contained"
							>
								{translate('label.submit')}
							</Button>
						</CardActions>
					</Form>
				)}
			</Formik>
		</Card>
	);
};
