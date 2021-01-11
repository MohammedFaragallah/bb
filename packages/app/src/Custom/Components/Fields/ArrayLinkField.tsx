import { Chip, Link } from '@material-ui/core';
import React from 'react';

export const ArrayLinkField: React.FC<any> = props => {
	const { record } = props;

	return record ? (
		<Link href={record} target="_blank">
			<Chip label={record} />
		</Link>
	) : null;
};
