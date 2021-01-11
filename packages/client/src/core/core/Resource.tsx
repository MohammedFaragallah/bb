import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { registerResource } from '../actions';
import { ResourceProps } from '../types';

interface Props extends ResourceProps {}

export const Resource: React.FC<Props> = ({ name }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(registerResource({ name }));
	}, [dispatch, name]);

	return null;
};
