import {
	Box,
	Accordion,
	AccordionDetails,
	AccordionSummary,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import prettyBytes from 'pretty-bytes';
import React from 'react';

import { Typography } from 'Components';
import { DepSize } from 'Pages/SiteMap/Dependencies';

interface Props {
	dependencySizes: DepSize[];
	dependencyCount: number;
}

export const SubDeps: React.FC<Props> = props => {
	const { dependencySizes, dependencyCount } = props;

	return (
		<Accordion>
			<AccordionSummary
				aria-controls="panel1a-content"
				expandIcon={<ExpandMore />}
				id="panel1a-header"
			>
				<Typography>
					{'Dependencies : '}
					{dependencyCount}
				</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					{dependencySizes.map((dep, index: number) => (
						<Typography key={index}>
							{dep.name} - {prettyBytes(dep.approximateSize)}
						</Typography>
					))}
				</Box>
			</AccordionDetails>
		</Accordion>
	);
};
