import { DataFetchActions } from '../../core';
import { RefreshSideEffect } from '../../sideEffect';
import {
	CRUD_UPDATE_MANY,
	CRUD_UPDATE_MANY_FAILURE,
	CRUD_UPDATE_MANY_LOADING,
	CRUD_UPDATE_MANY_SUCCESS,
	FETCH_END,
	FETCH_ERROR,
	Identifier,
} from '../../types';

export const crudUpdateMany = (
	resource: string,
	ids: Identifier[],
	data: any,
	basePath: string,
	refresh: RefreshSideEffect = true,
): CrudUpdateManyAction => ({
	type: CRUD_UPDATE_MANY,
	payload: { ids, data },
	meta: {
		resource,
		fetch: DataFetchActions.UPDATE_MANY,
		onSuccess: {
			basePath,
			refresh,
			unselectAll: true,
		},
		onFailure: {},
	},
});

interface RequestPayload {
	ids: Identifier[];
	data: any;
}

export interface CrudUpdateManyAction {
	readonly type: typeof CRUD_UPDATE_MANY;
	readonly payload: RequestPayload;
	readonly meta: {
		resource: string;
		fetch: DataFetchActions.UPDATE_MANY;
		onSuccess: {
			refresh: RefreshSideEffect;
			basePath: string;
			unselectAll: boolean;
		};
		onFailure: object;
	};
}

export interface CrudUpdateManyLoadingAction {
	readonly type: typeof CRUD_UPDATE_MANY_LOADING;
	readonly payload: RequestPayload;
	readonly meta: {
		resource: string;
	};
}

export interface CrudUpdateManyFailureAction {
	readonly type: typeof CRUD_UPDATE_MANY_FAILURE;
	readonly error: string | object;
	readonly payload: string;
	readonly requestPayload: RequestPayload;
	readonly meta: {
		resource: string;
		fetchResponse: DataFetchActions.UPDATE_MANY;
		fetchStatus: typeof FETCH_ERROR;
	};
}

export interface CrudUpdateManySuccessAction {
	readonly type: typeof CRUD_UPDATE_MANY_SUCCESS;
	readonly payload: {
		data: Identifier[];
	};
	readonly requestPayload: RequestPayload;
	readonly meta: {
		resource: string;
		refresh: RefreshSideEffect;
		basePath: string;
		unselectAll: boolean;
		fetchResponse: DataFetchActions.UPDATE_MANY;
		fetchStatus: typeof FETCH_END;
	};
}
