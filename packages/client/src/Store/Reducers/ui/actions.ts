import { Dispatch } from 'redux';

import { ActionTypes } from '@types';
import { enqueueSnackbar } from 'Store';

import { UIState } from './types';

export const closePopup = (id: UIState['popup']['id']) => (
	dispatch: Dispatch,
) => dispatch({ type: ActionTypes.CLOSE_POPUP, payload: id });

export const setPrintMode = (toggle: UIState['print']) => (
	dispatch: Dispatch,
) => dispatch({ type: ActionTypes.SET_PRINT_MODE, payload: toggle });

export const resetUI = () => (dispatch: Dispatch) =>
	dispatch({ type: ActionTypes.RESET_UI });

export const setSearch = (payload: UIState['search']) => (dispatch: Dispatch) =>
	dispatch({ type: ActionTypes.SET_SEARCH, payload });

export const setMiniMenu = (payload: UIState['miniMenu']) => (
	dispatch: Dispatch,
) => dispatch({ type: ActionTypes.SET_MINI_MENU, payload });

export const setTabIndex = (payload: UIState['tabIndex']) => (
	dispatch: Dispatch,
) => dispatch({ type: ActionTypes.SET_TAB_INDEX, payload });

export const setPalette = (payload?: UIState['theme']) => (
	dispatch: Dispatch,
) => dispatch({ type: ActionTypes.SET_PALETTE, payload });

export const setTimer = (payload = true) => (dispatch: Dispatch) =>
	dispatch({ type: ActionTypes.OPEN_TIMER, payload });

export const offlineReady = () => (dispatch: Dispatch) => {
	dispatch(
		enqueueSnackbar({
			message: 'App is now Offline Ready',
			options: { variant: 'success' },
		}),
	);

	return dispatch({ type: ActionTypes.OFFLINE_READY });
};
