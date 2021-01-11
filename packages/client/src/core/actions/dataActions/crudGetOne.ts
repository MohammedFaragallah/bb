import { DataFetchActions } from '../../core';
import { RedirectionSideEffect, RefreshSideEffect } from '../../sideEffect';
import {
	CoreRecord,
	CRUD_GET_ONE,
	CRUD_GET_ONE_FAILURE,
	CRUD_GET_ONE_LOADING,
	CRUD_GET_ONE_SUCCESS,
	FETCH_END,
	FETCH_ERROR,
	Identifier,
} from '../../types';

export const crudGetOne = (
	resource: string,
	id: Identifier,
	basePath: string,
	refresh: RefreshSideEffect = true,
): CrudGetOneAction => ({
	type: CRUD_GET_ONE,
	payload: { id },
	meta: {
		resource,
		fetch: DataFetchActions.GET_ONE,
		basePath,
		onFailure: {
			redirectTo: 'list',
			refresh,
		},
	},
});

interface RequestPayload {
	id: Identifier;
}

export interface CrudGetOneAction {
	readonly type: typeof CRUD_GET_ONE;
	readonly payload: RequestPayload;
	readonly meta: {
		resource: string;
		fetch: DataFetchActions.GET_ONE;
		basePath: string;
		onFailure: {
			redirectTo: RedirectionSideEffect;
			refresh: RefreshSideEffect;
		};
	};
}

export interface CrudGetOneLoadingAction {
	readonly type: typeof CRUD_GET_ONE_LOADING;
	readonly payload: RequestPayload;
	readonly meta: {
		resource: string;
		basePath: string;
	};
}

export interface CrudGetOneFailureAction {
	readonly type: typeof CRUD_GET_ONE_FAILURE;
	readonly error: string | object;
	readonly payload: string;
	readonly requestPayload: RequestPayload;
	readonly meta: {
		resource: string;
		redirectTo: RedirectionSideEffect;
		refresh: RefreshSideEffect;
		fetchResponse: DataFetchActions.GET_ONE;
		fetchStatus: typeof FETCH_ERROR;
	};
}

export interface CrudGetOneSuccessAction {
	readonly type: typeof CRUD_GET_ONE_SUCCESS;
	readonly payload: {
		data: CoreRecord;
	};
	readonly requestPayload: RequestPayload;
	readonly meta: {
		resource: string;
		fetchResponse: DataFetchActions.GET_ONE;
		fetchStatus: typeof FETCH_END;
	};
}
