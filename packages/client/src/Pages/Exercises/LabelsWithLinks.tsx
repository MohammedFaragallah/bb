import React from 'react';

import { Link, Typography } from 'Components';
import { Paths } from 'Constants';

interface Props {
	label: string;
	value: string;
	param: string;
}

export const LabelsWithLinks: React.FC<Props> = props => {
	const { label, value, param } = props;

	return (
		<Typography>
			{label}: <Link to={`${Paths.EXERCISES}?${param}=${value}`}>{value}</Link>
		</Typography>
	);
};
