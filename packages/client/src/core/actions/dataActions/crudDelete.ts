import { DataFetchActions } from '../../core';
import { RedirectionSideEffect, RefreshSideEffect } from '../../sideEffect';
import {
	CoreRecord,
	CRUD_DELETE,
	CRUD_DELETE_FAILURE,
	CRUD_DELETE_LOADING,
	CRUD_DELETE_SUCCESS,
	FETCH_END,
	FETCH_ERROR,
	Identifier,
} from '../../types';

export const crudDelete = (
	resource: string,
	id: Identifier,
	previousData: CoreRecord,
	basePath: string,
	redirectTo: RedirectionSideEffect = 'list',
	refresh: RefreshSideEffect = true,
): CrudDeleteAction => ({
	type: CRUD_DELETE,
	payload: { id, previousData },
	meta: {
		resource,
		fetch: DataFetchActions.DELETE,
		onSuccess: {
			refresh,
			redirectTo,
			basePath,
		},
		onFailure: {},
	},
});

interface RequestPayload {
	id: Identifier;
	previousData: CoreRecord;
}

export interface CrudDeleteAction {
	readonly type: typeof CRUD_DELETE;
	readonly payload: RequestPayload;
	readonly meta: {
		resource: string;
		fetch: DataFetchActions.DELETE;
		onSuccess: {
			redirectTo: RedirectionSideEffect;
			refresh: RefreshSideEffect;
			basePath: string;
		};
		onFailure: object;
	};
}

export interface CrudDeleteLoadingAction {
	readonly type: typeof CRUD_DELETE_LOADING;
	readonly payload: RequestPayload;
	readonly meta: {
		resource: string;
	};
}

export interface CrudDeleteFailureAction {
	readonly type: typeof CRUD_DELETE_FAILURE;
	readonly error: string | object;
	readonly payload: string;
	readonly requestPayload: RequestPayload;
	readonly meta: {
		resource: string;
		fetchResponse: typeof CRUD_DELETE;
		fetchStatus: typeof FETCH_ERROR;
	};
}

export interface CrudDeleteSuccessAction {
	readonly type: typeof CRUD_DELETE_SUCCESS;
	readonly payload: {
		data: CoreRecord;
	};
	readonly requestPayload: RequestPayload;
	readonly meta: {
		resource: string;
		redirectTo: RedirectionSideEffect;
		refresh: RefreshSideEffect;
		basePath: string;
		fetchResponse: typeof CRUD_DELETE;
		fetchStatus: typeof FETCH_END;
	};
}
