import { ActionTypes, Notification, UnpackedArray } from '@types';

export interface NotificationsState {
	notifications: Notification[];
}

export interface EnqueueSnackbarAction {
	type: ActionTypes.ENQUEUE_SNACKBAR;
	payload: UnpackedArray<NotificationsState['notifications']>;
}

export interface CloseSnackbarAction {
	type: ActionTypes.CLOSE_SNACKBAR;
	payload: Notification['key'];
}

export interface CloseAllSnackbarAction {
	type: ActionTypes.CLOSE_ALL_SNACKBAR;
}

export interface RemoveSnackbarAction {
	type: ActionTypes.REMOVE_SNACKBAR;
	payload: Notification['key'];
}

export type NotificationsReducerAction =
	| EnqueueSnackbarAction
	| CloseSnackbarAction
	| CloseAllSnackbarAction
	| RemoveSnackbarAction;
