import { Box } from '@material-ui/core';
import React from 'react';

import { BreadcrumbPath } from '@types';
import { Icon, Link } from 'Components';
import { useTranslation } from 'Hooks';

export const Path: React.FC<BreadcrumbPath> = props => {
	const { label, icon, children, ...rest } = props;
	const translate = useTranslation();

	return (
		<Link {...rest}>
			<Box
				sx={{
					alignItems: 'center',
					display: 'flex',
				}}
			>
				{(children || icon) && (
					<Icon color="action" link push="right">
						{children || icon}
					</Icon>
				)}
				{translate(label)}
			</Box>
		</Link>
	);
};
