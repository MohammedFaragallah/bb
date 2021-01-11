import React from 'react';
import { Filter, TextInput } from 'react-admin';

const BaseFilter: React.FC<any> = props => {
	const { ID = true, children } = props;

	return (
		<Filter variant="outlined" {...props}>
			{ID && <TextInput source="id" />}
			{children}
		</Filter>
	);
};

export { BaseFilter };
