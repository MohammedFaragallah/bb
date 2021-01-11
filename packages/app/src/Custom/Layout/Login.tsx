import {
	Avatar,
	Box,
	Button,
	Card,
	CardActions,
	CircularProgress,
	Icon,
	makeStyles,
	TextField,
} from '@material-ui/core';
import React from 'react';
import { Notification, userLogin, useTranslate, ReduxState } from 'react-admin';
import { Field, Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';

import { Typography } from 'Custom';

const useStyles = makeStyles(theme => ({
	main: {
		display: 'flex',
		flexDirection: 'column',
		minHeight: '100vh',
		alignItems: 'center',
		justifyContent: 'flex-start',
		background:
			'url(https://images.unsplash.com/photo-1569277043775-e10462686018?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixlib=rb-1.2.1&q=80&w=1600)',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
	},
	card: {
		minWidth: 300,
		marginTop: '6em',
	},
	avatar: {
		margin: '1em',
		display: 'flex',
		justifyContent: 'center',
	},
	icon: {
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		padding: '0 1em 1em 1em',
	},
	input: {
		marginTop: '1em',
	},
	actions: {
		padding: '0 1em 1em 1em',
	},
}));

const renderInput: React.FC<any> = ({
	meta: { touched, error },
	input: { ...inputProps },
	...props
}) => (
	<TextField
		error={!!(touched && error)}
		helperText={touched && error}
		{...inputProps}
		{...props}
		fullWidth
	/>
);

export const Login: React.FC<any> = props => {
	const { location } = props;
	const translate = useTranslate();
	const classes = useStyles();
	const dispatch = useDispatch();
	const isLoading = useSelector((state: ReduxState) => state.admin.loading > 0);

	const login = (auth: object) =>
		dispatch(userLogin(auth, location.state?.nextPathname || '/'));

	const validate = (values: any) => {
		const errors: { [key: string]: any } = {};
		if (!values.username) {
			errors.username = translate('ra.validation.required');
		}
		if (!values.password) {
			errors.password = translate('ra.validation.required');
		}
		return errors;
	};

	return (
		<Form
			onSubmit={login}
			render={({ handleSubmit, submitting }) => (
				<form noValidate onSubmit={handleSubmit}>
					<Box className={classes.main}>
						<Card className={classes.card}>
							<Box className={classes.avatar}>
								<Avatar className={classes.icon}>
									<Icon>lock</Icon>
								</Avatar>
							</Box>
							<Box className={classes.form}>
								<Box className={classes.input}>
									<Field
										component={renderInput}
										disabled={isLoading}
										label={translate('ra.auth.username')}
										name="username"
									/>
								</Box>
								<Box className={classes.input}>
									<Field
										component={renderInput}
										disabled={isLoading}
										label={translate('ra.auth.password')}
										name="password"
										type="password"
									/>
								</Box>
							</Box>
							<CardActions className={classes.actions}>
								<Button
									color="primary"
									disabled={isLoading}
									fullWidth
									type="submit"
									variant="contained"
								>
									{(isLoading || submitting) && (
										<CircularProgress size={25} thickness={2} />
									)}
									{translate('ra.auth.sign_in')}
								</Button>
							</CardActions>
							<Typography
								color="error"
								p={2}
								style={{ backgroundColor: 'black' }}
							>
								Hint : o0frego0o@hotmail.com / p@ssw0rd
							</Typography>
						</Card>
						<Notification />
					</Box>
				</form>
			)}
			validate={validate}
		/>
	);
};
