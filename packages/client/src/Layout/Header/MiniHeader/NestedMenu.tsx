import {
	Badge,
	Collapse,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	makeStyles,
} from '@material-ui/core';
import clsx from 'clsx';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { CategoriesTypes, CategorySchema, SportSchema } from '@types';
import { NavLink, LinkProps } from 'Components';
import { allAvailable, DataTypes, Paths, Resources } from 'Constants';
import { useTranslation } from 'Hooks';
import { Header } from 'Layout/Header/MiniHeader/Header';
import { privateProfilePages } from 'Pages/Profile/PrivateProfileLayout';
import { setMiniMenu } from 'Store';
import { useQueryWithStore } from 'core';

const useStyles = makeStyles(theme => {
	const { palette, spacing } = theme;

	return {
		sub1: {
			paddingLeft: spacing(5),
			'&:hover': {
				backgroundColor: palette.grey[100],
			},
		},
		sub1Selected: {
			color: palette.primary.main,
			weight: 700,
		},
		sub1Expanded: { weight: 700 },
		sub2: {
			paddingLeft: spacing(8),
			position: 'relative',
			'&:before': {
				content: '" "',
				position: 'absolute',
				width: spacing(0.5),
				height: '100%',
				left: spacing(5),
				backgroundColor: palette.grey[100],
			},
			'&:hover': {
				backgroundColor: palette.grey[100],
			},
		},
		sub2Selected: {
			color: palette.primary.main,
			'&:after': {
				content: '" "',
				position: 'absolute',
				top: '50%',
				transform: 'translateY(-50%)',
				width: spacing(0.5),
				height: '40%',
				left: spacing(5),
				backgroundColor: palette.primary.main,
			},
		},
		active: {
			backgroundColor: palette.action.selected,
		},
		badge: {
			marginRight: spacing(1),
		},
	};
});

interface Props {
	selectedKey?: string;
	openKeys?: string[];
}

export const NestedMenu: React.FC<Props> = props => {
	const { selectedKey, openKeys } = props;
	const translate = useTranslation();
	const dispatch = useDispatch();
	const classes = useStyles();

	const [currentKey, setCurrentKey] = useState(selectedKey || '');
	const [currentOpenKeys, setCurrentOpenKeys] = useState(openKeys || []);

	const { data: sports = [] } = useQueryWithStore<SportSchema>({
		type: DataTypes.GET_LIST,
		resource: Resources.SPORTS,
		payload: {
			...allAvailable,
		},
	});

	const { data: categories = [] } = useQueryWithStore<CategorySchema>({
		type: DataTypes.GET_LIST,
		resource: Resources.CATEGORIES,
		payload: {
			...allAvailable,
		},
	});

	const articles = categories.filter(c => c.type === CategoriesTypes.articles);
	const exercises = categories.filter(
		c => c.type === CategoriesTypes.exercises,
	);
	const products = categories.filter(c => c.type === CategoriesTypes.store);

	interface MenuItem extends Partial<CategorySchema> {
		to: LinkProps['to'];
		subMenus?: MenuItem[];
	}

	const getSubMenus = (
		//? considering sport as partial category
		subSource: Partial<CategorySchema>[],
		base: string,
	): MenuItem[] =>
		subSource
			.filter(category => !category.parentId)
			.map(parent => ({
				...parent,
				to: `${base}/${parent.id}`,
				subMenus: subSource
					.filter(subCategory => subCategory.parentId === parent.id)
					.map(parent => ({
						...parent,
						to: `${base}/${parent.id}`,
					})),
			}));

	interface MiniMenu extends MenuItem {
		name: string;
		separated?: boolean;
	}

	const miniMenus: MiniMenu[] = [
		{
			name: 'home',
			to: Paths.HOME,
		},
		{
			name: 'articles',
			to: Paths.ARTICLES,
			separated: true,
			subMenus: getSubMenus(articles, Paths.ARTICLES),
		},
		{
			name: 'exercises',
			to: Paths.EXERCISES,
			separated: true,
			subMenus: getSubMenus(exercises, Paths.EXERCISES),
		},
		{
			name: 'sports',
			to: Paths.COMMUNITY,
			subMenus: getSubMenus(sports, Paths.COMMUNITY),
		},
		{
			name: 'events',
			to: Paths.EVENTS,
		},
		{
			name: 'store',
			to: Paths.STORE,
			subMenus: getSubMenus(products, Paths.STORE),
		},
		{
			name: 'profile',
			to: Paths.PROFILE,
			subMenus: privateProfilePages.map(({ to, label }) => ({
				to,
				name: translate(`pageTitle.${label}`).toString(),
			})),
		},
	];

	const handleToggle = (name: string) => () => {
		if (currentOpenKeys.includes(name)) {
			return setCurrentOpenKeys(currentOpenKeys.filter(k => k !== name));
		}
		return setCurrentOpenKeys([...currentOpenKeys, name]);
	};

	interface Props extends Partial<MiniMenu> {}

	const renderMenus = (level: number): React.FC<Props> => props => {
		const { name = '', len, to, subMenus, separated } = props;

		const WrapComponent = to
			? (props: any) => (
					<NavLink
						activeClassName={classes.active}
						color="textPrimary"
						to={to}
						{...props}
					/>
			  )
			: 'span';

		type Classes = keyof typeof classes;

		const classNameString = `sub${level}` as Classes;
		const selectedClassNameString = `sub${level}Selected` as Classes;
		const expandedClassNameString = `sub${level}Selected` as Classes;

		return (
			<React.Fragment key={name}>
				<WrapComponent>
					{level === 0 ? (
						<Header
							expanded={currentOpenKeys.includes(name)}
							name={translate(`pageTitle.${name}`)}
							onMenuClick={() => {
								if (!subMenus || separated) {
									setCurrentKey(name);
								}
								if (subMenus && !currentOpenKeys.includes(name)) {
									handleToggle(name)();
								}
							}}
							selected={
								subMenus
									? separated && currentKey === name
									: currentKey === name
							}
							separated={separated}
							{...(subMenus && {
								toggle: true,
								onToggle: handleToggle(name),
							})}
						/>
					) : (
						<ListItem
							className={clsx(
								classes[classNameString],
								currentKey === name && classes[selectedClassNameString],
								currentOpenKeys.includes(name) &&
									classes[expandedClassNameString],
							)}
							onClick={() => {
								if (subMenus) handleToggle(name)();
								else setCurrentKey(name);
								if (level >= 2) dispatch(setMiniMenu(false));
							}}
						>
							<ListItemText primary={name} />
							<ListItemSecondaryAction>
								<Badge
									badgeContent={len}
									className={classes.badge}
									color="secondary"
								>
									{null}
								</Badge>
							</ListItemSecondaryAction>
						</ListItem>
					)}
				</WrapComponent>
				{subMenus?.length ? (
					<Collapse in={currentOpenKeys.includes(name)}>
						{subMenus.map(renderMenus(level + 1))}
					</Collapse>
				) : null}
			</React.Fragment>
		);
	};
	return <>{miniMenus.map(renderMenus(0))}</>;
};

NestedMenu.defaultProps = {
	selectedKey: '',
	openKeys: [],
};
