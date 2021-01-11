// import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';

// import { Direction, baseTheme } from './base';

// declare module '@material-ui/core/styles/createMuiTheme' {
// 	interface Theme {
// 		direction: Direction;
// 	}
// 	interface ThemeOptions {
// 		direction?: Direction;
// 	}
// }

// export const getTheme = (dir: Direction) => {
// 	const theme = responsiveFontSizes(createMuiTheme(baseTheme({ dir })));

// 	return { ...theme, overrides: {} };
// };

export * from './base';
