import MuiSelect, {
	SelectProps as MuiSelectProps,
} from '@material-ui/core/Select';
import { FieldProps } from 'formik';
import React, { useEffect } from 'react';

import { ProductFlavorResponseSchema } from '@types';

interface SelectProps
	extends FieldProps,
		Omit<MuiSelectProps, 'name' | 'value'> {
	flavors: ProductFlavorResponseSchema[];
}

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

export const FlavorSelect: React.FC<SelectProps> = props => {
	const {
		form: {
			setFieldValue,
			values: { size },
		},
		flavors,
	} = props;
	useEffect(() => {
		setFieldValue(
			'flavor',
			flavors.find(item => item.productSizeId === size)?.id,
		);
	}, [flavors, setFieldValue, size]);

	return (
		<MuiSelect
			MenuProps={{ disableScrollLock: true, ...props.MenuProps }}
			{...fieldToSelect(props)}
		/>
	);
};
