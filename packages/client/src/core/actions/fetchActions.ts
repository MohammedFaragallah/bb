import { FETCH_CANCEL, FETCH_END, FETCH_ERROR, FETCH_START } from '../types';

export interface FetchStartAction {
	readonly type: typeof FETCH_START;
}

export const fetchStart = (): FetchStartAction => ({ type: FETCH_START });

export interface FetchEndAction {
	readonly type: typeof FETCH_END;
}

export const fetchEnd = (): FetchEndAction => ({ type: FETCH_END });

export interface FetchErrorAction {
	readonly type: typeof FETCH_ERROR;
}

export const fetchError = (): FetchErrorAction => ({ type: FETCH_ERROR });

export interface FetchCancelAction {
	readonly type: typeof FETCH_CANCEL;
}

export const fetchCancel = (): FetchCancelAction => ({ type: FETCH_CANCEL });
