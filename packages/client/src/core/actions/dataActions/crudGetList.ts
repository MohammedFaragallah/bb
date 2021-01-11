import { DataFetchActions } from '../../core';
import {
	CoreRecord,
	CRUD_GET_LIST,
	CRUD_GET_LIST_FAILURE,
	CRUD_GET_LIST_LOADING,
	CRUD_GET_LIST_SUCCESS,
	FETCH_END,
	FETCH_ERROR,
	Pagination,
	Sort,
} from '../../types';

export const crudGetList = (
	resource: string,
	pagination: Pagination,
	sort: Sort,
	filter: object,
): CrudGetListAction => ({
	type: CRUD_GET_LIST,
	payload: { pagination, sort, filter },
	meta: {
		resource,
		fetch: DataFetchActions.GET_LIST,
		onFailure: {},
	},
});

interface RequestPayload {
	pagination: Pagination;
	sort: Sort;
	filter: object;
}

export interface CrudGetListAction {
	readonly type: typeof CRUD_GET_LIST;
	readonly payload: RequestPayload;
	readonly meta: {
		resource: string;
		fetch: DataFetchActions.GET_LIST;
		onFailure: object;
	};
}

export interface CrudGetListLoadingAction {
	readonly type: typeof CRUD_GET_LIST_LOADING;
	readonly payload: RequestPayload;
	readonly meta: {
		resource: string;
	};
}

export interface CrudGetListFailureAction {
	readonly type: typeof CRUD_GET_LIST_FAILURE;
	readonly error: string | object;
	readonly payload: string;
	readonly requestPayload: RequestPayload;
	readonly meta: {
		resource: string;
		fetchResponse: DataFetchActions.GET_LIST;
		fetchStatus: typeof FETCH_ERROR;
	};
}

export interface CrudGetListSuccessAction {
	readonly type: typeof CRUD_GET_LIST_SUCCESS;
	readonly payload: {
		data: CoreRecord[];
		total: number;
	};
	readonly requestPayload: RequestPayload;
	readonly meta: {
		resource: string;
		fetchResponse: DataFetchActions.GET_LIST;
		fetchStatus: typeof FETCH_END;
	};
}
