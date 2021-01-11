import { Paginated } from '@feathersjs/feathers';
import React, { ReactElement, useState } from 'react';
import { useInterval } from 'react-use';

import { OptionSchema } from '@types';
import { Loading } from 'Components';
import { Typography } from 'Components/Typography';
import { MILLE_SECONDS, Resources } from 'Constants';
import { app } from 'Helpers';

interface Props {}

export const ServerCheck: React.FC<Props> = props => {
	const { children } = props;

	const [server, setServer] = useState<boolean | undefined>(undefined);

	const SERVER_DETECTION_REFRESH_RATE = MILLE_SECONDS;

	useInterval(() => {
		if (!server)
			app
				.service(Resources.OPTIONS)
				.find({ query: { name: 'server' } })
				.then((res: Paginated<OptionSchema>) => {
					if (res.data.length) return setServer(true);
					if (server === undefined) setServer(false);
				})
				.catch(() => setServer(false));
	}, SERVER_DETECTION_REFRESH_RATE);

	return !server ? (
		<Loading fullPage logo>
			{server === false && (
				<Typography fontWeight={700} gutterBottom>
					WAITING SERVER BOOTSTRAP
				</Typography>
			)}
		</Loading>
	) : (
		(children as ReactElement)
	);
};
