import { Close } from '@material-ui/icons';
import { SnackbarProvider, SnackbarProviderProps } from 'notistack';
import React from 'react';
import { useDispatch } from 'react-redux';

import { Button, Icon } from 'Components';
import { Notifier } from 'Components/Notifications/Notifier';
import { closeSnackbar } from 'Store';

interface Props {}

export const Notifications: React.FC<Props> = () => {
	const dispatch = useDispatch();

	const snackbarConfig: Partial<SnackbarProviderProps> = {
		maxSnack: 3,
		action: key => (
			<Button onClick={() => dispatch(closeSnackbar(key))}>
				<Icon inverted>
					<Close />
				</Icon>
			</Button>
		),
	};

	return (
		<SnackbarProvider {...snackbarConfig}>
			<Notifier />
		</SnackbarProvider>
	);
};
