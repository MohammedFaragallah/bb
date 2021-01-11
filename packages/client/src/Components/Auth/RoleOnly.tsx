import isArray from 'lodash/isArray';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { Roles } from '@types';
import { UserSelector } from 'Selectors';

interface Props {
	fallback?: ReactElement;
	role?: Roles | Roles[];
}

export const RoleOnly: React.FC<Props> = props => {
	const { children, fallback = null } = props;
	let { role = Roles.admin } = props;
	const user = useSelector(UserSelector);

	if (!isArray(role)) role = [role as Roles];

	return user?.roles && role.includes(user.roles)
		? (children as ReactElement)
		: (fallback as ReactElement);
};
