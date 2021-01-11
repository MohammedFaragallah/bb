import { Box, Rating } from '@material-ui/core';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { FeedbackProps, RatesTypes, ResponseRateSchema } from '@types';
import { LoginLink, Typography } from 'Components';
import { allAvailable, DataTypes, FIRST_ITEM } from 'Constants';
import { UserSelector } from 'Selectors';
import { useMutation, useQueryWithStore } from 'core';

interface Props extends FeedbackProps<RatesTypes> {
	label: string;
}

export const Rates: React.FC<Props> = props => {
	const { type, label, resource, id, target } = props;
	const params = useParams();

	const [mutate, { loading }] = useMutation();
	const [refresh, setRefresh] = useState(false);

	const user = useSelector(UserSelector);
	const userId = user?.id;

	const relationId = target || `${type}Id`;
	const serviceName = resource || `api/${type}-rates`;
	const ID = id || params[relationId];

	const { data: rates } = useQueryWithStore<ResponseRateSchema>(
		{
			type: DataTypes.GET_LIST,
			resource: serviceName,
			payload: {
				...allAvailable,
				filter: { [relationId]: ID, userId },
			},
		},
		{ refresh, onSuccess: () => setRefresh(false) },
	);

	const rated = rates?.[FIRST_ITEM];
	const value = rated?.stars;

	const rate = (stars: number) =>
		mutate(
			{
				type: DataTypes.CREATE,
				resource: serviceName,
				payload: { data: { [relationId]: ID, userId, stars } },
			},
			{ onSuccess: () => setRefresh(true) },
		);

	const updateRate = (stars: number) =>
		mutate(
			{
				type: DataTypes.UPDATE,
				resource: serviceName,
				payload: {
					id: rated?.id,
					data: { [relationId]: ID, userId, stars },
				},
			},
			{ onSuccess: () => setRefresh(true) },
		);

	return userId ? (
		<Box
			sx={{
				alignContent: 'center',
				alignItems: 'center',
				display: 'flex',
				displayPrint: 'none',
				m: 2,
			}}
		>
			<Typography>{label}</Typography>
			<Rating
				disabled={loading || refresh}
				name="story rating"
				onChange={async (event, stars) => {
					if (stars)
						if (!rated) rate(stars);
						else stars !== value && updateRate(stars);
				}}
				value={value || 0}
			/>
		</Box>
	) : (
		<LoginLink>
			<Box
				sx={{
					alignContent: 'center',
					alignItems: 'center',
					display: 'flex',
					displayPrint: 'none',
					m: 2,
				}}
			>
				<Typography>{label}</Typography>
				<Rating name="rating" />
			</Box>
		</LoginLink>
	);
};
