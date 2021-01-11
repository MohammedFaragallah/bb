import { CardHeader, Divider } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { UserSchema } from '@types';
import { Card, Typography } from 'Components';
import { DataTypes, Resources } from 'Constants';
import { UserSelector } from 'Selectors';
import { useQueryWithStore } from 'core';

interface Props {}

export const AuthorDetails: React.FC<Props> = () => {
	const { userId } = useParams();

	const storeUser = useSelector(UserSelector);

	const { data: author } = useQueryWithStore<UserSchema>({
		type: DataTypes.GET_ONE,
		resource: Resources.USERS,
		payload: { id: userId },
	});

	const user = userId ? author : storeUser;
	if (!user) return null;

	return (
		<Card plain>
			<CardHeader title="Background" />
			<Divider />
			<Typography fontWeight={900} gutterBottom push="left">
				Biography
			</Typography>
			<Typography gutterBottom>{user.biography}</Typography>
			<Divider />
			<Typography fontWeight={900} gutterBottom push="left">
				Certifications
			</Typography>
			<Typography gutterBottom>{user.certifications}</Typography>
		</Card>
	);
};
