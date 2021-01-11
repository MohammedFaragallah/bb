import { Box } from '@material-ui/core';
import React from 'react';
import { SocialIcon } from 'react-icons-context';

const Providers = ['google', 'facebook'];

interface Props {}

export const SocialLoginButtons: React.FC<Props> = () => {
	const { REACT_APP_BACK_END_URI } = process.env;

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				my: 2,
			}}
		>
			{Providers.map(provider => {
				const link = `${REACT_APP_BACK_END_URI}/oauth/${provider}`;

				return (
					<Box
						key={provider}
						sx={{
							mx: 1,
						}}
					>
						<SocialIcon href={link} network={provider} size={50} />
					</Box>
				);
			})}
		</Box>
	);
};
