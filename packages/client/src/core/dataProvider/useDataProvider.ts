import { useContext, useMemo } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { Dispatch } from 'redux';

import {
	CoreState,
	DataProvider,
	DataProviderProxy,
	DataProviderTypes,
	FETCH_END,
	FETCH_ERROR,
	FETCH_START,
	UseDataProviderOptions,
} from '../types';
import DataProviderContext from './DataProviderContext';
import defaultDataProvider from './defaultDataProvider';
import { canReplyWithCache, getResultFromCache } from './replyWithCache';
import validateResponseFormat from './validateResponseFormat';

/**
 * Hook for getting a dataProvider
 *
 * Gets a dataProvider object, which behaves just like the real dataProvider
 * (same methods returning a Promise). But it's actually a Proxy object, which
 * dispatches Redux actions along the process. The benefit is that react-admin
 * tracks the loading state when using this hook, and stores results in the
 * Redux store for future use.
 *
 * In addition to the 2 usual parameters of the dataProvider methods (resource,
 * payload), the Proxy supports a third parameter for every call. It's an
 * object literal which may contain side effects
 *
 * @return dataProvider
 *
 * @example Basic usage
 *
 * import React, { useState } from 'react';
 * import { useDataProvider } from 'react-admin';
 *
 * const PostList = () => {
 *      const [posts, setPosts] = useState([])
 *      const dataProvider = useDataProvider();
 *      useEffect(() => {
 *          dataProvider.getList('posts', { filter: { status: 'pending' }})
 *            .then(({ data }) => setPosts(data));
 *      }, [])
 *
 *      return (
 *          <Fragment>
 *              {posts.map((post, key) => <PostDetail post={post} key={key} />)}
 *          </Fragment>
 *     }
 * }
 *
 * @example Handling all states (loading, error, success)
 *
 * import { useState, useEffect } from 'react';
 * import { useDataProvider } from 'react-admin';
 *
 * const UserProfile = ({ userId }) => {
 *     const dataProvider = useDataProvider();
 *     const [user, setUser] = useState();
 *     const [loading, setLoading] = useState(true);
 *     const [error, setError] = useState();
 *     useEffect(() => {
 *         dataProvider.getOne('users', { id: userId })
 *             .then(({ data }) => {
 *                 setUser(data);
 *                 setLoading(false);
 *             })
 *             .catch(error => {
 *                 setError(error);
 *                 setLoading(false);
 *             })
 *     }, []);
 *
 *     if (loading) return <Loading />;
 *     if (error) return <Error />
 *     if (!user) return null;
 *
 *     return (
 *         <ul>
 *             <li>Name: {user.name}</li>
 *             <li>Email: {user.email}</li>
 *         </ul>
 *     )
 * }
 *
 * @example Action customization
 *
 * dataProvider.getOne('users', { id: 123 });
 * // will dispatch the following actions:
 * // - CUSTOM_FETCH
 * // - CUSTOM_FETCH_LOADING
 * // - FETCH_START
 * // - CUSTOM_FETCH_SUCCESS
 * // - FETCH_END
 *
 * dataProvider.getOne('users', { id: 123 }, { action: CRUD_GET_ONE });
 * // will dispatch the following actions:
 * // - CRUD_GET_ONE
 * // - CRUD_GET_ONE_LOADING
 * // - FETCH_START
 * // - CRUD_GET_ONE_SUCCESS
 * // - FETCH_END
 */
const useDataProvider = (): DataProviderProxy => {
	const dispatch = useDispatch();
	const dataProvider = useContext(DataProviderContext) || defaultDataProvider;
	const store = useStore<CoreState>();

	const dataProviderProxy = useMemo(() => {
		return new Proxy(dataProvider, {
			get: (target, name) => {
				return (
					resource: string,
					payload: any,
					options: UseDataProviderOptions,
				) => {
					const type = name.toString() as DataProviderTypes;
					const {
						action = 'CUSTOM_FETCH',
						onSuccess = undefined,
						onFailure = undefined,
						...rest
					} = options || {};

					if (typeof dataProvider[type] !== 'function') {
						throw new Error(`Unknown dataProvider function: ${type}`);
					}
					if (onSuccess && typeof onSuccess !== 'function') {
						throw new Error('The onSuccess option must be a function');
					}
					if (onFailure && typeof onFailure !== 'function') {
						throw new Error('The onFailure option must be a function');
					}

					const params = {
						action,
						dataProvider,
						dispatch,
						onFailure,
						onSuccess,
						payload,
						resource,
						rest,
						store,
						type,
					};
					return doQuery(params);
				};
			},
		});
	}, [dataProvider, dispatch, store]);

	return dataProviderProxy;
};

