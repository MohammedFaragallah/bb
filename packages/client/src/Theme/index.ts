import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';

import { Language, PaletteType } from '@types';
import { baseTheme } from 'Theme/base';

declare module '@material-ui/core/styles/createMuiTheme' {
	interface Theme {}
	interface ThemeOptions {}
}

export const getTheme = (locale: Language, palette: PaletteType) =>
	responsiveFontSizes(createMuiTheme(baseTheme({ locale, palette })));
