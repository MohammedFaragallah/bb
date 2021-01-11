import { useMemo } from 'react';

import { DataProvider, UseDataProviderOptions } from '../types';
import useDataProvider from './useDataProvider';

/**
 * This version of the useDataProvider hook ensure Query and Mutation components are still usable
 * with side effects declared as objects.
 *
 * @deprecated This is for backward compatibility only and will be removed in next major version.
 */
const useDataProviderWithDeclarativeSideEffects = (): DataProvider => {
	const dataProvider = useDataProvider();

	const dataProviderProxy = useMemo(() => {
		return new Proxy(dataProvider, {
			get: (target, name) => {
				return (
					resource: string,
					payload: any,
					options: UseDataProviderOptions,
				) => {
					try {
						return target[name.toString()](resource, payload, options);
					} catch (e) {
						// turn synchronous exceptions (e.g. in parameter preparation)
						// into async ones, otherwise they'll be lost
						return Promise.reject(e);
					}
				};
			},
		});
	}, [dataProvider]);

	return dataProviderProxy;
};

export default useDataProviderWithDeclarativeSideEffects;
