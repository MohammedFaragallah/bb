import { Link } from '@material-ui/core';
import React from 'react';
import { FieldProps } from 'react-admin';

export const LinkField: React.FC<FieldProps<any>> = props => {
	const { record, source = '' } = props;

	return record?.[source] ? (
		<Link href={record[source]} target="_blank">
			Link
		</Link>
	) : null;
};
