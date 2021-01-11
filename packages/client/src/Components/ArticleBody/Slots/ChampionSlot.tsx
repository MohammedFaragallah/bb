import React from 'react';

import { ChampionSchema, SlotProps } from '@types';
import { Link, Typography } from 'Components';
import { DataTypes, FIRST_ITEM, Resources } from 'Constants';
import { ChampionURL } from 'Helpers';
import { useQueryWithStore } from 'core';

interface Props extends SlotProps {}

export const ChampionSlot: React.FC<Props> = props => {
	const { section } = props;
	const id = section.split('/').slice(1, section.split('/').length)[FIRST_ITEM];

	const { data: champion } = useQueryWithStore<ChampionSchema>({
		type: DataTypes.GET_ONE,
		resource: Resources.CHAMPIONS,
		payload: { id },
	});

	return (
		<Link to={ChampionURL(champion)}>
			<Typography>{champion?.name}</Typography>
		</Link>
	);
};
