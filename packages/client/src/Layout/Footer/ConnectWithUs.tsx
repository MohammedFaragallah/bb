import { Box, Grid } from '@material-ui/core';
import React from 'react';
import { SocialIcon, SocialIconProps } from 'react-icons-context';

import { Typography } from 'Components';

const socials: SocialIconProps[] = [
	{ href: 'https://github.com/MohammedFaragallah', bgColor: '#333' },
	{ href: 'https://twitter.com/ffragalla' },
	{ href: 'https://facebook.com/MohammedAliFaragallah' },
	{ href: 'https://instagram.com/mohammedalifaragallah', bgColor: '#E1306C' },
	{ href: 'mailto:ffragalla@gmail.com', network: 'mailTo', bgColor: '#dd4b39' },
];

interface Props {}

export const ConnectWithUs: React.FC<Props> = () => {
	return (
		<Grid item md={3} sm={12}>
			<Typography align="left" fontWeight="500" push="left">
				CONNECT WITH US
			</Typography>
			<Box
				sx={{
					m: 2,
					mt: 1,
				}}
			>
				<Grid container spacing={1}>
					{socials.map((network, index) => (
						<Grid item key={index}>
							<SocialIcon {...network} />
						</Grid>
					))}
				</Grid>
			</Box>
		</Grid>
	);
};
