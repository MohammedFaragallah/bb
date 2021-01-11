import { ThemeOptions } from '@material-ui/core';
import cyan from '@material-ui/core/colors/cyan';
import grey from '@material-ui/core/colors/grey';
import lightBlue from '@material-ui/core/colors/lightBlue';
import red from '@material-ui/core/colors/red';

import { Language, PaletteType } from '@types';

const flippedGrey = {
	50: grey[900],
	100: grey[800],
	200: grey[700],
	300: grey[600],
	400: grey[500],
	500: grey[400],
	600: grey[300],
	700: grey[200],
	800: grey[100],
	900: grey[50],
};

interface Options {
	locale: Language;
	palette: PaletteType;
}

export const baseTheme = (options: Options): ThemeOptions => {
	const {
		locale: { dir: direction, fonts },
		palette: mode,
	} = options;

	return {
		direction,
		palette: {
			primary: cyan,
			secondary: lightBlue,
			error: red,
			grey: mode === 'light' ? grey : flippedGrey,
			mode,
		},
		typography: {
			fontFamily: fonts.join(','),
		},
	};
};
