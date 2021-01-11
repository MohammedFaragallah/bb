import { ActionTypes, Notification } from '@types';

export const enqueueSnackbar = (notification: Notification) => {
	if (!notification.options) notification.options = {};

	if (!notification.options?.key)
		notification.options.key = new Date().getTime() + Math.random();

	const key = notification.options?.key;

	return {
		type: ActionTypes.ENQUEUE_SNACKBAR,
		payload: { ...notification, key },
	};
};

export const closeSnackbar = (key: Notification['key']) => ({
	type: ActionTypes.CLOSE_SNACKBAR,
	payload: key,
});

export const closeAllSnackbar = () => ({
	type: ActionTypes.CLOSE_ALL_SNACKBAR,
});

export const removeSnackbar = (key: Notification['key']) => ({
	type: ActionTypes.REMOVE_SNACKBAR,
	payload: key,
});
