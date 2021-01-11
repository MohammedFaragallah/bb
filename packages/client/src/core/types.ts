import { ReactElement } from 'react';
import { Reducer } from 'redux';

import loading from './reducer/admin/loading';
import queries from './reducer/admin/queries';
import resources from './reducer/admin/resource';

export type ReducerState<T> = T extends Reducer<infer U> ? U : any;

export type CoreState = {
	resources: ReducerState<typeof resources>;
	queries: ReducerState<typeof queries>;
	loading: ReducerState<typeof loading>;
};

/**
 * data types
 */

export type Identifier = string | number;

export interface CoreRecord {
	id: Identifier;
	[key: string]: any;
}

export interface RecordMap<RecordType = CoreRecord> {
	// Accept strings and numbers as identifiers
	[id: string]: RecordType;
	[id: number]: RecordType;
}

export interface Sort<T extends CoreRecord = CoreRecord> {
	field: keyof T | string;
	order: string | number;
}

type FeathersKeys =
	| '$eq'
	| '$ne'
	| '$gte'
	| '$gt'
	| '$lte'
	| '$lt'
	| '$in'
	| '$nin'
	| '$like'
	| '$notLike'
	| '$iLike'
	| '$notILike'
	| '$or'
	| '$and';

export type Filter<T extends CoreRecord = CoreRecord> = {
	[K in keyof T | FeathersKeys]?: any;
} & { [key: string]: any };

export interface Pagination {
	page: number;
	perPage: number;
}

export type ValidUntil = Date;

/**
 * dataProvider types
 */

export type DataProvider<R = string> = {
	getList: (resource: R, params: GetListParams) => Promise<GetListResult>;

	getOne: (resource: R, params: GetOneParams) => Promise<GetOneResult>;

	update: (resource: R, params: UpdateParams) => Promise<UpdateResult>;

	updateMany: (
		resource: R,
		params: UpdateManyParams,
	) => Promise<UpdateManyResult>;

	create: (resource: R, params: CreateParams) => Promise<CreateResult>;

	delete: (resource: R, params: DeleteParams) => Promise<DeleteResult>;

	deleteMany: (
		resource: R,
		params: DeleteManyParams,
	) => Promise<DeleteManyResult>;

	[key: string]: (resource: R, params: any) => Promise<any>;
};

export interface GetListParams<T extends CoreRecord = CoreRecord> {
	pagination?: Pagination;
	sort?: Sort<T>;
	filter?: Filter<T>;
}

export interface GetListResult<T extends CoreRecord = CoreRecord> {
	data: T[];
	total: number;
	validUntil?: ValidUntil;
}

export interface GetOneParams {
	id: Identifier;
}

export interface GetOneResult<T extends CoreRecord = CoreRecord> {
	data: T;
	validUntil?: ValidUntil;
}

export interface UpdateParams<T extends CoreRecord = CoreRecord> {
	id: Identifier;
	data: T;
	previousData: T;
}

export interface UpdateResult<T extends CoreRecord = CoreRecord> {
	data: T;
	validUntil?: ValidUntil;
}

export interface UpdateManyParams<T extends CoreRecord = CoreRecord> {
	ids: Identifier[];
	data: T;
}

export interface UpdateManyResult {
	data?: Identifier[];
	validUntil?: ValidUntil;
}

export interface CreateParams<T extends CoreRecord = CoreRecord> {
	data: T;
}

export interface CreateResult<T extends CoreRecord = CoreRecord> {
	data: T;
	validUntil?: ValidUntil;
}

export interface DeleteParams {
	id: Identifier;
}

export interface DeleteResult<T extends CoreRecord = CoreRecord> {
	data?: T;
}

export interface DeleteManyParams {
	ids: Identifier[];
}

export interface DeleteManyResult {
	data?: Identifier[];
}

export type DataProviderTypes = keyof DataProvider;

export type DataProviderResult<T extends CoreRecord> =
	| CreateResult<T>
	| DeleteManyResult
	| DeleteResult<T>
	| GetListResult<T>
	| GetOneResult<T>
	| UpdateManyResult
	| UpdateResult<T>;

export type DataProviderParams<T extends CoreRecord> =
	| GetListParams<T>
	| GetOneParams
	| UpdateParams<T>
	| UpdateManyParams<T>
	| CreateParams<T>
	| DeleteParams
	| DeleteManyParams;

