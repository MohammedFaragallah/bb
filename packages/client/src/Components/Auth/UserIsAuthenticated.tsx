import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { AuthPaths, redirectBlacklist } from 'Constants';
import { useRedirectSearch } from 'Hooks';
import { UserSelector } from 'Selectors';

interface Props {
	fallback?: ReactElement;
}

export const UserIsAuthenticated: React.FC<Props> = props => {
	const { children, fallback = null } = props;
	const user = useSelector(UserSelector);
	const search = useRedirectSearch(redirectBlacklist);

	if (!user)
		return fallback || <Navigate to={{ pathname: AuthPaths.LOGIN, search }} />;

	return children as ReactElement;
};
