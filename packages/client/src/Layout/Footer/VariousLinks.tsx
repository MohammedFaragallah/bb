import { Box, makeStyles } from '@material-ui/core';
import React from 'react';

import { LabeledLink } from '@types';
import { Link, Typography } from 'Components';
import { Paths } from 'Constants';
import { useTranslation } from 'Hooks';

const useStyles = makeStyles(theme => {
	const { spacing, palette } = theme;

	return {
		link: {
			borderRight: `1px solid ${palette.grey[500]}`,
			marginRight: spacing(1),
			paddingRight: spacing(1),
		},
	};
});

interface Props {}

export const VariousLinks: React.FC<Props> = () => {
	const classes = useStyles();
	const translate = useTranslation();

	const links: LabeledLink[] = [
		{ label: 'Careers', to: Paths.HOME },
		{ to: Paths.PRIVACY, label: 'pageTitle.privacy' },
		{ to: Paths.TERMS, label: 'pageTitle.terms' },
		{ label: 'About Us', to: Paths.HOME },
		{ label: 'Site Map', to: Paths.SITE_MAP },
		{ label: 'Affiliates', to: Paths.HOME },
		{ label: 'Advertise with Us', to: Paths.HOME },
		{ label: 'Help', to: Paths.HOME },
	];

	return (
		<Box
			sx={{
				alignItems: 'center',
				display: 'flex',
				flexDirection: 'row',
				flexWrap: 'wrap',
				justifyContent: 'center',
			}}
		>
			{links.map(({ label, to }, index) => {
				const last = index !== links.length - 1;

				return (
					<Link key={JSON.stringify(label)} to={to}>
						<Typography
							className={last ? classes.link : undefined}
							color="textSecondary"
							fontWeight={500}
						>
							{translate(label)}
						</Typography>
					</Link>
				);
			})}
		</Box>
	);
};
