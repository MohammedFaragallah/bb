import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { Link } from 'Components';
import { AuthPaths, redirectBlacklist } from 'Constants';
import { useRedirectSearch } from 'Hooks';
import { UserSelector } from 'Selectors';

interface Props {
	to?: string;
}

export const LoginLink: React.FC<Props> = props => {
	const { children, to = AuthPaths.LOGIN } = props;
	const search = useRedirectSearch(redirectBlacklist);
	const user = useSelector(UserSelector);

	return user ? (
		(children as ReactElement)
	) : (
		<Link aria-label="login page" to={{ pathname: to, search }}>
			{children}
		</Link>
	);
};
