import { Box, makeStyles, Tab, Tabs } from '@material-ui/core';
import { KeyboardArrowDown } from '@material-ui/icons';
import clsx from 'clsx';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { CategoriesTypes, CategorySchema, LargeHeaderMenus } from '@types';
import { Icon, Typography } from 'Components';
import { useTranslation } from 'Hooks';
import { TabIndexSelector } from 'Selectors';
import { setTabIndex } from 'Store';

const useStyles = makeStyles(theme => {
	const { palette, direction, spacing } = theme;

	return {
		root: {
			width: '100%',
			overflowX: 'auto',
		},
		height: {
			display: 'flex',
			height: '100%',
			alignItems: 'center',
		},
		tab: {
			opacity: 1,
		},
		iconRotation: {
			'& .material-icons': {
				transform: 'rotate(-180deg)',
			},
		},
		tabsIndicator: {
			backgroundColor: palette.grey[200],
			maxWidth: spacing(6),
			transform: direction === 'ltr' ? 'translateX(52px)' : 'translateX(-52px)',
		},
		arrow: {
			color: palette.text.primary,
		},
		active: {
			backgroundColor: palette.action.selected,
		},
	};
});

export const largeHeaderMap: Record<
	LargeHeaderMenus,
	CategoriesTypes | undefined
> = {
	articles: CategoriesTypes.articles,
	exercises: CategoriesTypes.exercises,
	community: undefined,
	events: undefined,
	store: CategoriesTypes.store,
};

interface Props {
	categories: CategorySchema[];
}

export const LargeMenu: React.FC<Props> = props => {
	const { categories } = props;
	const tabIndex = useSelector(TabIndexSelector);
	const dispatch = useDispatch();
	const classes = useStyles();
	const translate = useTranslation();

	return (
		<Box className={clsx(classes.root, classes.height)}>
			<Tabs
				classes={{
					indicator: classes.tabsIndicator,
					root: clsx(classes.root, classes.height),
					scroller: classes.height,
					flexContainer: classes.height,
				}}
				scrollButtons="auto"
				value={tabIndex || false}
				variant="scrollable"
			>
				{Object.values(LargeHeaderMenus).map(label => {
					const to = `/${label}`;

					const children =
						label && categories.filter(c => c.type === largeHeaderMap[label]);

					return (
						<Tab
							activeClassName={classes.active}
							className={classes.tab}
							component={NavLink}
							key={label}
							label={
								<Box
									sx={{
										display: 'flex',
									}}
								>
									<Typography color="textPrimary" fontWeight={700}>
										{translate(`pageTitle.${label}`)}
									</Typography>
									{!!children?.length && (
										<Icon className={classes.arrow} push="left">
											<KeyboardArrowDown />
										</Icon>
									)}
								</Box>
							}
							onFocus={() => dispatch(setTabIndex(label))}
							onMouseEnter={() => dispatch(setTabIndex(label))}
							to={to}
							value={label}
						/>
					);
				})}
			</Tabs>
		</Box>
	);
};
