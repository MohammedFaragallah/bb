import { Application } from '@feathersjs/feathers';
import { AuthProvider } from 'react-admin';

import { JWT_COOKIE } from 'Constants';
import { Roles } from 'enums';

const defaultOptions = {
	storageKey: JWT_COOKIE,
	authenticate: { strategy: 'local' },
	permissionsKey: 'permissions',
	permissionsField: 'roles',
	passwordField: 'password',
	usernameField: 'email',
	logoutOnForbidden: true,
};

export const authClient = (
	client: Application,
	options = defaultOptions,
): AuthProvider => {
	const {
		storageKey,
		authenticate,
		permissionsKey,
		permissionsField,
		passwordField,
		usernameField,
		logoutOnForbidden,
	} = options;

	return {
		login: params => {
			const { username, password } = params;
			return client.authenticate({
				...authenticate,
				[usernameField]: username,
				[passwordField]: password,
			});
		},
		logout: params => {
			localStorage.removeItem(permissionsKey);
			client.logout();
			return Promise.resolve();
		},
		checkAuth: async params => {
			await client.reAuthenticate();
			return localStorage.getItem(storageKey)
				? Promise.resolve()
				: Promise.reject(new Error('AUTH_CHECK'));
		},
		checkError: params => {
			const { code } = params;
			if (code === 401 || (logoutOnForbidden && code === 403)) {
				localStorage.removeItem(storageKey);
				localStorage.removeItem(permissionsKey);
				return Promise.reject(new Error('AUTH_ERROR'));
			}
			return Promise.resolve();
		},
		getPermissions: async params => {
			/*
      JWT token may be provided by oauth,
      so that's why the permissions are decoded here and not in AUTH_LOGIN.
      */
			// Get the permissions from localstorage if any.
			const localStoragePermissions = JSON.parse(
				localStorage.getItem(permissionsKey) as string,
			);
			// If any, provide them.
			if (localStoragePermissions) {
				return Promise.resolve(localStoragePermissions);
			}
			// Or find them from the token, save them and provide them.
			try {
				const { user } = await client.get('authentication');
				const jwtPermissions = user[permissionsField]
					? user[permissionsField]
					: [];
				if (jwtPermissions === Roles.admin && params)
					localStorage.setItem(permissionsKey, JSON.stringify(jwtPermissions));
				return Promise.resolve(jwtPermissions);
			} catch (e) {
				return Promise.reject(new Error(e));
			}
		},
	};
};
