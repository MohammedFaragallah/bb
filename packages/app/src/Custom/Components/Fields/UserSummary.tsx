import { Avatar, Badge, Box, Icon, makeStyles } from '@material-ui/core';
import React from 'react';
import { FieldProps } from 'react-admin';

import { Typography } from 'Custom';
import { User } from 'types';

const useStyles = makeStyles(theme => {
	const { spacing, palette } = theme;

	return {
		content: {
			padding: 0,
		},
		inner: {
			minWidth: 1050,
		},
		nameContainer: {
			display: 'flex',
			alignItems: 'center',
		},
		avatar: {
			marginRight: spacing(2),
		},
		actions: {
			justifyContent: 'flex-end',
		},
		badge: {
			width: spacing(3),
			height: spacing(3),
			backgroundColor: palette.common.white,
			borderRadius: spacing(8),
			color: palette.secondary.main,
		},
	};
});

const badgeData = {
	admin: 'verified_user',
	user: 'face',
	editor: 'public',
};

export const UserSummary: React.FC<FieldProps<User>> = props => {
	const { record } = props;
	const classes = useStyles();

	return record ? (
		<Box className={classes.nameContainer}>
			<Badge
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				badgeContent={
					<Icon className={classes.badge}>{badgeData[record?.roles]}</Icon>
				}
				className={classes.avatar}
				overlap="circle"
			>
				<Avatar alt={record.userName} src={record?.profileImage?.secure_url} />
			</Badge>
			<Box display="flex" flexDirection="column" justifyContent="center">
				<Box alignItems="flex-end" display="flex">
					<Typography fontWeight={500} push="right">
						{record.userName}
					</Typography>
					{record.titles?.map(title => (
						<Typography
							color="textSecondary"
							fontSize="small"
							key={title}
							push="right"
						>
							{title}
						</Typography>
					))}
				</Box>
				<Typography color="textSecondary" fontSize="small">
					{record.email}
				</Typography>
			</Box>
		</Box>
	) : null;
};
