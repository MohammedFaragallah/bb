import React from 'react';

import { FilterProps, Forms } from '@types';
import { Filter, FilterListItem } from 'Components/Filters';
import { useTranslation } from 'Hooks';

interface Props extends FilterProps {}

export const FormsFilter: React.FC<Props> = props => {
	const { type } = props;
	const translate = useTranslation();

	return (
		<Filter {...props}>
			{Object.values(Forms).map(form => (
				<FilterListItem
					key={form}
					label={translate(`store.forms.${form}`)}
					type={type}
					value={form}
				/>
			))}
		</Filter>
	);
};
