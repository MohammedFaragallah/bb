import { useSelector } from 'react-redux';

import { CoreState } from '../types';

/**
 * Get the loading status, i.e. a boolean indicating if at least one request is pending
 *
 * @see useLoad
 *
 * @example
 *
 * import { useLoading } from 'react-admin';
 *
 * const MyComponent = () => {
 *      const loading = useLoading();
 *      return loading ? <Squeleton /> : <RealContent>;
 * }
 */
const useLoading = () => useSelector((state: CoreState) => state.loading > 0);

export default useLoading;
