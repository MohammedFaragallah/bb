import React, { ComponentPropsWithRef } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route as RouterRoute } from 'react-router-dom';
import { StringParam, useQueryParams, withDefault } from 'use-query-params';

import { AuthPaths, Paths, redirectBlacklist } from 'Constants';
import { useRedirectSearch } from 'Hooks';
import { UserSelector } from 'Selectors';

interface Props extends ComponentPropsWithRef<typeof RouterRoute> {
	authenticated?: boolean;
}

export const Route: React.FC<Props> = props => {
	const { authenticated, ...rest } = props;
	const user = useSelector(UserSelector);
	const redirectSearch = useRedirectSearch(redirectBlacklist);

	const [{ redirect = Paths.HOME }] = useQueryParams({
		redirect: withDefault(StringParam, Paths.HOME),
	});

	if (authenticated && !user)
		return (
			<Navigate
				to={{
					pathname: AuthPaths.LOGIN,
					search: redirectSearch,
				}}
			/>
		);

	if (authenticated === false && user) return <Navigate to={redirect} />;

	return <RouterRoute {...rest} />;
};
