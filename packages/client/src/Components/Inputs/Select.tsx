import MuiSelect, {
	SelectProps as MuiSelectProps,
} from '@material-ui/core/Select';
import { FieldProps } from 'formik';
import React from 'react';

interface SelectProps
	extends FieldProps,
		Omit<MuiSelectProps, 'name' | 'value'> {}

const fieldToSelect = ({
	disabled,
	field,
	form: { isSubmitting },
	...props
}: SelectProps): MuiSelectProps => {
	return {
		disabled: disabled ?? isSubmitting,
		...props,
		...field,
	};
};

export const Select: React.FC<SelectProps> = props => {
	return (
		<MuiSelect
			MenuProps={{ disableScrollLock: true, ...props.MenuProps }}
			{...fieldToSelect(props)}
		/>
	);
};

Select.displayName = 'FormikMaterialUISelect';
