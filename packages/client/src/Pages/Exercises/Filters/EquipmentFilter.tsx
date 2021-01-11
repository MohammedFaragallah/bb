import React from 'react';

import { Equipments, FilterProps } from '@types';
import { Filter, FilterListItem } from 'Components/Filters';

interface Props extends FilterProps {}

export const EquipmentFilter: React.FC<Props> = props => {
	const { type } = props;

	return (
		<Filter {...props}>
			{Object.values(Equipments).map(equipment => (
				<FilterListItem key={equipment} type={type} value={equipment} />
			))}
		</Filter>
	);
};
