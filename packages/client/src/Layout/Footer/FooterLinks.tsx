import { Divider, Grid, List, ListItem } from '@material-ui/core';
import React from 'react';

import { LabeledLink } from '@types';
import { Link, Typography } from 'Components';
import { Paths } from 'Constants';
import { useTranslation } from 'Hooks';

interface Column {
	header: string;
	links: LabeledLink[];
}

interface Props {}

export const FooterLinks: React.FC<Props> = () => {
	const translate = useTranslation();

	const footerLinks: Column[] = [
		{
			links: [
				{ to: Paths.HOME, label: 'Resource' },
				{ to: Paths.HOME, label: 'Resource name' },
				{ to: Paths.HOME, label: 'Another resource' },
				{ to: Paths.HOME, label: 'Final resource' },
			],
			header: 'Resources',
		},
		{
			links: [
				{ to: Paths.PRIVACY, label: 'pageTitle.privacy' },
				{ to: Paths.TERMS, label: 'pageTitle.terms' },
			],
			header: 'Legal',
		},
	];

	return (
		<>
			{footerLinks.map(({ header, links }) => (
				<Grid item key={header} md={3} sm={6}>
					<List
						subheader={
							<>
								<Typography
									align="left"
									color="textPrimary"
									fontWeight={500}
									gutterBottom
									push="left"
								>
									{header}
								</Typography>
								<Divider variant="middle" />
							</>
						}
					>
						{links.map(({ label, to }) => (
							<ListItem dense key={JSON.stringify(label)}>
								<Link to={to}>
									<Typography color="textSecondary">
										{translate(label)}
									</Typography>
								</Link>
							</ListItem>
						))}
					</List>
				</Grid>
			))}
		</>
	);
};
