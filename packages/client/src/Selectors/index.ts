import { AppState } from 'Store';

export const LocaleSelector = (s: AppState) => s.locale;
export const NotificationsSelector = (s: AppState) =>
	s.notifications.notifications;

export const CartSelector = (s: AppState) => s.auth.cart;
export const UserSelector = (s: AppState) => s.auth.user;
export const VisitedSelector = (s: AppState) => s.auth.visited;

export const SearchSelector = (s: AppState) => s.ui.search;
export const LoadingSelector = (s: AppState) => s.ui.loading;
export const MiniMenuSelector = (s: AppState) => s.ui.miniMenu;
export const PaletteTypeSelector = (s: AppState) => s.ui.theme;
export const PopupSelector = (s: AppState) => s.ui.popup;
export const PrintSelector = (s: AppState) => s.ui.print;
export const TabIndexSelector = (s: AppState) => s.ui.tabIndex;
export const TimerSelector = (s: AppState) => s.ui.timer;
