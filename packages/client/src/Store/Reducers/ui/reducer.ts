import { produce } from 'immer';
import { Reducer } from 'redux';

import { ActionTypes, PaletteType } from '@types';
import { UIReducerAction, UIState } from 'Store';

const initialState: UIState = {
	print: false,
	popup: {
		open: true,
	},
	loading: 0,
	search: false,
	miniMenu: false,
	tabIndex: undefined,
	theme: PaletteType.light,
	offlineReady: false,
	timer: false,
};

export const uiReducer: Reducer<UIState, UIReducerAction> = (
	state = initialState,
	action,
) => {
	switch (action.type) {
		case ActionTypes.SET_PRINT_MODE:
			return produce(state, draft => {
				draft.print = action.payload;
			});

		case ActionTypes.CLOSE_POPUP:
			return produce(state, draft => {
				draft.popup.open = false;
				draft.popup.id = action.payload;
			});

		case ActionTypes.ADD_LOADING:
			return produce(state, draft => {
				draft.loading++;
			});

		case ActionTypes.REMOVE_LOADING:
			return produce(state, draft => {
				draft.loading--;
			});

		case ActionTypes.RESET_UI:
			return produce(state, draft => {
				draft = initialState;
				draft.popup = state.popup;
				draft.theme = state.theme;
				draft.offlineReady = state.offlineReady;
			});

		case ActionTypes.SET_SEARCH:
			return produce(state, draft => {
				draft.search = action.payload;
			});

		case ActionTypes.SET_MINI_MENU:
			return produce(state, draft => {
				draft.miniMenu = action.payload;
			});

		case ActionTypes.SET_TAB_INDEX:
			return produce(state, draft => {
				draft.tabIndex = action.payload;
			});

		case ActionTypes.SET_PALETTE:
			return produce(state, draft => {
				draft.theme =
					action.payload || state.theme === PaletteType.light
						? PaletteType.dark
						: PaletteType.light;
			});

		case ActionTypes.OFFLINE_READY:
			return produce(state, draft => {
				draft.offlineReady = true;
			});

		case ActionTypes.OPEN_TIMER:
			return produce(state, draft => {
				draft.timer = action.payload;
			});

		default: {
			return state;
		}
	}
};
