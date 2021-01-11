import {
	Box,
	Drawer,
	Grid,
	Hidden,
	ListItem,
	ListItemText,
} from '@material-ui/core';
import { MenuOpen } from '@material-ui/icons';
import React, { ReactNode, useState } from 'react';

import { useTranslation } from 'Hooks';

interface Props {
	MainFilters: ReactNode;
	SecondaryFilters: ReactNode;
	mainLabel?: string;
	SecondaryLabel?: string;
}

export const FilterPage: React.FC<Props> = props => {
	const translate = useTranslation();

	const {
		children,
		MainFilters,
		mainLabel = translate('label.category'),
		SecondaryFilters,
		SecondaryLabel = 'Filters',
	} = props;

	const [leftOpen, leftOpened] = useState(false);
	const [rightOpen, rightOpened] = useState(false);

	return (
		<>
			<Hidden smUp>
				<Grid container>
					<Grid item xs={6}>
						<ListItem button onClick={() => leftOpened(true)}>
							<ListItemText>{mainLabel}</ListItemText>
							<MenuOpen />
						</ListItem>
					</Grid>
					<Grid item xs={6}>
						<ListItem button onClick={() => rightOpened(true)}>
							<ListItemText>{SecondaryLabel}</ListItemText>
							<MenuOpen />
						</ListItem>
					</Grid>
				</Grid>
				<Drawer onClose={() => leftOpened(false)} open={leftOpen}>
					<Box
						sx={{
							width: 300,
						}}
					>
						{MainFilters}
					</Box>
				</Drawer>
				<Drawer
					anchor="right"
					onClose={() => rightOpened(false)}
					open={rightOpen}
				>
					<Box
						sx={{
							width: 300,
						}}
					>
						{SecondaryFilters}
					</Box>
				</Drawer>
			</Hidden>
			<Grid container spacing={2} style={{ margin: '0 auto' }}>
				<Hidden only="xs">
					<Grid component="aside" item md={3} sm={4} xs={12}>
						{MainFilters}
						{SecondaryFilters}
					</Grid>
				</Hidden>
				<Grid
					container
					item
					md={9}
					sm={8}
					spacing={2}
					style={{ height: '100%' }}
					xs={12}
				>
					{children}
				</Grid>
			</Grid>
		</>
	);
};
