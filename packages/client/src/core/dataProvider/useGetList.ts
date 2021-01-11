import get from 'lodash/get';
import { shallowEqual, useSelector } from 'react-redux';

import {
	CoreRecord,
	CoreState,
	Identifier,
	Pagination,
	RecordMap,
	Sort,
} from '../types';
import useQueryWithStore from './useQueryWithStore';

const defaultData: any = {};

/**
 * Call the dataProvider.getList() method and return the resolved result
 * as well as the loading state.
 *
 * The return value updates according to the request state:
 *
 * - start: { loading: true, loaded: false }
 * - success: { data: [data from store], ids: [ids from response], total: [total from response], loading: false, loaded: true }
 * - error: { error: [error from response], loading: false, loaded: true }
 *
 * This hook will return the cached result when called a second time
 * with the same parameters, until the response arrives.
 *
 * @param {string} resource The resource name, e.g. 'posts'
 * @param {Object} pagination The request pagination { page, perPage }, e.g. { page: 1, perPage: 10 }
 * @param {Object} sort The request sort { field, order }, e.g. { field: 'id', order: 'DESC' }
 * @param {Object} filter The request filters, e.g. { title: 'hello, world' }
 * @param {Object} options Options object to pass to the dataProvider. May include side effects to be executed upon success of failure, e.g. { onSuccess: { refresh: true } }
 *
 * @returns The current request state. Destructure as { data, total, ids, error, loading, loaded }.
 *
 * @example
 *
 * import { useGetList } from 'react-admin';
 *
 * const LatestNews = () => {
 *     const { data, ids, loading, error } = useGetList(
 *         'posts',
 *         { page: 1, perPage: 10 },
 *         { field: 'published_at', order: 'DESC' }
 *     );
 *     if (loading) { return <Loading />; }
 *     if (error) { return <p>ERROR</p>; }
 *     return <ul>{ids.map(id =>
 *         <li key={id}>{data[id].title}</li>
 *     )}</ul>;
 * };
 */
const useGetList = <RecordType = CoreRecord>(
	resource: string,
	pagination: Pagination,
	sort: Sort,
	filter: object,
	options?: any,
): {
	data?: RecordMap<RecordType>;
	ids?: CoreRecord[];
	total?: number;
	error?: any;
	isLoading: boolean;
	isPreviousData: boolean;
} => {
	const requestSignature = JSON.stringify({ pagination, sort, filter });

	const {
		data: ids,
		total,
		error,
		isLoading,
		isPreviousData,
	} = useQueryWithStore(
		{ type: 'getList', resource, payload: { pagination, sort, filter } },
		options,
		// data selector (may return [])
		(state: CoreState): Identifier[] =>
			get(
				state.resources,
				[resource, 'list', 'cachedRequests', requestSignature, 'ids'],
				[],
			),
		// total selector (may return undefined)
		(state: CoreState): number =>
			get(state.resources, [
				resource,
				'list',
				'cachedRequests',
				requestSignature,
				'total',
			]),
	);

	const data = useSelector((state: CoreState): RecordMap<RecordType> => {
		if (!ids) return defaultData;
		const allResourceData = get(
			state.resources,
			[resource, 'data'],
			defaultData,
		);
		return ids
			.map((id: any) => allResourceData[id])
			.reduce((acc: any, record: any) => {
				acc[record.id] = record;
				return acc;
			}, {});
	}, shallowEqual);

	return {
		data,
		ids,
		total,
		error,
		isLoading,
		isPreviousData,
	};
};

export default useGetList;
