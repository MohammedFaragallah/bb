import MuiTextField from '@material-ui/core/TextField';
import React from 'react';

import { fieldToTextField, TextFieldProps } from 'Components/Inputs';

export const TextField: React.FC<TextFieldProps> = props => {
	return <MuiTextField {...fieldToTextField(props)} />;
};

TextField.displayName = 'FormikMaterialUITextField';
