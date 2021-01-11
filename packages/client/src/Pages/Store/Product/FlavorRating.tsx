import { Box, Rating } from '@material-ui/core';
import React from 'react';

import { Identifier, RatesTypes } from '@types';
import { useRate } from 'Components/Feedback';
import { useTranslation } from 'Hooks';

interface Props {
	id?: Identifier;
}

export const FlavorRating: React.FC<Props> = props => {
	const { id } = props;
	const translate = useTranslation();

	const [rate = 5] = useRate({
		type: RatesTypes.product,
		id,
		target: 'productFlavorId',
	});

	return (
		<Box
			sx={{
				display: 'flex',
				mb: 1,
			}}
		>
			{translate('store.flavorRating')}
			{' : '}
			<Rating name="flavor rating" precision={0.1} readOnly value={rate} />
		</Box>
	);
};
