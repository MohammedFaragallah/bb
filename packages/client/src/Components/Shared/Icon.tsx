import {
	Icon as MuiIcon,
	IconProps as MuiIconProps,
	makeStyles,
	Theme,
} from '@material-ui/core';
import clsx from 'clsx';
import upperFirst from 'lodash/upperFirst';
import React from 'react';
type BGColor = 'default' | 'primary' | 'secondary' | 'danger' | 'white';

type Color =
	| 'inherit'
	| 'primary'
	| 'secondary'
	| 'action'
	| 'error'
	| 'disabled';

export interface IconProps extends MuiIconProps, StyleProps {
	className?: string;
	fontAwesomeProps?: object;
	icon?: string;
	inverted?: boolean;
	link?: boolean;
	color?: Color;
	bgColor?: BGColor;
}

const colors = [
	'inherit',
	'primary',
	'secondary',
	'action',
	'error',
	'disabled',
];

const injectColor = (color: IconProps['color']): IconProps['color'] =>
	color && colors.includes(color) ? color : undefined;

interface StyleProps {
	push?: 'left' | 'right';
	shape?: 'square' | 'circular' | 'round';
	size?: 'small' | 'big' | 'large';
}

const shapes = {
	square: 0,
	circular: '50%',
	round: 4,
};

const sizes = {
	small: 20,
	big: 28,
	large: 32,
};

const useStyles = makeStyles<Theme, StyleProps>(theme => {
	const { palette, spacing } = theme;

	const invertedColor = palette.common.white;
	return {
		push: ({ push }) => ({ [`margin${upperFirst(push)}`]: spacing(1) }),
		size: ({ size }) => ({
			fontSize: size && sizes[size],
			'& svg': { fontSize: 'inherit' },
		}),
		shape: ({ shape }) => ({ borderRadius: shape && shapes[shape] }),
		root: {
			display: 'flex',
			// STANDALONE
			verticalAlign: 'sub',
			'&.-link': {
				cursor: 'pointer',
				'&:not([class*="-color"])': {
					color: palette.text.primary,
				},
				'&:hover': {
					transform: 'scale(1.2)',
				},
			},
			// colors
			'&.-color-success': {
				color: palette.success.main,
			},
			'&.-color-danger': {
				color: palette.error.main,
			},
			'&.-inverted': {
				color: invertedColor,
			},
			// icon
			'& .MuiIcon--fa': {
				verticalAlign: 'unset',
				padding: 2,
				'&.svg-inline--fa': {
					width: '1em',
				},
			},
			'& i.MuiIcon--fa': {
				display: 'block',
				'&:before': {
					display: 'block',
					fontSize: 20,
				},
			},
			// background
			'&[class*="-bg"]': {
				width: '1.5em',
				height: '1.5em',
				padding: '0.25em',
			},
			'&.-bg-default': {
				backgroundColor: palette.grey[200],
			},
			'&.-bg-primary': {
				backgroundColor: palette.primary.main,
				color: invertedColor,
			},
			'&.-bg-secondary': {
				backgroundColor: palette.secondary.main,
				color: invertedColor,
			},
			'&.-bg-danger': {
				backgroundColor: palette.error.main,
				color: invertedColor,
			},
			'&.-bg-white': {
				backgroundColor: invertedColor,
			},
			'&.-bg-lightPrimary': {
				backgroundColor: palette.primary.light,
			},
			'&.-bg-lightSecondary': {
				backgroundColor: palette.secondary.light,
			},
			// COMBINATION
			'&.-bg-default.-link.-inverted': {
				color: palette.text.primary,
			},
			'&.-link.-inverted:not([class*="-color"])': {
				color: invertedColor,
			},
		},
	};
});

const Icon: React.FC<IconProps> = ({
	bgColor,
	className,
	children,
	color,
	fontAwesomeProps,
	icon,
	inverted,
	link,
	push,
	size,
	shape,
	...props
}) => {
	const mainIcon = children || icon;
	const classes = useStyles({ shape, push, size });
	return (
		<MuiIcon
			{...props}
			className={clsx(
				'MuiIcon-root',
				className,
				classes.root,
				bgColor && `-bg-${bgColor}`,
				color && `-color-${color}`,
				inverted && '-inverted',
				link && '-link',
				size && classes.size,
				push && classes.push,
				shape && classes.shape,
			)}
			color={injectColor(color)}
		>
			{typeof mainIcon === 'string' && mainIcon.includes('fa-') ? (
				<i className={clsx('MuiIcon--fa', mainIcon)} {...fontAwesomeProps} />
			) : (
				mainIcon
			)}
		</MuiIcon>
	);
};

Icon.defaultProps = {
	bgColor: undefined,
	className: '',
	color: undefined,
	fontAwesomeProps: {},
	icon: '',
	inverted: false,
	link: false,
};

export { Icon };
