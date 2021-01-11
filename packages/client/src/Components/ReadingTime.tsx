import { TypographyProps } from '@material-ui/core';
import React from 'react';

import { Typography } from 'Components';
import { useTranslation } from 'Hooks';

interface Props extends TypographyProps {
	minutes?: number;
	weight?: number;
}

export const ReadingTime: React.FC<Props> = props => {
	const { minutes, ...rest } = props;
	const translate = useTranslation();

	if (!minutes) return null;

	return (
		<Typography {...rest}>
			{translate({ id: 'label.readingTime' }, { minutes: Math.floor(minutes) })}
		</Typography>
	);
};

ReadingTime.defaultProps = {
	minutes: 0,
	weight: 300,
	display: 'inline',
};
