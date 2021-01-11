import { ActionTypes, Identifier, LargeHeaderMenus, PaletteType } from '@types';

export interface UIState {
	print: boolean;
	popup: {
		open: boolean;
		id?: Identifier;
	};
	loading: number;
	search: boolean;
	miniMenu: boolean;
	tabIndex: LargeHeaderMenus | undefined;
	theme: PaletteType;
	offlineReady: boolean;
	timer: boolean;
}

export interface SetPrintModeAction {
	type: ActionTypes.SET_PRINT_MODE;
	payload: UIState['print'];
}

export interface ClosePopupAction {
	type: ActionTypes.CLOSE_POPUP;
	payload: UIState['popup']['id'];
}

export interface AddLoadingAction {
	type: ActionTypes.ADD_LOADING;
}

export interface RemoveLoadingAction {
	type: ActionTypes.REMOVE_LOADING;
}

export interface ResetUIAction {
	type: ActionTypes.RESET_UI;
}

export interface SetSearchAction {
	type: ActionTypes.SET_SEARCH;
	payload: UIState['search'];
}

export interface SetMiniMenuAction {
	type: ActionTypes.SET_MINI_MENU;
	payload: UIState['miniMenu'];
}

export interface SetTabIndexAction {
	type: ActionTypes.SET_TAB_INDEX;
	payload: UIState['tabIndex'];
}

export interface SetPaletteAction {
	type: ActionTypes.SET_PALETTE;
	payload?: UIState['theme'];
}

export interface OpenTimerAction {
	type: ActionTypes.OPEN_TIMER;
	payload: UIState['timer'];
}

export interface OfflineReadyAction {
	type: ActionTypes.OFFLINE_READY;
}

export type UIReducerAction =
	| SetPrintModeAction
	| ClosePopupAction
	| AddLoadingAction
	| RemoveLoadingAction
	| ResetUIAction
	| SetSearchAction
	| SetMiniMenuAction
	| SetTabIndexAction
	| SetPaletteAction
	| OpenTimerAction
	| OfflineReadyAction;
