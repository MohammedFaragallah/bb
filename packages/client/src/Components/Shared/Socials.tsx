import { Box, IconButton } from '@material-ui/core';
import React from 'react';
import { SocialIcon, SocialIconProps } from 'react-icons-context';

interface Props {
	socials?: SocialIconProps[];
}

export const Socials: React.FC<Props> = props => {
	const { socials = [] } = props;

	return (
		<Box
			sx={{
				alignItems: 'space-between',
				display: 'flex',
				justifyContent: 'center',
			}}
		>
			{socials.map(social => {
				const { network, href } = social;

				return href ? (
					<IconButton
						key={JSON.stringify({ icon: network, href })}
						size="small"
					>
						<SocialIcon size={25} target="_blank" {...social} />
					</IconButton>
				) : null;
			})}
		</Box>
	);
};
