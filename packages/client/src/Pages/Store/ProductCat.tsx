import React from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { Paths } from 'Constants';

interface Props {}

export const ProductCat: React.FC<Props> = () => {
	const { categoryId } = useParams();

	return (
		<Navigate
			to={{
				pathname: Paths.STORE,
				search: `?category=${categoryId}`,
			}}
		/>
	);
};
