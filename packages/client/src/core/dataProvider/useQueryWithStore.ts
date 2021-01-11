import { useQuery } from 'react-query';

import { dataProvider } from 'Helpers';

import {
	CoreRecord,
	CoreState,
	CreateParams,
	DeleteManyParams,
	DeleteParams,
	GetListParams,
	GetOneParams,
	UpdateManyParams,
	UpdateParams,
} from '../types';

interface CommonQuery {
	resource: string;
}

interface CommonResult {
	total?: number;
	error?: any;
	isLoading: boolean;
	isPreviousData: boolean;
}

interface GetListQuery<T extends CoreRecord = CoreRecord> extends CommonQuery {
	type: 'getList';
	payload?: GetListParams<T>;
}

interface GetListResult<T extends CoreRecord = CoreRecord>
	extends CommonResult {
	data?: T[];
}

interface GetOneQuery extends CommonQuery {
	type: 'getOne';
	payload: GetOneParams;
}

interface GetOneResult<T extends CoreRecord = CoreRecord> extends CommonResult {
	data?: T;
}

interface UpdateQuery<T extends CoreRecord = CoreRecord> extends CommonQuery {
	type: 'update';
	payload: UpdateParams<T>;
}

interface UpdateManyQuery<T extends CoreRecord = CoreRecord>
	extends CommonQuery {
	type: 'updateMany';
	payload: UpdateManyParams<T>;
}

interface CreateQuery<T extends CoreRecord = CoreRecord> extends CommonQuery {
	type: 'create';
	payload: CreateParams<T>;
}

interface DeleteQuery extends CommonQuery {
	type: 'delete';
	payload: DeleteParams;
}

interface DeleteManyQuery extends CommonQuery {
	type: 'deleteMany';
	payload: DeleteManyParams;
}

type UseQueryWithStoreQuery<T extends CoreRecord = CoreRecord> =
	| GetListQuery<T>
	| GetOneQuery
	| UpdateQuery<T>
	| UpdateManyQuery<T>
	| CreateQuery<T>
	| DeleteQuery
	| DeleteManyQuery;

interface QueryOptions {
	onSuccess?: (args?: any) => void;
	onFailure?: (error: any) => void;
	action?: string;
	[key: string]: any;
}

type UseQueryWithStoreOverload = {
	<T extends CoreRecord>(
		query: GetListQuery<T>,
		options?: QueryOptions,
		dataSelector?: (state: CoreState) => any,
		totalSelector?: (state: CoreState) => number,
	): GetListResult<T>;
	<T extends CoreRecord>(
		query: GetOneQuery,
		options?: QueryOptions,
		dataSelector?: (state: CoreState) => any,
		totalSelector?: (state: CoreState) => number,
	): GetOneResult<T>;
};
const useQueryWithStore: UseQueryWithStoreOverload = <
	T extends CoreRecord = CoreRecord
>(
	query: UseQueryWithStoreQuery<T>,
	options: QueryOptions = {},
) => {
	const { resource, type, payload = {} } = query;
	const { onFailure, onSuccess } = options;

	const { data, ...rest } = useQuery(
		[resource, query],
		async () => dataProvider[type](resource, payload as any),
		{ onError: onFailure, onSuccess },
	);

	return { ...rest, ...data };
};

export default useQueryWithStore;
