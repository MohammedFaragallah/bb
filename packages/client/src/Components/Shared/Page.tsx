import { Box, Container, ContainerProps } from '@material-ui/core';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigate, useLocation } from 'react-router-dom';

import { ErrorBoundary, Loading, Typography } from 'Components';
import { Paths } from 'Constants';
import { useTranslation } from 'Hooks';
import { Logo } from 'Layout/Logo';

interface Props extends ContainerProps {
	titles?: any[];
	customDisplayPrint?: boolean;
	loading?: boolean;
	notfound?: boolean;
	notfoundMsg?: string;
}

export const Page: React.FC<Props> = props => {
	const {
		children,
		className,
		customDisplayPrint = false,
		loading = false,
		titles = [],
		notfound,
		notfoundMsg,
		...rest
	} = props;
	const { pathname } = useLocation();
	const translate = useTranslation();

	const { REACT_APP_NAME } = process.env;

	if (notfound)
		return <Navigate state={{ message: notfoundMsg }} to={Paths.NOT_FOUND} />;

	return (
		<Container component="main" {...rest}>
			<Helmet>
				<title>
					{[...titles.map(translate), REACT_APP_NAME]
						.filter(Boolean)
						.join(' | ')}
				</title>
			</Helmet>

			{loading ? (
				<Loading />
			) : (
				<Box
					sx={{
						displayPrint: customDisplayPrint ? 'block' : 'none',
					}}
				>
					<Box
						sx={{
							alignItems: 'center',
							display: 'none',
							displayPrint: 'flex',
							flexDirection: 'column',
						}}
					>
						<Logo />
						<Typography>{titles?.[0]}</Typography>
					</Box>
					<ErrorBoundary key={pathname}>{children}</ErrorBoundary>
				</Box>
			)}
		</Container>
	);
};
