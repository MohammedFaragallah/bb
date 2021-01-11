import { produce } from 'immer';
import { Reducer } from 'redux';

import { ActionTypes } from '@types';
import { NotificationsReducerAction, NotificationsState } from 'Store';

const initialState: NotificationsState = {
	notifications: [],
};

export const notificationsReducer: Reducer<
	NotificationsState,
	NotificationsReducerAction
> = (state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.ENQUEUE_SNACKBAR:
			return produce(state, draft => {
				draft.notifications.push(action.payload);
			});

		case ActionTypes.CLOSE_SNACKBAR:
			return produce(state, draft => {
				draft.notifications = state.notifications.map(notification =>
					notification.key === action.payload
						? { ...notification, dismissed: true }
						: notification,
				);
			});

		case ActionTypes.CLOSE_ALL_SNACKBAR:
			return produce(state, draft => {
				draft.notifications = state.notifications.map(notification => ({
					...notification,
					dismissed: true,
				}));
			});

		case ActionTypes.REMOVE_SNACKBAR:
			return produce(state, draft => {
				draft.notifications = state.notifications.filter(
					notification => notification.key !== action.payload,
				);
			});

		default:
			return state;
	}
};
