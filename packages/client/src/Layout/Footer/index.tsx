import { Box, Container, Divider, Grid, makeStyles } from '@material-ui/core';
import React from 'react';

import { Typography } from 'Components';
import { ConnectWithUs } from 'Layout/Footer/ConnectWithUs';
import { FooterLinks } from 'Layout/Footer/FooterLinks';
import { Masters } from 'Layout/Footer/Masters';
import { NewsLetter } from 'Layout/Footer/NewsLetter';
import { Payments } from 'Layout/Footer/Payments';
import { VariousLinks } from 'Layout/Footer/VariousLinks';

const useStyles = makeStyles(theme => {
	const { palette, spacing } = theme;

	return {
		'@global': {
			'*': {
				transition: 'all .2s ease',
			},
			html: {
				scrollBehavior: 'smooth',
			},
			body: {
				backgroundColor: palette.background.paper,
			},
			li: {
				listStyle: 'none',
			},
			ul: {
				margin: 0,
				padding: 0,
			},
			img: {
				objectFit: 'cover',
			},
			'::selection': {
				backgroundColor: palette.primary.dark,
				color: palette.common.white,
				textShadow: 'none',
			},
			'::-webkit-scrollbar': {
				width: spacing(1),
				position: 'absolute',
			},
			'::-webkit-scrollbar-track': {
				backgroundColor: palette.background.paper,
				marginTop: spacing(-1),
				marginBottom: spacing(-1),
			},
			'::-webkit-scrollbar-thumb': {
				backgroundColor: palette.primary.main,
				backdropFilter: 'blur(10px)',
				borderRadius: spacing(1),
			},
			'.browserUpgrade': {
				margin: '0.2em 0',
				background: palette.background.paper,
				color: palette.common.black,
				padding: '0.2em 0',
			},
			'.slick-dots': {
				bottom: spacing(1, '!important'),
			},
		},
		caution: {
			maxWidth: '600px',
			margin: spacing(2.5, 'auto'),
		},
	};
});

interface Props {}

export const Footer: React.FC<Props> = () => {
	const classes = useStyles();

	return (
		<Box
			sx={{
				mt: 3,
				textAlign: 'center',
			}}
		>
			<Container maxWidth="lg">
				<Divider />
				<Masters />
				<Grid container justifyContent="space-evenly" spacing={2}>
					<FooterLinks />
					<ConnectWithUs />
					<NewsLetter />
				</Grid>
			</Container>
			<Box
				sx={{
					bgcolor: 'background.paper',
					height: '100%',
					pb: 2,
				}}
			>
				<Payments />
				<VariousLinks />
				<Typography display="block" variant="caption">
					© {new Date().getFullYear()} ########. All rights reserved.
				</Typography>
				<Typography
					align="center"
					className={classes.caution}
					display="block"
					variant="caption"
				>
					Always consult with a qualified healthcare professional prior to
					beginning any diet or exercise program or taking any dietary
					supplement. The content on our website is for informational and
					educational purposes only and is not intended as medical advice or to
					replace a relationship with a qualified healthcare professional.
				</Typography>
				{/* <MadeBy /> */}
			</Box>
		</Box>
	);
};
