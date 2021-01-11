import storage from 'localforage';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import {
	authReducer,
	localeReducer,
	notificationsReducer,
	uiReducer,
} from 'Store/Reducers';

const persistConfig: PersistConfig<AppState> = {
	key: 'root',
	storage,
	blacklist: ['auth'],
};

const rootReducer = combineReducers({
	auth: authReducer,
	locale: localeReducer,
	notifications: notificationsReducer,
	ui: uiReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

const composeEnhancers =
	window?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?.({
		trace: true,
		traceLimit: 25,
	} as any) || compose;

const store = createStore(
	persistedReducer,
	composeEnhancers(applyMiddleware(thunk)),
);

const persistor = persistStore(store);

export type AppState = ReturnType<typeof rootReducer>;
export type GetState = () => AppState;

export * from 'Store/Reducers';
export { store, persistor };
