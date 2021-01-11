import {
	Box,
	ButtonBase,
	Icon,
	ListItem,
	ListItemText,
	makeStyles,
} from '@material-ui/core';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import clsx from 'clsx';
import React, { ReactNode } from 'react';

import { Show } from 'Components';

const useStyles = makeStyles(theme => {
	const { palette } = theme;

	return {
		headerSelected: {
			'& > $item': {
				fontWeight: 'bold',
				color: palette.primary.main,
			},
		},
		headerExpanded: {
			'& > $item': {
				fontWeight: 'bold',
			},
		},
		item: {
			minWidth: 0,
			flexGrow: 1,
			'&:hover': {
				backgroundColor: palette.grey[100],
			},
		},
		toggle: {
			minWidth: 48,
			'&:hover': {
				backgroundColor: palette.grey[200],
			},
		},
		itemArrow: {
			margin: '0 -4px 0 auto',
		},
	};
});

type OnHeaderEvent = (
	event: React.MouseEvent<HTMLLIElement | HTMLButtonElement, MouseEvent>,
) => void;

interface Props {
	name: ReactNode;
	selected?: boolean;
	expanded?: boolean;
	separated?: boolean;
	toggle?: boolean;
	onMenuClick?: OnHeaderEvent;
	onToggle?: OnHeaderEvent;
}

export const Header: React.FC<Props> = props => {
	const {
		name,
		selected,
		expanded,
		separated,
		toggle = separated,
		onMenuClick,
		onToggle,
		...rest
	} = props;
	const classes = useStyles();

	const icon = expanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />;

	return (
		<Box
			className={clsx(
				selected && classes.headerSelected,
				expanded && classes.headerExpanded,
			)}
			sx={{
				display: 'flex',
			}}
		>
			{separated ? (
				<>
					<ListItem className={classes.item} {...rest} onClick={onMenuClick}>
						<ListItemText primary={name} />
					</ListItem>
					{toggle && (
						<ButtonBase className={classes.toggle} onClick={onToggle}>
							{icon}
						</ButtonBase>
					)}
				</>
			) : (
				<ListItem
					className={classes.item}
					{...rest}
					onClick={e => {
						onToggle?.(e);
						onMenuClick?.(e);
					}}
				>
					<ListItemText primary={name} />
					<Show show={toggle}>
						<Icon className={classes.itemArrow}>{icon}</Icon>
					</Show>
				</ListItem>
			)}
		</Box>
	);
};
