import './globalImports';

import { createGenerateClassName, StylesProvider } from '@material-ui/styles';
import jssPreset from '@material-ui/styles/jssPreset';
import { getUserLocale } from 'get-user-locale';
import { create } from 'jss';
import rtl from 'jss-rtl';
import React, { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { defaultIcons, ReactIconsContext } from 'react-icons-context';
import { IntlProvider } from 'react-intl';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';

import { LanguageCode } from '@types';
import { FIRST_ITEM, intlFormats, JWT_COOKIE } from 'Constants';
import { app } from 'Helpers';
import { AppRoutes } from 'Routes';
import { LocaleSelector } from 'Selectors';
import { changeLanguage, loginSuccess, logout, resetUI } from 'Store';
import { DefaultLanguage, getTranslatedMessages } from 'localization';

const queryClient = new QueryClient();

/*
TODO: add a second color review all text styles
TODO: dark mode with batteries day/night
TODO: save user preferred palette to avoid converting back
// const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
// 	if (prefersDarkMode) dispatch(togglePalette(PaletteType.dark));
TODO: after connecting word-press creating recommendations system
TODO: unify auth components LoginLink UserIsAuthenticated UserIsNotAuthenticated RoleOnly
*/

const lang = getUserLocale().split('-')[FIRST_ITEM] as LanguageCode;

const generateClassName = createGenerateClassName({
	productionPrefix: 'FREGO',
});

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

interface Props {}

export const App: React.FC<Props> = () => {
	const { locale, preferredLanguage } = useSelector(LocaleSelector);
	const { code } = locale;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(resetUI());

		// TODO: prevent auto re-login while logging out
		if (localStorage.getItem(JWT_COOKIE))
			app
				.reAuthenticate()
				.then(authResponse => {
					dispatch(loginSuccess(authResponse, false));
				})
				.catch(() => {
					dispatch(logout(false));
				});
		else dispatch(logout(false));

		import('Helpers/analytics');
	}, [dispatch]);

	useEffect(() => {
		if (!preferredLanguage)
			dispatch(changeLanguage(lang, 'Language Discovered'));
	}, [dispatch, preferredLanguage]);

	const flatMessages = getTranslatedMessages(code);

	return (
		<QueryClientProvider client={queryClient}>
			<IntlProvider
				defaultLocale={DefaultLanguage.code}
				formats={intlFormats}
				key={code}
				locale={code}
				messages={flatMessages}
			>
				<HelmetProvider>
					<StylesProvider generateClassName={generateClassName} jss={jss}>
						<BrowserRouter>
							<QueryParamProvider>
								<ReactIconsContext.Provider
									value={{ ...defaultIcons, default: defaultIcons.email }}
								>
									<AppRoutes />
								</ReactIconsContext.Provider>
							</QueryParamProvider>
						</BrowserRouter>
					</StylesProvider>
				</HelmetProvider>
			</IntlProvider>
		</QueryClientProvider>
	);
};
