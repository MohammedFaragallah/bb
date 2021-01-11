import { Avatar, Box, Grid, makeStyles, Paper } from '@material-ui/core';
import { Lock } from '@material-ui/icons';
import React from 'react';
import { useLocation, Outlet } from 'react-router-dom';

import { LabeledLink } from '@types';
import { Link, Page, Typography } from 'Components';
import { AuthPaths } from 'Constants';
import { useTranslation } from 'Hooks';

const useStyles = makeStyles(theme => {
	const { spacing, palette } = theme;

	return {
		root: {
			minHeight: '80vh',
			paddingTop: spacing(3),
		},
		image: {
			backgroundImage:
				'url(https://images.unsplash.com/photo-1561879707-5679cb7b3672?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max)',
			backgroundRepeat: 'no-repeat',
			backgroundSize: 'cover',
			backgroundPosition: 'center',
		},
		paper: {
			margin: spacing(0, 4),
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			height: '100%',
			justifyContent: 'center',
		},
		avatar: {
			margin: spacing(1),
			backgroundColor: palette.secondary.main,
		},
	};
});

type PageConfig = { actions?: LabeledLink[] };

enum AuthPages {
	login = 'login',
	signup = 'signup',
	forgot = 'forgot',
	reset = 'reset',
}

interface Props {}

export const AuthLayout: React.FC<Props> = () => {
	const translate = useTranslation();
	const location = useLocation();

	const classes = useStyles();

	const pageName = location.pathname.split('/').pop() as AuthPages;

	const title = translate(`pageTitle.${pageName}`);

	const actions: Record<AuthPages, PageConfig> = {
		login: {
			actions: [
				{ to: AuthPaths.SIGNUP, label: 'signup' },
				{ to: AuthPaths.FORGOT, label: 'forgot' },
			],
		},
		signup: {
			actions: [
				{ to: AuthPaths.LOGIN, label: 'login' },
				{ to: AuthPaths.FORGOT, label: 'forgot' },
			],
		},
		forgot: {
			actions: [
				{ to: AuthPaths.LOGIN, label: 'login' },
				{ to: AuthPaths.SIGNUP, label: 'signup' },
			],
		},
		reset: {
			actions: [
				{ to: AuthPaths.LOGIN, label: 'login' },
				{ to: AuthPaths.SIGNUP, label: 'signup' },
			],
		},
	};

	const PageConfig = actions[pageName];

	return (
		<Page titles={[title]}>
			<Grid className={classes.root} container>
				<Grid className={classes.image} item md={6} sm={4} xs={false} />
				<Grid component={Paper} item md={6} sm={8} xs={12}>
					<Box className={classes.paper}>
						<Box
							sx={{
								alignItems: 'center',
								display: 'flex',
								flexDirection: 'column',
								mb: 4,
							}}
						>
							<Avatar className={classes.avatar}>
								<Lock />
							</Avatar>
							<Typography fontWeight={700}>{title}</Typography>
						</Box>
						<Outlet />
						{PageConfig?.actions?.map(({ to, label }: any) => (
							<Link key={JSON.stringify(label)} to={to}>
								{translate(`message.${label}`)}
							</Link>
						))}
					</Box>
				</Grid>
			</Grid>
		</Page>
	);
};
