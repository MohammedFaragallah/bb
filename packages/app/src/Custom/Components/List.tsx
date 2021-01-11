import React from 'react';
import { List as RAList } from 'react-admin';

export const List: React.FC<any> = props => {
	const { children } = props;

	return (
		<RAList title={`${props.options.label} List`} {...props}>
			{children}
		</RAList>
	);
};
