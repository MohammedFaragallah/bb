import {
	Box,
	makeStyles,
	TextField,
	TextFieldProps as MuiTextFieldProps,
} from '@material-ui/core';
import clsx from 'clsx';
import { FieldProps } from 'formik';
import isNumber from 'lodash/isNumber';
import React from 'react';

import { fieldToTextField } from 'Components/Inputs';

const useStyles = makeStyles(theme => {
	const { palette, spacing } = theme;
	const ratio = 5;

	return {
		root: {
			color: palette.grey[700],
			height: spacing(ratio),
			padding: spacing(0, ratio),
			border: `1px solid ${palette.grey[400]}`,
			position: 'relative',
			overflow: 'hidden',
			borderRadius: spacing(0.5),
		},
		stepBut: {
			border: 0,
			fontSize: 0,
			background: palette.grey.A100,
			height: '100%',
			width: spacing(ratio),
			position: 'absolute',
			'&:hover': {
				background: palette.grey.A200,
			},
		},
		leftButton: {
			left: 0,
			borderRadius: '2px 0 0 2px',
		},
		rightButton: {
			right: 0,
			borderRadius: '0 2px 2px 0',
		},
		minus: {
			color: palette.grey[700],
			fontSize: 0,
			width: spacing(2),
			borderTop: `2px solid ${palette.grey[700]}`,
			display: 'inline-block',
			position: 'relative',
		},
		plus: {
			'&::before': {
				content: '""',
				width: spacing(2),
				borderTop: `2px solid ${palette.grey[700]}`,
				display: 'inline-block',
				transform: 'rotate(90deg)',
				transformOrigin: 'center',
				position: 'absolute',
				top: '-2px',
				left: 0,
			},
		},
		InputPropsStyles: {
			border: `1px solid ${palette.grey[400]}`,
			borderWidth: '0 1px',
			borderRadius: 0,
			textAlign: 'center',
			display: 'block',
			outline: 'none',
			width: '100%',
			maxWidth: '100%',
			height: '100%',
		},
		inputPropsStyles: {
			textAlign: 'center',
			height: '100%',
			padding: 0,
			'&::-webkit-inner-spin-button': {
				appearance: 'none',
			},
			appearance: 'textfield',
		},
	};
});

interface Props
	extends FieldProps,
		Omit<MuiTextFieldProps, 'name' | 'value' | 'error'> {
	min?: number;
	max?: number;
	step?: number;
}

export const ButtonsInputNumber: React.FC<Props> = props => {
	const {
		max,
		min,
		step = 1,
		field: { name },
		form: { setFieldValue, values },
	} = props;
	const classes = useStyles();

	const onDecrement = () => {
		const newValue = values[name] - step;

		if (isNumber(min)) {
			if (!(newValue < min)) setFieldValue(name, newValue);
		} else setFieldValue(name, newValue);
	};

	const onIncrement = () => {
		const newValue = values[name] + step;
		if (isNumber(max)) {
			if (!(newValue > max)) setFieldValue(name, newValue);
		} else setFieldValue(name, newValue);
	};

	return (
		<Box className={classes.root}>
			<button
				className={clsx(classes.stepBut, classes.leftButton)}
				onClick={onDecrement}
				type="button"
			>
				<span className={classes.minus} />
			</button>
			<TextField
				InputLabelProps={{
					disabled: true,
				}}
				InputProps={{
					disableUnderline: true,
					className: classes.InputPropsStyles,
				}}
				inputProps={{
					className: classes.inputPropsStyles,
				}}
				style={{
					height: '100%',
				}}
				type="number"
				{...fieldToTextField(props)}
				variant="standard"
			/>
			<button
				className={clsx(classes.stepBut, classes.rightButton)}
				onClick={onIncrement}
				type="button"
			>
				<span className={clsx(classes.minus, classes.plus)} />
			</button>
		</Box>
	);
};
