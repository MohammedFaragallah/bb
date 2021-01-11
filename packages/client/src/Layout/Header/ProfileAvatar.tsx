import { Avatar, IconButton, Tooltip, Zoom } from '@material-ui/core';
import { Face } from '@material-ui/icons';
import React from 'react';
import { useSelector } from 'react-redux';

import { Link, UserIsAuthenticated } from 'Components';
import { ACTION_ICONS_COLOR, Paths } from 'Constants';
import { imageURL } from 'Helpers';
import { useTranslation } from 'Hooks';
import { UserSelector } from 'Selectors';

interface Props {}

export const ProfileAvatar: React.FC<Props> = () => {
	const user = useSelector(UserSelector);
	const profileImage = imageURL(user, 'profile');
	const translate = useTranslation();

	return (
		<Link aria-label="profile page" to={Paths.PROFILE}>
			<UserIsAuthenticated
				fallback={
					<Tooltip
						TransitionComponent={Zoom}
						placement="bottom"
						title={translate('nav.actions.profile')}
					>
						<IconButton aria-label="profile">
							<Face color={ACTION_ICONS_COLOR} />
						</IconButton>
					</Tooltip>
				}
			>
				<Avatar alt={user?.userName} src={profileImage} />
			</UserIsAuthenticated>
		</Link>
	);
};
