import { createMuiTheme } from '@material-ui/core';
import React from 'react';
import { Layout as RALayout } from 'react-admin';
import { useSelector } from 'react-redux';

import { AppBar } from 'Custom/Layout/AppBar';
import { Menu } from 'Custom/Layout/Menu';
import { darkTheme, lightTheme } from 'Custom/Theme';

export const Layout = props => {
	const theme = useSelector(state =>
		state.theme.type === 'dark' ? darkTheme : lightTheme,
	);

	const direction = useSelector(state => state.theme.direction);

	const Theme = createMuiTheme(theme(direction));
	return <RALayout {...props} appBar={AppBar} menu={Menu} theme={Theme} />;
};
