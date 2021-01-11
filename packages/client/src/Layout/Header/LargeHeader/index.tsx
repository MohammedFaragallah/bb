import {
	Alert,
	AppBar,
	Box,
	Container,
	Divider,
	makeStyles,
	Theme,
	useScrollTrigger,
} from '@material-ui/core';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useToggle } from 'react-use';

import { CategorySchema } from '@types';
import { Typography } from 'Components';
import { allAvailable, DataTypes, Resources } from 'Constants';
import { LargeHeaderActions } from 'Layout/Header/LargeHeader/Actions';
import { CollapsibleMenu } from 'Layout/Header/LargeHeader/CollapsibleMenu';
import { LargeMenu } from 'Layout/Header/LargeHeader/Menu';
import { Logo } from 'Layout/Logo';
import { setTabIndex } from 'Store';
import { useQueryWithStore } from 'core';

interface StyleProps {
	height: number;
	hovered: boolean;
	trigger: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>(theme => {
	const { palette } = theme;

	return {
		root: {
			backgroundColor: palette.background.paper,
		},
		box: ({ height }) => ({
			height,
		}),
		pseudoBox: ({ height }) => ({
			height: height - 3,
		}),
		icon: ({ hovered, trigger }) => ({
			width: trigger ? 50 : hovered ? undefined : 130,
			height: trigger ? 50 : hovered ? undefined : 130,
			marginTop: trigger || hovered ? 0 : 75,
		}),
	};
});

interface Props {}

export const LargeHeader: React.FC<Props> = () => {
	const trigger = useScrollTrigger({ disableHysteresis: true });
	const height = trigger ? 55 : 75;
	const [hovered, setHovered] = useToggle(false);
	const classes = useStyles({ height, hovered, trigger });
	const dispatch = useDispatch();

	const { data: categories = [] } = useQueryWithStore<CategorySchema>({
		type: DataTypes.GET_LIST,
		resource: Resources.CATEGORIES,
		payload: { ...allAvailable },
	});

	useEffect(() => {
		dispatch(setTabIndex(undefined));
	}, [dispatch]);

	return (
		<Box
			onMouseLeave={() => dispatch(setTabIndex(undefined))}
			sx={{
				position: 'relative',
				zIndex: 'mobileStepper',
			}}
		>
			<AppBar
				className={clsx(classes.root, classes.pseudoBox)}
				elevation={0}
				position="static"
			/>
			<AppBar
				className={classes.root}
				elevation={trigger ? 4 : 2}
				position="fixed"
			>
				<Container>
					<Box
						className={classes.box}
						sx={{
							alignItems: 'center',
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'center',
						}}
					>
						<LargeHeaderActions />
						<LargeMenu categories={categories} />
						<Logo
							classes={{ icon: classes.icon }}
							onMouseEnter={() => setHovered()}
						/>
					</Box>
				</Container>
				<Divider />
			</AppBar>
			<Alert severity="warning" style={{ justifyContent: 'center' }}>
				This is a{' '}
				<Typography color="error" display="inline">
					DEMO
				</Typography>{' '}
				website for testing purposes only all data are{' '}
				<Typography color="error" display="inline">
					FAKE
				</Typography>
			</Alert>
			<CollapsibleMenu data={categories} top={height} />
		</Box>
	);
};
