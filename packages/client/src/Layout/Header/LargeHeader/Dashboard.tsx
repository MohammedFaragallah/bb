import {
	Grid,
	IconButton,
	Link,
	Tooltip,
	TooltipProps,
	Zoom,
} from '@material-ui/core';
import { EventSeat } from '@material-ui/icons';
import React from 'react';

import { RoleOnly } from 'Components';
import { ACTION_ICONS_COLOR } from 'Constants';

interface Props {
	title: TooltipProps['title'];
}

export const DashBoard: React.FC<Props> = props => {
	const { title } = props;
	const { REACT_APP_DASHBOARD_LINK } = process.env;

	return (
		<RoleOnly>
			<Grid item>
				<Tooltip TransitionComponent={Zoom} placement="bottom" title={title}>
					<Link
						color="textPrimary"
						href={`${REACT_APP_DASHBOARD_LINK}/login`}
						rel="noopener noreferrer"
						target="_blank"
						underline="none"
					>
						<IconButton aria-label="dashboard">
							<EventSeat color={ACTION_ICONS_COLOR} />
						</IconButton>
					</Link>
				</Tooltip>
			</Grid>
		</RoleOnly>
	);
};
