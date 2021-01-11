import { Box, makeStyles, useTheme } from '@material-ui/core';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';

import { Environment, ScrollToTop, TimerAlert, UpDown } from 'Components';
import { PopUpAD } from 'Components/ADs';
import { MessengerCustomerChat } from 'Components/Messenger';
import { Notifications } from 'Components/Notifications';
import { Search } from 'Components/Search';
import { AnimateLoading } from 'Layout/AnimateLoading';
import { BottomNavigation } from 'Layout/BottomNavigation';
import { Footer } from 'Layout/Footer';
import { Header } from 'Layout/Header';
import {
	LoadingSelector,
	LocaleSelector,
	PrintSelector,
	TimerSelector,
} from 'Selectors';

const useStyles = makeStyles({
	root: {
		display: 'flex',
		flexDirection: 'column',
		minHeight: '100vh',
		overflow: 'hidden',
	},
	footer: {
		marginTop: 'auto',
	},
});

interface Props {}

export const Layout: React.FC<Props> = props => {
	const { children } = props;
	const classes = useStyles();
	const theme = useTheme();
	const print = useSelector(PrintSelector);
	const { REACT_APP_FACEBOOK_APP_ID, REACT_APP_FACEBOOK_PAGE_ID } = process.env;
	const axiosLoading = useSelector(LoadingSelector);
	const timer = useSelector(TimerSelector);

	const {
		locale: { code, dir, isoCode },
	} = useSelector(LocaleSelector);

	return (
		<Box
			className={classes.root}
			sx={{
				bgcolor: 'background.paper',
			}}
		>
			<Box aria-hidden="true" id="top" />
			<Helmet>
				<html lang={code} />
				<body dir={dir} />
			</Helmet>
			<AnimateLoading loading={Boolean(axiosLoading)} />
			<Box
				sx={{
					displayPrint: 'none',
				}}
			>
				<Header />
			</Box>

			{children}

			<Box
				className={classes.footer}
				component="footer"
				sx={{
					displayPrint: 'none',
				}}
			>
				<Footer />
			</Box>
			<Environment>
				{!print && (
					<MessengerCustomerChat
						appId={REACT_APP_FACEBOOK_APP_ID}
						language={isoCode}
						pageId={REACT_APP_FACEBOOK_PAGE_ID}
						themeColor={theme.palette.secondary.main}
					/>
				)}
			</Environment>
			<PopUpAD />
			<BottomNavigation />
			<Notifications />
			<UpDown />
			<Box aria-hidden="true" id="bottom" />
			<Search />
			<ScrollToTop />
			<TimerAlert
				action={() => {
					window.location.reload();
				}}
				label="AUTO RESTART IN"
				open={timer}
				title="New version available restart to use it?"
			/>
		</Box>
	);
};
