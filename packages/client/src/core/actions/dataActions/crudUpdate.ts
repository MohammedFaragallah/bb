import { DataFetchActions } from '../../core';
import { RedirectionSideEffect, RefreshSideEffect } from '../../sideEffect';
import {
	CoreRecord,
	CRUD_UPDATE,
	CRUD_UPDATE_FAILURE,
	CRUD_UPDATE_LOADING,
	CRUD_UPDATE_SUCCESS,
	FETCH_END,
	FETCH_ERROR,
	Identifier,
} from '../../types';

export const crudUpdate = (
	resource: string,
	id: Identifier,
	data: any,
	previousData: any,
	basePath: string,
	redirectTo: RedirectionSideEffect = 'show',
	refresh: RefreshSideEffect = true,
): CrudUpdateAction => ({
	type: CRUD_UPDATE,
	payload: { id, data, previousData },
	meta: {
		resource,
		fetch: DataFetchActions.UPDATE,
		onSuccess: {
			refresh,
			redirectTo,
			basePath,
		},
		onFailure: {
			notification: {
				body: 'ra.notification.http_error',
				level: 'warning',
			},
		},
	},
});

interface RequestPayload {
	id: Identifier;
	data: any;
	previousData?: any;
}

export interface CrudUpdateAction {
	readonly type: typeof CRUD_UPDATE;
	readonly payload: RequestPayload;
	readonly meta: {
		resource: string;
		fetch: DataFetchActions.UPDATE;
		onSuccess: {
			redirectTo: RedirectionSideEffect;
			refresh: RefreshSideEffect;
			basePath: string;
		};
		onFailure: object;
	};
}

export interface CrudUpdateLoadingAction {
	readonly type: typeof CRUD_UPDATE_LOADING;
	readonly payload: RequestPayload;
	readonly meta: {
		resource: string;
	};
}

export interface CrudUpdateFailureAction {
	readonly type: typeof CRUD_UPDATE_FAILURE;
	readonly error: string | object;
	readonly payload: string;
	readonly requestPayload: RequestPayload;
	readonly meta: {
		resource: string;
		fetchResponse: DataFetchActions.UPDATE;
		fetchStatus: typeof FETCH_ERROR;
	};
}

export interface CrudUpdateSuccessAction {
	readonly type: typeof CRUD_UPDATE_SUCCESS;
	readonly payload: {
		data: CoreRecord;
	};
	readonly requestPayload: RequestPayload;
	readonly meta: {
		resource: string;
		redirectTo: RedirectionSideEffect;
		refresh: RefreshSideEffect;
		basePath: string;
		fetchResponse: DataFetchActions.UPDATE;
		fetchStatus: typeof FETCH_END;
	};
}
