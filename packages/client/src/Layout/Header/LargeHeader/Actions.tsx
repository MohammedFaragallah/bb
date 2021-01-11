import {
	Box,
	Grid,
	IconButton,
	Menu,
	MenuItem,
	Tooltip,
	Zoom,
} from '@material-ui/core';
import {
	Close,
	ExitToApp,
	FlashOff,
	FlashOn,
	Language,
	Menu as MenuIcon,
	Search,
} from '@material-ui/icons';
import {
	bindMenu,
	bindTrigger,
	usePopupState,
} from 'material-ui-popup-state/hooks';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocalStorage } from 'react-use';

import { PaletteType } from '@types';
import { LoginLink, ToggleIcon, UserIsAuthenticated } from 'Components';
import { ACTION_ICONS_COLOR } from 'Constants';
import { useTranslation } from 'Hooks';
import { CartHeaderIcon } from 'Layout/Header/CartHeaderIcon';
import { DashBoard } from 'Layout/Header/LargeHeader/Dashboard';
import { ProfileAvatar } from 'Layout/Header/ProfileAvatar';
import { LocaleSelector, PaletteTypeSelector } from 'Selectors';
import { changeLanguage, logout, setPalette, setSearch } from 'Store';
import { LocalizationLanguages } from 'localization';

interface Props {}

export const LargeHeaderActions: React.FC<Props> = () => {
	const popupState = usePopupState({ variant: 'popover', popupId: 'miniMenu' });
	const dispatch = useDispatch();
	const { locale } = useSelector(LocaleSelector);
	const [actions, setActions] = useLocalStorage('actions', true);
	const palette = useSelector(PaletteTypeSelector);
	const translate = useTranslation();

	return (
		<Grid item xs>
			<Grid
				alignItems="center"
				container
				justifyContent="flex-end"
				wrap="nowrap"
			>
				<Grid item>
					<ProfileAvatar />
				</Grid>
				{/* //? header action toggler */}
				<Box
					sx={{
						mr: 'auto',
					}}
				>
					<Tooltip
						TransitionComponent={Zoom}
						placement="bottom"
						title={translate('nav.actions.close')}
					>
						<IconButton aria-label="menu" onClick={() => setActions(!actions)}>
							<ToggleIcon
								offIcon={<MenuIcon color={ACTION_ICONS_COLOR} />}
								on={actions}
								onIcon={<Close color={ACTION_ICONS_COLOR} />}
							/>
						</IconButton>
					</Tooltip>
				</Box>
				<Box
					style={{
						opacity: actions ? 1 : 0,
						width: actions ? '100%' : 0,
					}}
					sx={{
						display: 'flex',
					}}
				>
					<Tooltip
						TransitionComponent={Zoom}
						placement="bottom"
						title={translate('nav.actions.theme')}
					>
						<IconButton
							aria-label="toggle light"
							onClick={() => dispatch(setPalette())}
						>
							<ToggleIcon
								offIcon={<FlashOff color={ACTION_ICONS_COLOR} />}
								on={palette === PaletteType.light}
								onIcon={<FlashOn color={ACTION_ICONS_COLOR} />}
							/>
						</IconButton>
					</Tooltip>
					<CartHeaderIcon />
					<UserIsAuthenticated
						fallback={
							<Grid item>
								<LoginLink>
									<Tooltip
										TransitionComponent={Zoom}
										placement="bottom"
										title={translate('nav.actions.login')}
									>
										<IconButton aria-label="login">
											<ExitToApp
												color={ACTION_ICONS_COLOR}
												style={{ transform: 'rotate(180deg)' }}
											/>
										</IconButton>
									</Tooltip>
								</LoginLink>
							</Grid>
						}
					>
						<Grid item>
							<Tooltip
								TransitionComponent={Zoom}
								onClick={() => dispatch(logout())}
								placement="bottom"
								title={translate('nav.actions.logout')}
							>
								<IconButton aria-label="logout">
									<ExitToApp color={ACTION_ICONS_COLOR} />
								</IconButton>
							</Tooltip>
						</Grid>
					</UserIsAuthenticated>
					<DashBoard title={translate('nav.actions.dashboard')} />
					<Grid item>
						<Tooltip
							TransitionComponent={Zoom}
							placement="bottom"
							title={translate('nav.actions.language')}
						>
							<IconButton
								aria-label="change language"
								{...bindTrigger(popupState)}
							>
								<Language color={ACTION_ICONS_COLOR} />
							</IconButton>
						</Tooltip>
						<Menu disableScrollLock {...bindMenu(popupState)}>
							{Object.values(LocalizationLanguages).map(language => (
								<MenuItem
									dense
									key={language.code}
									onClick={() => {
										dispatch(changeLanguage(language.code));
										popupState.close();
									}}
									selected={locale.code === language.code}
								>
									{language.label}
								</MenuItem>
							))}
						</Menu>
					</Grid>
					<Tooltip
						TransitionComponent={Zoom}
						placement="bottom"
						title={translate('search.click')}
					>
						<IconButton
							aria-label="search"
							onClick={() => dispatch(setSearch(true))}
						>
							<Search color={ACTION_ICONS_COLOR} />
						</IconButton>
					</Tooltip>
				</Box>
			</Grid>
		</Grid>
	);
};
