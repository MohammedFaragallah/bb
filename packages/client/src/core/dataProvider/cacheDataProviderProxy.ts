import { DataProvider, DataProviderTypes } from '../types';

const fiveMinutes = 5 * 60 * 1000;

/**
 * Wrap a dataProvider in a Proxy that modifies responses to add caching.
 *
 * This proxy adds a validUntil field to the response of read queries
 * (getList, getOne) so that the useDataProvider enables caching
 * for these calls.
 *
 * @param {DataProvider} dataProvider A data provider object
 * @param {number} duration Cache duration in milliseconds. Defaults to 5 minutes.
 *
 * @example
 *
 * import { cacheDataProviderProxy } from 'core';
 *
 * const cacheEnabledDataProvider = cacheDataProviderProxy(dataProvider);
 */
const cacheDataProviderProxy = (
	dataProvider: DataProvider,
	duration: number = fiveMinutes,
): DataProvider =>
	new Proxy(dataProvider, {
		get: (target, name: DataProviderTypes) => (resource: any, params: any) => {
			if (name === 'getList' || name === 'getOne') {
				// @ts-ignore: FIXME: migrate to react-query
				return dataProvider[name](resource, params).then(response => {
					const validUntil = new Date();
					validUntil.setTime(validUntil.getTime() + duration);
					response.validUntil = validUntil;
					return response;
				});
			}
			return dataProvider[name](resource, params);
		},
	});

export default cacheDataProviderProxy;
