import { DataFetchActions } from '../../core';
import { CallbackSideEffect } from '../../sideEffect';
import {
	CoreRecord,
	CRUD_GET_ALL,
	CRUD_GET_ALL_FAILURE,
	CRUD_GET_ALL_LOADING,
	CRUD_GET_ALL_SUCCESS,
	FETCH_END,
	FETCH_ERROR,
	Pagination,
	Sort,
} from '../../types';

export const crudGetAll = (
	resource: string,
	sort: Sort,
	filter: object,
	maxResults: number,
	callback?: CallbackSideEffect,
): CrudGetAllAction => ({
	type: CRUD_GET_ALL,
	payload: {
		sort,
		filter,
		pagination: { page: 1, perPage: maxResults },
	},
	meta: {
		resource,
		fetch: DataFetchActions.GET_LIST,
		onSuccess: {
			callback,
		},
		onFailure: {},
	},
});

interface RequestPayload {
	pagination: Pagination;
	sort: Sort;
	filter: object;
}

interface CrudGetAllAction {
	readonly type: typeof CRUD_GET_ALL;
	readonly payload: RequestPayload;
	readonly meta: {
		resource: string;
		fetch: DataFetchActions.GET_LIST;
		onFailure: object;
		onSuccess: {
			callback?: CallbackSideEffect;
		};
	};
}

export interface CrudGetAllLoadingAction {
	readonly type: typeof CRUD_GET_ALL_LOADING;
	readonly payload: RequestPayload;
	readonly meta: {
		resource: string;
	};
}

export interface CrudGetAllFailureAction {
	readonly type: typeof CRUD_GET_ALL_FAILURE;
	readonly error: string | object;
	readonly payload: string;
	readonly requestPayload: RequestPayload;
	readonly meta: {
		resource: string;
		fetchResponse: DataFetchActions.GET_LIST;
		fetchStatus: typeof FETCH_ERROR;
	};
}

export interface CrudGetAllSuccessAction {
	readonly type: typeof CRUD_GET_ALL_SUCCESS;
	readonly payload: {
		data: CoreRecord[];
		total: number;
	};
	readonly requestPayload: RequestPayload;
	readonly meta: {
		resource: string;
		callback: any;
		fetchResponse: DataFetchActions.GET_LIST;
		fetchStatus: typeof FETCH_END;
	};
}
