import loadable from '@loadable/component';
import { CssBaseline } from '@material-ui/core';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';

import { Loading, ServerCheck } from 'Components';
import { persistor, store } from 'Store';
import { ThemeProvider } from 'Theme/ThemeProvider';

import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const fallback = {
	fallback: <Loading fullPage logo />,
};

const App = loadable(async () => {
	const { App } = await import('App');
	return App;
}, fallback);

render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<ThemeProvider>
					<CssBaseline />
					<ServerCheck>
						<App />
					</ServerCheck>
				</ThemeProvider>
			</PersistGate>
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
