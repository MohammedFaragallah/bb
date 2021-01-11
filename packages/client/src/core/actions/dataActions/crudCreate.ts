import { DataFetchActions } from '../../core';
import { RedirectionSideEffect } from '../../sideEffect';
import {
	CoreRecord,
	CRUD_CREATE,
	CRUD_CREATE_FAILURE,
	CRUD_CREATE_LOADING,
	CRUD_CREATE_SUCCESS,
	FETCH_END,
	FETCH_ERROR,
} from '../../types';

export const crudCreate = (
	resource: string,
	data: any,
	basePath: string,
	redirectTo: RedirectionSideEffect = 'edit',
): CrudCreateAction => ({
	type: CRUD_CREATE,
	payload: { data },
	meta: {
		resource,
		fetch: DataFetchActions.CREATE,
		onSuccess: {
			redirectTo,
			basePath,
		},
		onFailure: {},
	},
});

interface RequestPayload {
	data: any;
}

export interface CrudCreateAction {
	readonly type: typeof CRUD_CREATE;
	readonly payload: RequestPayload;
	readonly meta: {
		resource: string;
		fetch: DataFetchActions.CREATE;
		onSuccess: {
			redirectTo: RedirectionSideEffect;
			basePath: string;
		};
		onFailure: object;
	};
}

export interface CrudCreateLoadingAction {
	readonly type: typeof CRUD_CREATE_LOADING;
	readonly payload: RequestPayload;
	readonly meta: {
		resource: string;
	};
}

export interface CrudCreateFailureAction {
	readonly type: typeof CRUD_CREATE_FAILURE;
	readonly error: string | object;
	readonly payload: string;
	readonly requestPayload: RequestPayload;
	readonly meta: {
		resource: string;
		fetchResponse: DataFetchActions.CREATE;
		fetchStatus: typeof FETCH_ERROR;
	};
}

export interface CrudCreateSuccessAction {
	readonly type: typeof CRUD_CREATE_SUCCESS;
	readonly payload: {
		data: CoreRecord;
	};
	readonly requestPayload: RequestPayload;
	readonly meta: {
		resource: string;
		redirectTo: RedirectionSideEffect;
		basePath: string;
		fetchResponse: DataFetchActions.CREATE;
		fetchStatus: typeof FETCH_END;
	};
}
