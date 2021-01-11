import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { StringParam, useQueryParams } from 'use-query-params';

import { AuthPaths, JWT_COOKIE } from 'Constants';
import { app } from 'Helpers';
import { LocaleSelector } from 'Selectors';
import { enqueueSnackbar, loginSuccess, logout } from 'Store';

interface Props {}

export const Callback: React.FC<Props> = () => {
	const dispatch = useDispatch();
	const { locale } = useSelector(LocaleSelector);
	const navigate = useNavigate();
	const [{ token, error }] = useQueryParams({
		token: StringParam,
		error: StringParam,
	});

	useEffect(() => {
		if (token) localStorage.setItem(JWT_COOKIE, token);
		if (error) console.error(error);

		app
			.reAuthenticate()
			.then(authResponse => {
				dispatch(loginSuccess(authResponse));
			})
			.catch(error => {
				dispatch(logout(false));
				dispatch(
					enqueueSnackbar({
						message: error.message,
						options: { variant: 'warning' },
					}),
				);

				navigate(AuthPaths.LOGIN);
			});
	}, [dispatch, error, locale, navigate, token]);
	return null;
};
