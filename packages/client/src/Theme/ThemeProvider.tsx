import MuiThemeProvider from '@material-ui/styles/ThemeProvider';
import React from 'react';
import { useSelector } from 'react-redux';

import { LocaleSelector, PaletteTypeSelector } from 'Selectors';
import { getTheme } from 'Theme';

interface Props {}

export const ThemeProvider: React.FC<Props> = props => {
	const { children } = props;

	const { locale } = useSelector(LocaleSelector);
	const palette = useSelector(PaletteTypeSelector);

	const theme = getTheme(locale, palette);

	return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};
