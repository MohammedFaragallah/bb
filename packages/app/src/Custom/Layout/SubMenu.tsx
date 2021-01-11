import {
	Collapse,
	Divider,
	Icon,
	List,
	ListItemIcon,
	makeStyles,
	MenuItem,
	Tooltip,
} from '@material-ui/core';
import React from 'react';

import { Typography } from 'Custom';

const useStyles = makeStyles(theme => ({
	icon: { minWidth: theme.spacing(5) },
	sidebarIsOpen: {
		paddingLeft: 25,
		transition: 'padding-left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
	},
	sidebarIsClosed: {
		paddingLeft: 0,
		transition: 'padding-left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
	},
}));

export const SubMenu: React.FC<any> = props => {
	const { handleToggle, sidebarIsOpen, isOpen, name, icon, children } = props;
	const classes = useStyles();

	const header = (
		<MenuItem button dense onClick={handleToggle}>
			<ListItemIcon className={classes.icon}>
				{isOpen ? <Icon>expand_more</Icon> : icon}
			</ListItemIcon>
			<Typography color="textSecondary">{name}</Typography>
		</MenuItem>
	);

	return (
		<>
			{sidebarIsOpen || isOpen ? (
				header
			) : (
				<Tooltip placement="right" title={name}>
					{header}
				</Tooltip>
			)}
			<Collapse in={isOpen} timeout="auto" unmountOnExit>
				<List
					className={
						sidebarIsOpen ? classes.sidebarIsOpen : classes.sidebarIsClosed
					}
					dense
					disablePadding
				>
					{children}
				</List>
				<Divider />
			</Collapse>
		</>
	);
};
