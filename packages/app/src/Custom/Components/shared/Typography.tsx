import {
	styled,
	Typography as MuiTypography,
	TypographyProps,
	makeStyles,
	Theme,
} from '@material-ui/core';
import {
	compose,
	typography,
	spacing,
	TypographyProps as SysTypographyProps,
	SpacingProps as SysSpacingProps,
} from '@material-ui/system';
import clsx from 'clsx';
import upperFirst from 'lodash/upperFirst';
import React from 'react';

const useStyles = makeStyles<Theme, Props>(theme => {
	const { breakpoints, spacing } = theme;

	return {
		push: ({ push }) => {
			const margin = `margin${upperFirst(push)}`;

			return {
				[margin]: spacing(1),
				[breakpoints.up('md')]: {
					[margin]: spacing(2),
				},
			};
		},
	};
});

const StyledTypography = styled(MuiTypography)(compose(typography, spacing));

interface Props extends SysSpacingProps, SysTypographyProps, TypographyProps {
	push?: 'right' | 'left';
}

export const Typography: React.FC<Props> = props => {
	const classes = useStyles(props);
	const { push, className } = props;

	return (
		<StyledTypography
			className={clsx(push && classes.push, className)}
			{...props}
		/>
	);
};
