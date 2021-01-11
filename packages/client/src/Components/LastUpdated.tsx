import { TypographyProps } from '@material-ui/core';
import React from 'react';
import { FormattedRelativeTime } from 'react-intl';

import { Typography } from 'Components';
import { MILLE_SECONDS } from 'Constants';
import { useTranslation } from 'Hooks';

interface Props extends TypographyProps {
	date?: string;
	weight?: number;
}

export const LastUpdated: React.FC<Props> = props => {
	const { date, ...rest } = props;
	const translate = useTranslation();

	if (!date) return null;

	return (
		<Typography {...rest}>
			{translate('label.lastUpdated')}
			{' : '}
			<FormattedRelativeTime
				numeric="auto"
				updateIntervalInSeconds={60}
				value={(Date.parse(date) - Date.now()) / MILLE_SECONDS}
			/>
		</Typography>
	);
};

LastUpdated.defaultProps = {
	weight: 300,
};
