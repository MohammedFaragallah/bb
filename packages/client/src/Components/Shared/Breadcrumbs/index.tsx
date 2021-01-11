import {
	Box,
	Breadcrumbs as MuiBreadcrumbs,
	BreadcrumbsProps,
	useTheme,
} from '@material-ui/core';
import {
	Home,
	KeyboardArrowLeft,
	KeyboardArrowRight,
} from '@material-ui/icons';
import React from 'react';

import { BreadcrumbPath } from '@types';
import { Path } from 'Components/Shared/Breadcrumbs/Path';
import { Paths } from 'Constants';

interface Props extends BreadcrumbsProps {
	paths: BreadcrumbPath[];
}

export const Breadcrumbs: React.FC<Props> = props => {
	const { paths } = props;
	const dir = useTheme().direction;

	return (
		<Box
			sx={{
				display: 'flex',
				displayPrint: 'none',
				justifyContent: 'center',
				m: 1,
				pt: 1,
			}}
		>
			<MuiBreadcrumbs
				aria-label="breadcrumb"
				separator={
					dir === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />
				}
				{...props}
			>
				<Path label="pageTitle.home" to={Paths.HOME}>
					<Home />
				</Path>
				{paths.map(path => (
					<Path key={JSON.stringify(path.label)} {...path} />
				))}
			</MuiBreadcrumbs>
		</Box>
	);
};
