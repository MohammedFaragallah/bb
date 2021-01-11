import { useLocation } from 'react-router-dom';

import { Paths } from 'Constants';

export const useRedirectSearch = (ignores: string[] = []) => {
	const { pathname } = useLocation();

	return `?redirect=${ignores.includes(pathname) ? Paths.HOME : pathname}`;
};
