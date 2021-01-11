import React from 'react';
import { useIntl } from 'react-intl';

import { FilterProps } from '@types';
import { Filter, FromToFilterListItem } from 'Components/Filters';
import { useTranslation } from 'Hooks';

export interface FromTo {
	gt: number;
	lt: number;
}

const fromTo = [
	{ gt: 100, lt: 300 },
	{ gt: 300, lt: 500 },
	{ gt: 500, lt: 750 },
	{ gt: 750, lt: 1000 },
];

const min = 0;
const last = fromTo[fromTo.length - 1].lt;
const least = fromTo[0].gt;

interface Props extends FilterProps {}

export const PriceFilter: React.FC<Props> = props => {
	const intl = useIntl();
	const translate = useTranslation();

	const fromToLabels = fromTo.map(item => ({
		value: item,
		label: translate({ id: 'store.fromTo' }, item),
	}));

	const prices = [
		{
			value: { gt: min, lt: least },
			label: `${translate('label.lessThan')} ${intl.formatNumber(least, {
				format: 'EGP',
			})}`,
		},
		...fromToLabels,
		{
			value: { lt: last },
			label: `${translate('label.moreThan')} ${intl.formatNumber(last, {
				format: 'EGP',
			})}`,
		},
	];

	return (
		<Filter {...props}>
			{prices.map(({ value, label }) => (
				<FromToFilterListItem
					key={label.toString()}
					label={label}
					value={value}
				/>
			))}
		</Filter>
	);
};
