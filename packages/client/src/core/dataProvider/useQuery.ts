import { useEffect, useState } from 'react';

import useDataProvider from './useDataProvider';
import useDataProviderWithDeclarativeSideEffects from './useDataProviderWithDeclarativeSideEffects';

/**
 * Call the data provider on mount
 *
 * The return value updates according to the request state:
 *
 * - start: { loading: true, loaded: false }
 * - success: { data: [data from response], total: [total from response], loading: false, loaded: true }
 * - error: { error: [error from response], loading: false, loaded: true }
 *
 * @param {Object} query
 * @param {string} query.type The method called on the data provider, e.g. 'getList', 'getOne'. Can also be a custom method if the dataProvider supports is.
 * @param {string} query.resource A resource name, e.g. 'posts', 'comments'
 * @param {Object} query.payload The payload object, e.g; { post_id: 12 }
 * @param {Object} options
 * @param {string} options.action Redux action type
 * @param {Function} options.onSuccess Side effect function to be executed upon success of failure, e.g. { onSuccess: response => refresh() } }
 * @param {Function} options.onFailure Side effect function to be executed upon failure, e.g. { onFailure: error => notify(error.message) } }
 * @param {boolean} options.withDeclarativeSideEffectsSupport Set to true to support legacy side effects (e.g. { onSuccess: { refresh: true } })
 *
 * @returns The current request state. Destructure as { data, total, error, loading, loaded }.
 *
 * @example
 *
 * import { useQuery } from 'react-admin';
 *
 * const UserProfile = ({ record }) => {
 *     const { data, loading, error } = useQuery({
 *         type: 'getOne',
 *         resource: 'users',
 *         payload: { id: record.id }
 *     });
 *     if (loading) { return <Loading />; }
 *     if (error) { return <p>ERROR</p>; }
 *     return <div>User {data.username}</div>;
 * };
 *
 * @example
 *
 * import { useQuery } from 'react-admin';
 *
 * const payload = {
 *    pagination: { page: 1, perPage: 10 },
 *    sort: { field: 'username', order: 'ASC' },
 * };
 * const UserList = () => {
 *     const { data, total, loading, error } = useQuery({
 *         type: 'getList',
 *         resource: 'users',
 *         payload
 *     });
 *     if (loading) { return <Loading />; }
 *     if (error) { return <p>ERROR</p>; }
 *     return (
 *         <div>
 *             <p>Total users: {total}</p>
 *             <ul>
 *                 {data.map(user => <li key={user.username}>{user.username}</li>)}
 *             </ul>
 *         </div>
 *     );
 * };
 */
const useQuery = (query: Query, options: QueryOptions = {}): UseQueryValue => {
	const { type, resource, payload } = query;
	const { withDeclarativeSideEffectsSupport, ...rest } = options;
	const [state, setState] = useState({
		data: undefined,
		error: null,
		loaded: false,
		loading: true,
		total: null,
	});
	const dataProvider = useDataProvider();
	const dataProviderWithDeclarativeSideEffects = useDataProviderWithDeclarativeSideEffects();

	/* eslint-disable react-hooks/exhaustive-deps */
	useEffect(() => {
		setState((prevState: any) => ({
			...prevState,
			loading: true,
		}));

		dataProvider[type](resource, payload, rest)
			.then(({ data, total }: any) => {
				setState({
					data,
					error: null,
					loaded: true,
					loading: false,
					total,
				});
			})
			.catch((error: any) => {
				setState({
					data: undefined,
					error,
					loaded: false,
					loading: false,
					total: null,
				});
			});
	}, [
		// deep equality, see https://github.com/facebook/react/issues/14476#issuecomment-471199055
		JSON.stringify({
			query,
			options: rest,
		}),
		dataProvider,
		dataProviderWithDeclarativeSideEffects,
		setState,
	]);

	// @ts-ignore: FIXME: migrate to react-query
	return state;
};

interface Query {
	type: string;
	resource: string;
	payload: object;
}

interface QueryOptions {
	action?: string;
	onSuccess?: (response: any) => any | object;
	onError?: (error?: any) => any | object;
	withDeclarativeSideEffectsSupport?: boolean;
}

type UseQueryValue = {
	data?: any;
	total?: number;
	error?: any;
	loading: boolean;
	loaded: boolean;
};

export default useQuery;
