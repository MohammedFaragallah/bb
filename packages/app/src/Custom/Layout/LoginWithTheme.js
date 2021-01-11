import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import { useSelector } from 'react-redux';

import { Login as ThemeLessLogin } from 'Custom/Layout/Login';
import { darkTheme, lightTheme } from 'Custom/Theme';

// We need to put the ThemeProvider decoration in another component
// Because otherwise the withStyles() HOC used in EnhancedLogin won't get
// the right theme
export const Login = props => {
	const theme = useSelector(state =>
		state.theme.type === 'dark' ? darkTheme : lightTheme,
	);
	const direction = useSelector(state => state.theme.direction);

	const Theme = createMuiTheme(theme(direction));
	return (
		<ThemeProvider theme={Theme}>
			<ThemeLessLogin {...props} />
		</ThemeProvider>
	);
};
