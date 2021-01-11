import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { StringParam, useQueryParams } from 'use-query-params';

import { Loading } from 'Components';
import { DataTypes, Paths, Resources } from 'Constants';
import { enqueueSnackbar } from 'Store';
import { useMutation } from 'core';

interface Props {}

export const Verify: React.FC<Props> = () => {
	const [mutate, { error, loaded }] = useMutation();
	const dispatch = useDispatch();

	const [{ token, action = 'verifySignupLong' }] = useQueryParams({
		token: StringParam,
		action: StringParam,
	});

	useEffect(() => {
		mutate(
			{
				type: DataTypes.CREATE,
				resource: Resources.AUTH_MANAGEMENT,
				payload: { data: { action, value: token } },
			},
			{
				onSuccess: () => {
					dispatch(
						enqueueSnackbar({
							message: 'Your email has been verified',
							options: { variant: 'success' },
						}),
					);
				},
				onFailure: error => {
					dispatch(
						enqueueSnackbar({
							message: error.message,
							options: { variant: 'warning' },
						}),
					);
				},
			},
		);
	}, [action, dispatch, mutate, token]);

	if (error || loaded) return <Navigate to={Paths.HOME} />;
	return <Loading />;
};
