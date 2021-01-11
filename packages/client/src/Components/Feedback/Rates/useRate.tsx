import { FeedbackProps, Identifier, RateSchema, RatesTypes } from '@types';
import { allAvailable, DataTypes } from 'Constants';
import { useQueryWithStore } from 'core';

type Rate = 'Average' | 'Good' | 'Excellent';

const labels: Record<number, Rate> = { 4: 'Good', 5: 'Excellent' };

interface Props extends FeedbackProps<RatesTypes> {
	id?: Identifier;
	target?: string;
}

export const useRate = (props: Props) => {
	const { type, id, target, resource } = props;
	const relationId = target || `${type}Id`;
	const serviceName = resource || `api/${type}-rates`;

	const result = useQueryWithStore<RateSchema>({
		type: DataTypes.GET_LIST,
		resource: serviceName,
		payload: {
			...allAvailable,
			filter: {
				[relationId]: id,
			},
		},
	});

	const { data: rates = [] } = result;

	const index =
		rates.reduce((prev, next) => prev + next.stars, 0) / rates.length;

	return [
		Math.round(index * 10) / 10,
		labels[Math.round(index)] || 'Average',
		result,
	] as const;
};
