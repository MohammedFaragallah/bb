import React from 'react';
import { Navigate } from 'react-router-dom';
import { StringParam, useQueryParams } from 'use-query-params';

import { AuthPaths } from 'Constants';

interface Props {}

export const Reset: React.FC<Props> = () => {
	const [{ token }] = useQueryParams({ token: StringParam });

	return (
		<Navigate
			to={{
				pathname: AuthPaths.RESET,
				search: `?token=${token}`,
			}}
		/>
	);
};
