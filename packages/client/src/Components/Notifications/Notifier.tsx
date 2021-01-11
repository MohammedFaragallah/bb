import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Notification } from '@types';
import { NotificationsSelector } from 'Selectors';
import { removeSnackbar } from 'Store';

type Key = Notification['key'];

interface Props {}

let displayed: Key[] = [];

export const Notifier: React.FC<Props> = () => {
	const dispatch = useDispatch();
	const notifications = useSelector(NotificationsSelector);
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const storeDisplayed = (id: Key) => {
		displayed = [...displayed, id];
	};

	const removeDisplayed = (id: Key) => {
		displayed = [...displayed.filter(key => id !== key)];
	};

	useEffect(() => {
		notifications.forEach(({ key, message, options, dismissed = false }) => {
			if (dismissed) {
				// dismiss snackbar using notistack
				closeSnackbar(key);
				return;
			}

			// do nothing if snackbar is already displayed
			if (displayed.includes(key)) return;

			// display snackbar using notistack
			enqueueSnackbar(message, {
				key,
				...options,
				onExited: (event, myKey) => {
					// removes this snackbar from redux store
					dispatch(removeSnackbar(myKey));
					removeDisplayed(myKey);
				},
			});

			// keep track of snackbar that we've displayed
			storeDisplayed(key);
		});
	}, [notifications, closeSnackbar, enqueueSnackbar, dispatch]);

	return null;
};
