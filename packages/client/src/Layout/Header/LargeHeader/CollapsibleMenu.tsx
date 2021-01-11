import {
	Badge,
	Box,
	Collapse,
	Container,
	Grid,
	List,
	ListItem,
	ListItemText,
	ListSubheader,
	makeStyles,
	Paper,
	Theme,
} from '@material-ui/core';
import isUndefined from 'lodash/isUndefined';
import React from 'react';
import CountUp from 'react-countup';
import { useSelector } from 'react-redux';

import {
	AdsLocations,
	CategorySchema,
	LargeHeaderMenus,
	SlideSchema,
} from '@types';
import { Link, Typography } from 'Components';
import { MegaMenuAD } from 'Components/ADs';
import { allAvailable, DataTypes, newestFirst, Resources } from 'Constants';
import { CategoryURL } from 'Helpers';
import { largeHeaderMap } from 'Layout/Header/LargeHeader/Menu';
import { TabIndexSelector } from 'Selectors';
import { useQueryWithStore } from 'core';

const useStyles = makeStyles<Theme, { top: number }>(theme => {
	const { palette, spacing } = theme;

	return {
		collapsed: ({ top }) => ({
			position: 'fixed',
			width: '100%',
			top,
		}),
		item: {
			paddingLeft: spacing(1),
			borderLeft: '0px solid',
			'&:hover': {
				'& p': {
					fontWeight: 600,
					color: palette.secondary.main,
				},
				borderLeft: `${spacing(1)} solid ${palette.secondary.main}`,
			},
		},
	};
});

interface Props {
	data: CategorySchema[];
	top: number;
}

export const CollapsibleMenu: React.FC<Props> = props => {
	const { data, top } = props;
	const tabIndex = useSelector(TabIndexSelector);
	const classes = useStyles({ top });

	const { data: slides = [] } = useQueryWithStore<SlideSchema>({
		type: DataTypes.GET_LIST,
		resource: Resources.SLIDES,
		payload: {
			...allAvailable,
			...newestFirst,
			filter: { location: AdsLocations.MEGA_MENU },
		},
	});

	const tabData = !isUndefined(tabIndex)
		? data.filter(c => c.type === largeHeaderMap[tabIndex])
		: [];

	const roots = tabData.filter(category => !category.parentId);

	return (
		<Collapse className={classes.collapsed} in>
			<Paper elevation={2} square>
				<Container maxWidth="md">
					<Grid container justifyContent="center" spacing={2}>
						{roots.length
							? Array(4 - roots.length)
									.fill(0)
									.map((_, index) => {
										const data =
											slides[
												index +
													(tabIndex
														? Object.values(LargeHeaderMenus).indexOf(tabIndex)
														: 0)
											];

										return data ? <MegaMenuAD ad={data} key={index} /> : null;
									})
							: null}
						{roots.map(category => (
							<Grid item key={category.id} md={3} sm={6}>
								<List
									subheader={
										<Link to={CategoryURL(category)}>
											<ListSubheader>
												<Box
													sx={{
														alignItems: 'center',
														display: 'flex',
														justifyContent: 'space-between',
														mb: 1,
														mt: 2,
													}}
												>
													<Typography color="textPrimary" fontWeight={700}>
														{category.name}
													</Typography>
													<Badge
														badgeContent={
															category.len ? (
																<CountUp delay={1} end={category.len} />
															) : null
														}
														children={null}
														color="secondary"
													/>
												</Box>
											</ListSubheader>
										</Link>
									}
								>
									{tabData
										.filter(item => item.parentId === category.id)
										.map(category => {
											const { id, name, len } = category;

											return (
												<Link
													color="inherit"
													key={id}
													to={CategoryURL(category)}
												>
													<ListItem aria-label={name} button dense>
														<ListItemText
															className={classes.item}
															primary={
																<Box
																	sx={{
																		alignItems: 'center',
																		display: 'flex',
																		justifyContent: 'space-between',
																	}}
																>
																	<Typography color="textSecondary">
																		{name}
																	</Typography>
																	<Badge
																		badgeContent={
																			len ? <CountUp end={len} /> : null
																		}
																		children={null}
																		color="secondary"
																	/>
																</Box>
															}
														/>
													</ListItem>
												</Link>
											);
										})}
								</List>
							</Grid>
						))}
					</Grid>
				</Container>
			</Paper>
		</Collapse>
	);
};
