import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { StringParam, useQueryParams, withDefault } from 'use-query-params';

import { Paths } from 'Constants';
import { UserSelector } from 'Selectors';

interface Props {
	fallback?: ReactElement;
}

export const UserIsNotAuthenticated: React.FC<Props> = props => {
	const { children, fallback } = props;
	const user = useSelector(UserSelector);

	const [{ redirect = Paths.HOME }] = useQueryParams({
		redirect: withDefault(StringParam, Paths.HOME),
	});

	if (user) return fallback || <Navigate to={redirect} />;

	return children as ReactElement;
};
