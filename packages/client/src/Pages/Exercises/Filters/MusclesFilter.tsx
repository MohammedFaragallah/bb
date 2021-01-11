import React from 'react';

import { FilterProps, Muscles } from '@types';
import { Filter, FilterListItem } from 'Components/Filters';

interface Props extends FilterProps {}

export const MusclesFilter: React.FC<Props> = props => {
	const { type } = props;

	return (
		<Filter {...props}>
			{Object.values(Muscles).map(muscle => (
				<FilterListItem key={muscle} type={type} value={muscle} />
			))}
		</Filter>
	);
};