const doQuery = ({
	type,
	payload,
	resource,
	action,
	rest,
	onSuccess,
	onFailure,
	dataProvider,
	dispatch,
	store,
	logoutIfAccessDenied,
}: any) => {
	const resourceState = store.getState().resources[resource];
	if (canReplyWithCache(type, payload, resourceState)) {
		return answerWithCache({
			type,
			payload,
			resource,
			action,
			rest,
			onSuccess,
			resourceState,
			dispatch,
		});
	}
	return performQuery({
		type,
		payload,
		resource,
		action,
		rest,
		onSuccess,
		onFailure,
		dataProvider,
		dispatch,
		logoutIfAccessDenied,
	});
};

/**
 * In normal mode, the hook calls the dataProvider. When a successful response
 * arrives, the hook dispatches a SUCCESS action, executes success side effects
 * and returns the response. If the response is an error, the hook dispatches
 * a FAILURE action, executes failure side effects, and throws an error.
 */
const performQuery = ({
	type,
	payload,
	resource,
	action,
	rest,
	onSuccess,
	onFailure,
	dataProvider,
	dispatch,
	logoutIfAccessDenied,
}: QueryFunctionParams) => {
	dispatch({
		type: action,
		payload,
		meta: { resource, ...rest },
	});
	dispatch({
		type: `${action}_LOADING`,
		payload,
		meta: { resource, ...rest },
	});
	dispatch({ type: FETCH_START });
	try {
		return dataProvider[type](resource, payload)
			.then((response: any) => {
				if (process.env.NODE_ENV !== 'production') {
					validateResponseFormat(response, type);
				}
				dispatch({
					type: `${action}_SUCCESS`,
					payload: response,
					requestPayload: payload,
					meta: {
						...rest,
						resource,
						fetchResponse: type,
						fetchStatus: FETCH_END,
					},
				});
				dispatch({ type: FETCH_END });
				onSuccess?.(response);
				return response;
			})
			.catch((error: any) => {
				if (process.env.NODE_ENV !== 'production') {
					console.error(error);
				}
				return logoutIfAccessDenied(error).then(loggedOut => {
					if (loggedOut) return;
					dispatch({
						type: `${action}_FAILURE`,
						error: error.message ? error.message : error,
						payload: error.body ? error.body : null,
						requestPayload: payload,
						meta: {
							...rest,
							resource,
							fetchResponse: type,
							fetchStatus: FETCH_ERROR,
						},
					});
					dispatch({ type: FETCH_ERROR, error });
					onFailure?.(error);
					throw error;
				});
			});
	} catch (e) {
		if (process.env.NODE_ENV !== 'production') {
			console.error(e);
		}
		throw new Error(
			'The dataProvider threw an error. It should return a rejected Promise instead.',
		);
	}
};

const answerWithCache = ({
	type,
	payload,
	resource,
	action,
	rest,
	onSuccess,
	resourceState,
	dispatch,
}: any) => {
	dispatch({
		type: action,
		payload,
		meta: { resource, ...rest },
	});
	const response = getResultFromCache(type, payload, resourceState);
	dispatch({
		type: `${action}_SUCCESS`,
		payload: response,
		requestPayload: payload,
		meta: {
			...rest,
			resource,
			fetchResponse: type,
			fetchStatus: FETCH_END,
			fromCache: true,
		},
	});
	onSuccess?.(response);
	return Promise.resolve(response);
};

interface QueryFunctionParams {
	/** The fetch type, e.g. `UPDATE_MANY` */
	type: DataProviderTypes;
	payload: any;
	resource: string;
	/** The root action name, e.g. `CRUD_GET_LIST` */
	action: string;
	rest: any;
	onSuccess?: (args?: any) => void;
	onFailure?: (error: any) => void;
	dataProvider: DataProvider;
	dispatch: Dispatch;
	logoutIfAccessDenied: (error?: any) => Promise<boolean>;
}

export default useDataProvider;
