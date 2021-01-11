import React from 'react';

import { ExerciseSchema, SlotProps } from '@types';
import { ExerciseCard } from 'Components/Cards';
import { DataTypes, FIRST_ITEM, Resources } from 'Constants';
import { useQueryWithStore } from 'core';

interface Props extends SlotProps {}

export const ExerciseSlot: React.FC<Props> = props => {
	const { section } = props;
	const id = section.split('/').slice(1, section.split('/').length)[FIRST_ITEM];

	const { data: exercise } = useQueryWithStore<ExerciseSchema>({
		type: DataTypes.GET_ONE,
		resource: Resources.EXERCISES,
		payload: { id },
	});

	return exercise ? <ExerciseCard exercise={exercise} /> : null;
};
