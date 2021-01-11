import React from 'react';

import { FilterProps, FitnessLevel } from '@types';
import { Filter, FilterListItem } from 'Components/Filters';

interface Props extends FilterProps {}

export const FitnessLevelFilter: React.FC<Props> = props => {
	const { type } = props;

	return (
		<Filter {...props}>
			{Object.values(FitnessLevel).map(fitnessLevel => (
				<FilterListItem key={fitnessLevel} type={type} value={fitnessLevel} />
			))}
		</Filter>
	);
};
