import React from 'react';

import { CategoriesTypes, CategorySchema, FilterProps } from '@types';
import { Filter, FilterListItem } from 'Components/Filters';
import { allAvailable, DataTypes, Resources } from 'Constants';
import { useQueryWithStore } from 'core';

interface Props extends FilterProps {}

export const CategoriesFilter: React.FC<Props> = props => {
	const { type } = props;

	const { data: categories = [] } = useQueryWithStore<CategorySchema>({
		type: DataTypes.GET_LIST,
		resource: Resources.CATEGORIES,
		payload: {
			...allAvailable,
			filter: {
				type: CategoriesTypes.store,
			},
		},
	});

	return (
		<Filter {...props}>
			{categories.map(({ name, id }) => (
				<FilterListItem
					key={name}
					label={name}
					type={type}
					value={String(id)}
				/>
			))}
		</Filter>
	);
};
