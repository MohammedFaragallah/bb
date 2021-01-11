import { DataFetchActions } from '../../core';
import { RefreshSideEffect } from '../../sideEffect';
import {
	CoreRecord,
	CRUD_DELETE_MANY,
	CRUD_DELETE_MANY_LOADING,
	CRUD_DELETE_MANY_SUCCESS,
	FETCH_END,
	FETCH_ERROR,
	Identifier,
} from '../../types';

export const crudDeleteMany = (
	resource: string,
	ids: Identifier[],
	basePath: string,
	refresh: RefreshSideEffect = true,
): CrudDeleteManyAction => ({
	type: CRUD_DELETE_MANY,
	payload: { ids },
	meta: {
		resource,
		fetch: DataFetchActions.DELETE_MANY,
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
}

export interface CrudDeleteManyAction {
	readonly type: typeof CRUD_DELETE_MANY;
	readonly payload: RequestPayload;
	readonly meta: {
		resource: string;
		fetch: DataFetchActions.DELETE_MANY;
		onSuccess: {
			refresh: RefreshSideEffect;
			basePath: string;
			unselectAll: boolean;
		};
		onFailure: object;
	};
}

export interface CrudDeleteManyLoadingAction {
	readonly type: typeof CRUD_DELETE_MANY_LOADING;
	readonly payload: RequestPayload;
	readonly meta: {
		resource: string;
	};
}

export const CRUD_DELETE_MANY_FAILURE = 'CRUD_DELETE_MANY_FAILURE';
export interface CrudDeleteMAnyFailureAction {
	readonly type: typeof CRUD_DELETE_MANY_FAILURE;
	readonly error: string | object;
	readonly payload: string;
	readonly requestPayload: RequestPayload;
	readonly meta: {
		resource: string;
		fetchResponse: DataFetchActions.DELETE_MANY;
		fetchStatus: typeof FETCH_ERROR;
	};
}

export interface CrudDeleteManySuccessAction {
	readonly type: typeof CRUD_DELETE_MANY_SUCCESS;
	readonly payload: {
		data: CoreRecord[];
	};
	readonly requestPayload: RequestPayload;
	readonly meta: {
		resource: string;
		refresh: RefreshSideEffect;
		basePath: string;
		unselectAll: boolean;
		fetchResponse: DataFetchActions.DELETE_MANY;
		fetchStatus: typeof FETCH_END;
	};
}