export type DataProviderProxy<R = string> = {
	getList: (
		resource: R,
		params: GetListParams,
		options?: UseDataProviderOptions,
	) => Promise<GetListResult>;

	getOne: (
		resource: R,
		params: GetOneParams,
		options?: UseDataProviderOptions,
	) => Promise<GetOneResult>;

	update: (
		resource: R,
		params: UpdateParams,
		options?: UseDataProviderOptions,
	) => Promise<UpdateResult>;

	updateMany: (
		resource: R,
		params: UpdateManyParams,
		options?: UseDataProviderOptions,
	) => Promise<UpdateManyResult>;

	create: (
		resource: R,
		params: CreateParams,
		options?: UseDataProviderOptions,
	) => Promise<CreateResult>;

	delete: (
		resource: R,
		params: DeleteParams,
		options?: UseDataProviderOptions,
	) => Promise<DeleteResult>;

	deleteMany: (
		resource: R,
		params: DeleteManyParams,
		options?: UseDataProviderOptions,
	) => Promise<DeleteManyResult>;

	[key: string]: (
		resource: R,
		params: any,
		options?: UseDataProviderOptions,
	) => Promise<any>;
};

export interface UseDataProviderOptions {
	action?: string;
	fetch?: string;
	meta?: object;
	onSuccess?: any;
	onFailure?: any;
}

export type InitialState = object | (() => object);

/**
 * Misc types
 */

export type Dispatch<T> = T extends (...args: infer A) => any
	? (...args: A) => void
	: never;

export type ResourceElement = ReactElement<ResourceProps>;

export interface ResourceProps {
	name: string;
}

export const CRUD_CREATE = 'CRUD_CREATE';
export const CRUD_CREATE_LOADING = 'CRUD_CREATE_LOADING';
export const CRUD_CREATE_FAILURE = 'CRUD_CREATE_FAILURE';
export const CRUD_CREATE_SUCCESS = 'CRUD_CREATE_SUCCESS';
export const CRUD_DELETE = 'CRUD_DELETE';
export const CRUD_DELETE_LOADING = 'CRUD_DELETE_LOADING';
export const CRUD_DELETE_FAILURE = 'CRUD_DELETE_FAILURE';
export const CRUD_DELETE_SUCCESS = 'CRUD_DELETE_SUCCESS';
export const CRUD_DELETE_MANY = 'CRUD_DELETE_MANY';
export const CRUD_DELETE_MANY_LOADING = 'CRUD_DELETE_MANY_LOADING';
export const CRUD_DELETE_MANY_SUCCESS = 'CRUD_DELETE_MANY_SUCCESS';
export const CRUD_GET_ALL = 'CRUD_GET_ALL';
export const CRUD_GET_ALL_LOADING = 'CRUD_GET_ALL_LOADING';
export const CRUD_GET_ALL_FAILURE = 'CRUD_GET_ALL_FAILURE';
export const CRUD_GET_ALL_SUCCESS = 'CRUD_GET_ALL_SUCCESS';
export const CRUD_GET_LIST = 'CRUD_GET_LIST';
export const CRUD_GET_LIST_LOADING = 'CRUD_GET_LIST_LOADING';
export const CRUD_GET_LIST_FAILURE = 'CRUD_GET_LIST_FAILURE';
export const CRUD_GET_LIST_SUCCESS = 'CRUD_GET_LIST_SUCCESS';
export const CRUD_GET_ONE = 'CRUD_GET_ONE';
export const CRUD_GET_ONE_LOADING = 'CRUD_GET_ONE_LOADING';
export const CRUD_GET_ONE_FAILURE = 'CRUD_GET_ONE_FAILURE';
export const CRUD_GET_ONE_SUCCESS = 'CRUD_GET_ONE_SUCCESS';
export const CRUD_UPDATE = 'CRUD_UPDATE';
export const CRUD_UPDATE_LOADING = 'CRUD_UPDATE_LOADING';
export const CRUD_UPDATE_FAILURE = 'CRUD_UPDATE_FAILURE';
export const CRUD_UPDATE_SUCCESS = 'CRUD_UPDATE_SUCCESS';
export const CRUD_UPDATE_MANY = 'CRUD_UPDATE_MANY';
export const CRUD_UPDATE_MANY_LOADING = 'CRUD_UPDATE_MANY_LOADING';
export const CRUD_UPDATE_MANY_FAILURE = 'CRUD_UPDATE_MANY_FAILURE';
export const CRUD_UPDATE_MANY_SUCCESS = 'CRUD_UPDATE_MANY_SUCCESS';
export const CRUD_HIDE_FILTER = 'CRUD_HIDE_FILTER';
export const CRUD_SET_FILTER = 'CRUD_SET_FILTER';
export const CRUD_SHOW_FILTER = 'CRUD_SHOW_FILTER';
export const CRUD_CHANGE_LIST_PARAMS = 'CRUD_CHANGE_LIST_PARAMS';
export const TOGGLE_LIST_ITEM = 'TOGGLE_LIST_ITEM';
export const CORE_REGISTER_RESOURCE = 'CORE_REGISTER_RESOURCE';

export const CORE_QUERY = 'CORE_QUERY';

export const FETCH_CANCEL = 'CORE_FETCH_CANCEL';
export const FETCH_END = 'CORE_FETCH_END';
export const FETCH_ERROR = 'CORE_FETCH_ERROR';
export const FETCH_START = 'CORE_FETCH_START';
