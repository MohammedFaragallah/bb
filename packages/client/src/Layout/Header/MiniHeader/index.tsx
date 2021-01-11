import {
	AppBar,
	Box,
	makeStyles,
	Slide,
	Theme,
	useScrollTrigger,
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import React from 'react';
import { useDispatch } from 'react-redux';

import { ACTION_ICONS_COLOR } from 'Constants';
import { CartHeaderIcon } from 'Layout/Header/CartHeaderIcon';
import { MiniMenuDrawer } from 'Layout/Header/MiniHeader/MiniMenuDrawer';
import { ProfileAvatar } from 'Layout/Header/ProfileAvatar';
import { Logo } from 'Layout/Logo';
import { setMiniMenu } from 'Store';

interface StyleProps {
	trigger: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>(theme => {
	const { palette } = theme;

	return {
		root: {
			backgroundColor: palette.background.paper,
		},
	};
});

interface Props {}

export const MiniHeader: React.FC<Props> = () => {
	const trigger = useScrollTrigger();
	const dispatch = useDispatch();
	const classes = useStyles({ trigger });

	return (
		<>
			<AppBar
				color="secondary"
				elevation={0}
				position="static"
				style={{ height: 70 }}
			/>
			<Slide direction="down" in={!trigger}>
				<AppBar className={classes.root} elevation={1}>
					<Box
						sx={{
							alignItems: 'center',
							display: 'flex',
							flexWrap: 'wrap',
							ml: 2,
						}}
					>
						<Box
							sx={{
								flex: '1',
							}}
						>
							<Menu
								color={ACTION_ICONS_COLOR}
								onClick={() => dispatch(setMiniMenu(true))}
							/>
						</Box>
						<Logo sx={{ margin: '0 auto' }} />
						<Box
							sx={{
								alignItems: 'center',
								display: 'flex',
								flex: '1',
								flexDirection: 'row',
								flexWrap: 'wrap',
								justifyContent: 'flex-end',
								mr: 0.5,
							}}
						>
							<ProfileAvatar />
							<CartHeaderIcon />
						</Box>
					</Box>
				</AppBar>
			</Slide>
			<MiniMenuDrawer />
		</>
	);
};
