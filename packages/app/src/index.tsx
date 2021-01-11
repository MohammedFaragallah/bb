import { CssBaseline } from '@material-ui/core';
import { StylesProvider } from '@material-ui/styles';
import * as Sentry from '@sentry/browser';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { App } from 'App';
import { PRODUCTION } from 'Constants';
import { authProvider, dataProvider } from 'Helpers';
import createAdminStore from 'Store';
import { generateClassName, history } from 'Utils';

import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const { NODE_ENV } = process.env;

if (NODE_ENV === PRODUCTION)
	Sentry.init({
		dsn: 'https://cfba4aaf1e8245ab842258fabc136b93@sentry.io/1543148',
	});

const store = createAdminStore({
	authProvider,
	dataProvider,
	history,
});

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<StylesProvider generateClassName={generateClassName}>
				<CssBaseline />
				<App />
			</StylesProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
