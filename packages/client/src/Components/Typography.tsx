import styled from '@emotion/styled';
import {
	makeStyles,
	Theme,
	Typography as MuiTypography,
	TypographyProps,
} from '@material-ui/core';
import {
	compose,
	spacing,
	SpacingProps as SysSpacingProps,
	typography,
	TypographyProps as SysTypographyProps,
} from '@material-ui/system';
import clsx from 'clsx';
import upperFirst from 'lodash/upperFirst';
import React, { forwardRef } from 'react';

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

export const Typography: React.FC<Props> = forwardRef((props, ref) => {
	const classes = useStyles(props);
	const { push, className } = props;

	return (
		<StyledTypography
			className={clsx(push && classes.push, className)}
			ref={ref}
			{...props}
		/>
	);
});
