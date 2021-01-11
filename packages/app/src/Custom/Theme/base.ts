import blueGrey from '@material-ui/core/colors/blueGrey';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import lightBlue from '@material-ui/core/colors/yellow';

enum Direction {
	right = 'rtl',
	left = 'ltr',
}

const baseTheme = ({ dir }: { dir: Direction }) => {
	const themeOpt = {
		dir,
		props: {
			MuiTypography: {
				variant: 'body1',
			},
		},
		shape: {
			borderRadius: 0,
		},
		typography: {
			fontFamily: ['Poppins', 'sans-serif'].join(','),
			useNextVariants: true,
		},
		overrides: {
			RaLayout: {
				appFrame: {
					marginTop: '62px !important',
				},
			},
		},
	};

	return themeOpt;
};

export const lightTheme = (dir: Direction) => ({
	...baseTheme({ dir }),
	palette: {
		primary: blueGrey,
		secondary: grey,
		error: red,
	},
});

export const darkTheme = (dir: Direction) => ({
	...baseTheme({ dir }),
	palette: {
		primary: lightBlue,
		secondary: grey,
		error: red,
		type: 'dark', // Switching the dark mode on is a single property value change.
	},
});
