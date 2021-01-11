import { connectRouter, routerMiddleware } from 'connected-react-router';
import { History } from 'history';
import {
	AuthProvider,
	DataProvider,
	adminReducer,
	adminSaga,
} from 'react-admin';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';

import { DEVELOPMENT } from 'Constants';
import { themeReducer } from 'Custom/Reducers';

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

const store = ({
	authProvider,
	dataProvider,
	history,
}: {
	authProvider: AuthProvider;
	dataProvider: DataProvider;
	history: History;
}) => {
	const rootReducer = combineReducers({
		admin: adminReducer,
		router: connectRouter(history),
		theme: themeReducer,
	});

	const saga = function* rootSaga() {
		yield all([adminSaga(dataProvider, authProvider)].map(fork));
	};

	const sagaMiddleware = createSagaMiddleware();

	const { NODE_ENV } = process.env;
	const composeEnhancers =
		(NODE_ENV === DEVELOPMENT &&
			window?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?.({
				trace: true,
				traceLimit: 25,
			} as any)) ||
		compose;

	const store = createStore(
		rootReducer,
		composeEnhancers(
			applyMiddleware(sagaMiddleware, routerMiddleware(history)),
		),
	);

	sagaMiddleware.run(saga);

	return store;
};

export default store;
