import {
	CardActions,
	CardContent,
	CardHeader,
	Divider,
	Grid,
	MenuItem,
	OutlinedInput,
} from '@material-ui/core';
import { sentenceCase } from 'change-case';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { object, string } from 'yup';

import { AddressesNames, AddressSchema, StoreUser } from '@types';
import { Button, Card } from 'Components';
import { Select, TextField } from 'Components/Inputs';
import { countOpts, egyptianCities } from 'Components/choices';
import { Resources, SHORTEST_STRING } from 'Constants';
import { app } from 'Helpers';
import { useTranslation } from 'Hooks';
import { UserSelector } from 'Selectors';
import { enqueueSnackbar, updateUser } from 'Store';

const AddressValidationSchema = object().shape({
	address1: string().ensure().trim().min(SHORTEST_STRING, 'Too Short!'),
	address2: string().ensure().trim().min(SHORTEST_STRING, 'Too Short!'),
});

interface Props {}

export const Address: React.FC<Props> = () => {
	const dispatch = useDispatch();
	const translate = useTranslation();
	const user = useSelector(UserSelector) as StoreUser;
	const { pathname } = useLocation();

	const addressName = pathname.split('/')[2] as AddressesNames;

	const address = user[addressName];

	return (
		<Card plain>
			<CardHeader
				subheader="This information can be edited"
				title={translate(`pageTitle.${addressName}`)}
			/>
			<Divider />
			<Formik
				initialValues={address}
				onSubmit={async (values, { setSubmitting }) => {
					try {
						const newAddress: AddressSchema = await app
							.service(Resources.ADDRESSES)
							.update(address.id, values);

						dispatch(
							updateUser(
								{ [addressName]: newAddress },
								sentenceCase(addressName),
								false,
							),
						);

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
				validationSchema={AddressValidationSchema}
			>
				{({ isSubmitting, dirty, values }) => (
					<Form>
						<CardContent>
							<Grid container spacing={3}>
								<Grid item md={6} xs={12}>
									<Field
										component={TextField}
										fullWidth
										label="address1"
										margin="dense"
										name="address1"
										variant="outlined"
									/>
								</Grid>
								<Grid item md={6} xs={12}>
									<Field
										component={TextField}
										fullWidth
										label="address2"
										margin="dense"
										name="address2"
										variant="outlined"
									/>
								</Grid>
								<Grid item md={6} xs={12}>
									<Field
										component={TextField}
										fullWidth
										label="region"
										margin="dense"
										name="region"
										variant="outlined"
									/>
								</Grid>
								<Grid item md={6} xs={12}>
									<Field
										component={Select}
										fullWidth
										input={<OutlinedInput name="country" />}
										inputProps={{
											id: 'country',
										}}
										margin="dense"
										name="country"
										variant="outlined"
									>
										{countOpts.map(option => (
											<MenuItem key={option.name} value={option.name}>
												{option.name}
											</MenuItem>
										))}
									</Field>
								</Grid>
								{values.country === 'Egypt' && (
									<Grid item md={6} xs={12}>
										<Field
											component={Select}
											fullWidth
											input={<OutlinedInput name="city" />}
											inputProps={{ id: 'city' }}
											margin="dense"
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
								)}
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
