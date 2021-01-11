import { Box, BoxProps } from '@material-ui/core';
import React from 'react';

interface Props extends BoxProps {}

const CenteredMessage: React.FC<Props> = props => {
	const { children, ...rest } = props;

	return (
		<Box
			{...rest}
			sx={{
				justifyItems: 'center',
				alignContent: 'center',
				alignItems: 'center',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				minHeight: '30vh',
				overflow: 'hidden',
				width: '100%',
			}}
		>
			{children}
		</Box>
	);
};

export { CenteredMessage };
