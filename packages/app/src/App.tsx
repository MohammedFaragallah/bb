import polyglotI18nProvider from 'ra-i18n-polyglot';
import React, { useEffect } from 'react';
import { Admin, Resource, ResourceProps } from 'react-admin';
import { Redirect } from 'react-router-dom';

import { RegisterResources } from 'Constants';
import { Layout } from 'Custom/Layout';
import { Login } from 'Custom/Layout/LoginWithTheme';
import { ArabicMessages, EnglishMessages } from 'Custom/localization';
import { authProvider, dataProvider } from 'Helpers';
import * as Services from 'Services';
import { history } from 'Utils';
import { Roles, LanguageCode } from 'enums';

const i18nProvider = polyglotI18nProvider(locale =>
	locale === LanguageCode.ar ? ArabicMessages : EnglishMessages,
);

const AdminResources = (role: string) =>
	Object.values(Services).map((item: ResourceProps) =>
		role === Roles.admin ? <Resource {...item} /> : null,
	);

const RegisterOnlyResources = Object.values(RegisterResources).map(resource => (
	<Resource intent="registration" key={resource} name={resource} />
));

interface Props {}

export const App: React.FC<Props> = () => {
	const { REACT_APP_NAME } = process.env;

	useEffect(() => {
		import('./analytics');
	}, []);

	return (
		<Admin
			authProvider={authProvider}
			dataProvider={dataProvider}
			history={history}
			i18nProvider={i18nProvider}
			layout={Layout}
			loginPage={Login}
			title={REACT_APP_NAME}
		>
			{(role: string) => [
				...RegisterOnlyResources,
				...AdminResources(role),
				role !== Roles.admin && <Redirect to="/login" />,
			]}
		</Admin>
	);
};
