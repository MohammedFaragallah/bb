import {
	BottomNavigation as MuiBottomNavigation,
	BottomNavigationAction,
	Hidden,
	makeStyles,
} from '@material-ui/core';
import { AccountCircle, Dvr, Home, Storefront } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Link } from 'Components';
import { Paths } from 'Constants';
import { useTranslation } from 'Hooks';

const useStyles = makeStyles(() => {
	return {
		root: {
			width: '100%',
			position: 'fixed',
			bottom: 0,
			zIndex: 2,
			justifyContent: 'space-around',
		},
		action: {
			minWidth: 0,
		},
	};
});

const actions = [
	{ label: 'home', icon: <Home />, to: Paths.HOME },
	{ label: 'articles', icon: <Dvr />, to: Paths.ARTICLES },
	{ label: 'store', icon: <Storefront />, to: Paths.STORE },
	{ label: 'profile', icon: <AccountCircle />, to: Paths.PROFILE },
];

interface Props {}

export const BottomNavigation: React.FC<Props> = () => {
	const classes = useStyles();
	const [value, setValue] = useState(0);
	const translate = useTranslation();
	const { pathname } = useLocation();

	useEffect(() => {
		const rootLocation = pathname.split('/')[1];
		const index = actions.findIndex(item => item.to === rootLocation);
		setValue(index);
	}, [pathname]);

	const valueChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Hidden smUp>
			<MuiBottomNavigation
				className={classes.root}
				onChange={valueChange}
				value={value}
			>
				{actions.map(({ icon, label, to }, index) => (
					<BottomNavigationAction
						className={classes.action}
						component={Link}
						icon={icon}
						key={label}
						label={translate(`pageTitle.${label}`)}
						showLabel
						to={to}
						underline="none"
					/>
				))}
			</MuiBottomNavigation>
		</Hidden>
	);
};
