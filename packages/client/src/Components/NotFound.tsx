import React from 'react';
import { Navigate } from 'react-router-dom';

import { NotFoundLocationState } from '@types';
import { Paths } from 'Constants';

interface Props extends NotFoundLocationState {}

export const NotFound: React.FC<Props> = props => {
	return <Navigate state={props} to={{ pathname: Paths.NOT_FOUND }} />;
};
