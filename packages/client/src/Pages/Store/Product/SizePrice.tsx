import { Box } from '@material-ui/core';
import React from 'react';
import { FormattedNumber } from 'react-intl';

import { useTranslation } from 'Hooks';

interface Props {
	price?: number;
}

export const SizePrice: React.FC<Props> = props => {
	const { price } = props;
	const translate = useTranslation();

	return (
		<Box
			sx={{
				display: 'flex',
				mb: 1,
			}}
		>
			{translate('store.price')}
			{' : '}
			<Box
				sx={{
					fontWeight: 600,
				}}
			>
				<FormattedNumber format="EGP" value={price || 0} />
			</Box>
		</Box>
	);
};
