import {
	Box,
	CardActions,
	CardContent,
	Divider,
	FormHelperText,
	Grid,
	makeStyles,
	MenuItem,
	OutlinedInput,
	Select as MuiSelect,
} from '@material-ui/core';
import { SelectInputProps } from '@material-ui/core/Select/SelectInput';
import { sentenceCase } from 'change-case';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocalStorage } from 'react-use';
import { object, string } from 'yup';

import { AddressesNames, AddressSchema, StoreUser } from '@types';
import { Button } from 'Components';
import { Select, TextField } from 'Components/Inputs';
import { countOpts, egyptianCities } from 'Components/choices';
import { Resources, SHORTEST_STRING } from 'Constants';
import { app } from 'Helpers';
import { useTranslation } from 'Hooks';
import { UserSelector } from 'Selectors';
import { enqueueSnackbar, updateUser } from 'Store';

const useStyles = makeStyles(theme => {
	const { breakpoints } = theme;

	return {
		buttons: {
			display: 'flex',
			justifyContent: 'flex-end',
		},
		select: {
			width: '40%',
			[breakpoints.down('sm')]: {
				width: '60%',
			},
			[breakpoints.down('xs')]: {
				width: '100%',
			},
		},
	};
});

const AddressValidationSchema = object().shape({
	address1: string().ensure().trim().min(SHORTEST_STRING, 'Too Short!'),
	address2: string().ensure().trim().min(SHORTEST_STRING, 'Too Short!'),
});

interface Props {
	handleNext: () => void;
}

export const AddressForm: React.FC<Props> = props => {
	const { handleNext } = props;
	const classes = useStyles();
	const [
		addressName = AddressesNames.firstAddress,
		setAddress,
	] = useLocalStorage('addressName', AddressesNames.firstAddress);

	const title = sentenceCase(addressName);
	const dispatch = useDispatch();
	const translate = useTranslation();

	const user = useSelector(UserSelector) as StoreUser;
	const address = user[addressName];

	const handleChange: SelectInputProps['onChange'] = event => {
		setAddress(event.target.value as AddressesNames);
	};

	return (
		<Box>
			<Box
				sx={{
					alignItems: 'center',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<MuiSelect
					MenuProps={{ disableScrollLock: true }}
					className={classes.select}
					input={<OutlinedInput name="country" />}
					margin="dense"
					onChange={handleChange}
					value={addressName}
					variant="outlined"
				>
					{Object.values(AddressesNames).map(item => (
						<MenuItem key={item} value={item}>
							{sentenceCase(item)}
						</MenuItem>
					))}
				</MuiSelect>
				<FormHelperText>Please choose your shipping address</FormHelperText>
			</Box>
			<Formik
				enableReinitialize
				initialValues={address}
				onSubmit={async (values, { setSubmitting }) => {
					try {
						const newAddress: AddressSchema = await app
							.service(Resources.ADDRESSES)
							.update(address.id, values);

						dispatch(updateUser({ [addressName]: newAddress }, title, false));
						handleNext();
						setSubmitting(false);
					} catch (error) {
						dispatch(
							enqueueSnackbar({
								message: JSON.stringify({ error, values }),
								options: { variant: 'warning' },
							}),
						);
						setSubmitting(false);
					}
				}}
				validationSchema={AddressValidationSchema}
			>
				{({ isSubmitting, values }) => (
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
										inputProps={{ id: 'country' }}
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
											inputProps={{
												id: 'city',
											}}
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
						<CardActions className={classes.buttons}>
							<Button
								aria-label="save"
								color="secondary"
								pending={isSubmitting}
								type="submit"
								variant="contained"
							>
								{translate('label.next')}
							</Button>
						</CardActions>
					</Form>
				)}
			</Formik>
		</Box>
	);
};
