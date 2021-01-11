import {
	Box,
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Link,
	makeStyles,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import prettyBytes from 'pretty-bytes';
import React from 'react';

import { Typography } from 'Components';
import { Dep } from 'Pages/SiteMap/Dependencies';

import { SubDeps } from './SubDeps';

const useStyles = makeStyles(theme => {
	const { typography } = theme;

	return {
		root: {
			width: '100%',
		},
		heading: {
			fontSize: typography.pxToRem(15),
			fontWeight: typography.fontWeightRegular,
		},
	};
});

interface Props {
	dep: Dep;
}

export const Dependency: React.FC<Props> = props => {
	const {
		name,
		version,
		description,
		repository,
		size,
		gzip,
		dependencySizes,
		dependencyCount,
	} = props.dep;
	const classes = useStyles();

	return (
		<Accordion>
			<AccordionSummary
				aria-controls="panel1a-content"
				expandIcon={<ExpandMore />}
				id="panel1a-header"
			>
				<Typography className={classes.heading}>
					<Link
						href={repository}
						rel="noopener noreferrer"
						style={{ height: '100%' }}
						target="_blank"
						underline="none"
					>
						{name}{' '}
					</Link>
					- V{version} - {prettyBytes(gzip)}
				</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Box>
					<Typography>Before Zip size: {prettyBytes(size)}</Typography>
					<Typography>{description}</Typography>
					<SubDeps
						dependencyCount={dependencyCount}
						dependencySizes={dependencySizes}
					/>
				</Box>
			</AccordionDetails>
		</Accordion>
	);
};
