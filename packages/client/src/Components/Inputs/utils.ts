import { TextFieldProps as MuiTextFieldProps } from '@material-ui/core/TextField';
import { FieldProps, getIn } from 'formik';

export interface TextFieldProps
	extends FieldProps,
		Omit<MuiTextFieldProps, 'name' | 'value' | 'error'> {}

export const fieldToTextField = (props: TextFieldProps): MuiTextFieldProps => {
	const {
		disabled,
		field,
		form: { isSubmitting, touched, errors },
		...rest
	} = props;
	const fieldError = getIn(errors, field.name);
	const showError = getIn(touched, field.name) && !!fieldError;

	return {
		...rest,
		...field,
		error: showError,
		helperText: showError ? fieldError : rest.helperText,
		disabled: disabled ?? isSubmitting,
		variant: rest.variant,
	};
};
