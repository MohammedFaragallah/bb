import { Avatar, AvatarProps, Box, Icon } from '@material-ui/core';
import React from 'react';
import { FieldProps } from 'react-admin';

import { SquareSize } from 'types';

interface Props extends AvatarProps, FieldProps {
	size?: SquareSize;
	field?: string;
	source: NonNullable<FieldProps['source']>;
}

export const AvatarField: React.FC<Props> = props => {
	const {
		record,
		size = 50,
		alt,
		field = 'secure_url',
		source,
		...rest
	} = props;

	const link = record?.[source]?.[field];

	return record ? (
		<Box alignItems="center" display="flex" flexWrap="nowrap">
			<Avatar
				alt={alt ? record[alt] : ''}
				src={link}
				style={{ width: size, height: size }}
				{...rest}
			>
				<Icon>cloud_off</Icon>
			</Avatar>
		</Box>
	) : null;
};
