import {
	IconButton,
	Link,
	Tooltip,
	TooltipProps,
	Zoom,
} from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import React from 'react';

import { Identifier } from '@types';
import { RoleOnly } from 'Components';
import { ACTION_ICONS_COLOR } from 'Constants';

interface Props {
	title: TooltipProps['title'];
	id: Identifier;
}

export const EditStory: React.FC<Props> = props => {
	const { title, id } = props;
	const { REACT_APP_DASHBOARD_LINK } = process.env;

	return (
		<RoleOnly>
			<Tooltip TransitionComponent={Zoom} placement="bottom" title={title}>
				<Link
					href={`${REACT_APP_DASHBOARD_LINK}/stories/${id}`}
					target="_blank"
					underline="none"
				>
					<IconButton>
						<Edit color={ACTION_ICONS_COLOR} />
					</IconButton>
				</Link>
			</Tooltip>
		</RoleOnly>
	);
};
