import { IconButton, InputAdornment } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Field, FieldAttributes } from 'formik';
import React from 'react';
import { useToggle } from 'react-use';

import { Icon, ToggleIcon } from 'Components';
import { TextField } from 'Components/Inputs';

interface Props extends FieldAttributes<any> {}

export const TogglePasswordVisibility: React.FC<Props> = props => {
	const [showPassword, setShowPassword] = useToggle(false);

	return (
		<Field
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						<IconButton
							aria-label="toggle password visibility"
							onClick={setShowPassword}
						>
							<ToggleIcon
								offIcon={
									<Icon push="right">
										<Visibility />
									</Icon>
								}
								on={showPassword}
								onIcon={
									<Icon push="right">
										<VisibilityOff />
									</Icon>
								}
							/>
						</IconButton>
					</InputAdornment>
				),
			}}
			component={TextField}
			fullWidth
			id="password"
			label="Password"
			name="password"
			required
			type={showPassword ? 'text' : 'password'}
			variant="outlined"
			{...props}
		/>
	);
};
