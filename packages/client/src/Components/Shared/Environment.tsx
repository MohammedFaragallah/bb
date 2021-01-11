import React from 'react';

import { Environments } from '@types';
import { Show } from 'Components';

interface Props {
	env?: Environments;
}

export const Environment: React.FC<Props> = props => {
	const { env } = props;
	const { NODE_ENV } = process.env;

	return <Show show={NODE_ENV === env || env === 'all'} {...props} />;
};
