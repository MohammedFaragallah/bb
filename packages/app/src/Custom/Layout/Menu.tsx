import { Box, Button, Icon } from '@material-ui/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { DashboardMenuItem, MenuItemLink, ReduxState } from 'react-admin';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import {
	CloudinaryMediaLibrary,
	mediaLibraryWidget,
} from 'Custom/Layout/CloudWidget';
import * as Services from 'Services';
import { ResourceMeta } from 'types';

import { SubMenu } from './SubMenu';

interface ISubMenu {
	name: 'All' | 'Store';
	icon: string;
	resources: ResourceMeta[];
}

const SubMenus: ISubMenu[] = [
	{ name: 'All', icon: 'public', resources: [] },
	{ name: 'Store', icon: 'store', resources: [] },
];

Object.values(Services).forEach((item: any) => {
	const SubMenu = SubMenus.findIndex(
		menu => menu.name === item.options?.subMenu,
	);

	SubMenus[SubMenu]?.resources.push(item);
});

export const Menu: React.FC<any> = props => {
	const { hasDashboard, onMenuClick } = props;
	const open = useSelector((state: ReduxState) => state.admin.ui.sidebarOpen);
	const [menuState, setMenu] = useState('All');
	const { pathname } = useLocation();

	const handleToggle = useCallback(
		({ name }) => setMenu(name !== menuState ? name : undefined),
		[menuState],
	);

	useEffect(() => {
		SubMenus.forEach(menu =>
			menu.resources.forEach(({ name }) => {
				if (pathname.includes(name)) {
					if (menu.name !== menuState) handleToggle(menu);
				}
			}),
		);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname]);

	const ref = useRef<CloudinaryMediaLibrary | undefined>(undefined);

	useEffect(() => {
		ref.current = mediaLibraryWidget;
	}, []);

	return (
		<>
			{hasDashboard && <DashboardMenuItem sidebarIsOpen={open} />}
			{SubMenus.map((SubMenuEntity, index) => {
				return (
					<SubMenu
						handleToggle={() => handleToggle(SubMenuEntity)}
						icon={<Icon>{SubMenuEntity.icon}</Icon>}
						isOpen={menuState === SubMenuEntity.name}
						key={index}
						name={SubMenuEntity.name}
						sidebarIsOpen={open}
					>
						{SubMenuEntity.resources.map(resource => {
							return (
								<MenuItemLink
									key={resource.name}
									leftIcon={<Icon>{resource.options.icon}</Icon>}
									onClick={onMenuClick}
									primaryText={resource.options.label}
									sidebarIsOpen={open}
									to={`/${resource.name}`}
									// TODO: highlight selected item
								/>
							);
						})}
					</SubMenu>
				);
			})}
			<Box display="flex" justifyContent="center" m={2}>
				<Button
					color="secondary"
					onClick={() => ref.current?.show()}
					variant="contained"
				>
					{open ? 'Open Library' : <Icon>open_in_browser</Icon>}
				</Button>
			</Box>
		</>
	);
};
