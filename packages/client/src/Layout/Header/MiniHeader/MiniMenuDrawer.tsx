import {
	Box,
	IconButton,
	ListItem,
	ListItemIcon,
	SwipeableDrawer,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MiniHeaderActions } from 'Layout/Header/MiniHeader/Actions';
import { NestedMenu } from 'Layout/Header/MiniHeader/NestedMenu';
import { MiniMenuSelector } from 'Selectors';
import { setMiniMenu } from 'Store';

interface Props {}

export const MiniMenuDrawer: React.FC<Props> = () => {
	const open = useSelector(MiniMenuSelector);
	const dispatch = useDispatch();

	return (
		<SwipeableDrawer
			disableBackdropTransition
			onClose={() => dispatch(setMiniMenu(false))}
			onOpen={() => dispatch(setMiniMenu(true))}
			open={open}
		>
			<Box
				sx={{
					minWidth: 320,
				}}
			>
				<ListItem dense divider>
					<ListItemIcon>
						<IconButton
							aria-label="close"
							onClick={() => dispatch(setMiniMenu(false))}
						>
							<Close />
						</IconButton>
					</ListItemIcon>
				</ListItem>
				<NestedMenu />
				<MiniHeaderActions />
			</Box>
		</SwipeableDrawer>
	);
};
