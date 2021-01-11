import { AuthenticationResult } from '@feathersjs/authentication';

import {
	ActionTypes,
	CartStatus,
	Identifier,
	StoreUser,
	UserSchema,
} from '@types';
import { FIRST_ITEM, JWT_COOKIE, Resources } from 'Constants';
import { app } from 'Helpers';
import { UserSelector } from 'Selectors';
import { changeLanguage, enqueueSnackbar, GetState } from 'Store';

const getUserData = async (
	authResponse: AuthenticationResult,
): Promise<StoreUser> => {
	const user = authResponse.user;

	const firstAddress = await app
		.service(Resources.ADDRESSES)
		.get(user.firstAddressId);

	const secondAddress = await app
		.service(Resources.ADDRESSES)
		.get(user.secondAddressId);

	return { ...user, firstAddress, secondAddress };
};

export const getCart = () => async (dispatch: any, getState: GetState) => {
	const user = UserSelector(getState());
	const userId = user?.id;

	try {
		const { data: carts } = await app.service(Resources.CARTS).find({
			query: { $limit: 1, userId, status: CartStatus.InProgress },
		});

		let cart = carts[FIRST_ITEM];

		if (cart?.userId !== userId) cart = null;
		if (userId && !cart)
			cart = await app
				.service(Resources.CARTS)
				.create({ userId, status: CartStatus.InProgress });

		return dispatch({ type: ActionTypes.GET_CART, payload: cart });
	} catch (error) {}
};

export const loginSuccess = (
	authResponse: AuthenticationResult,
	notify = true,
) => async (dispatch: any) => {
	const payload = await getUserData(authResponse);

	dispatch(changeLanguage(payload.preferredLanguage));

	notify &&
		dispatch(
			enqueueSnackbar({
				//TODO: handle message localization
				message: 'Welcome',
				options: { variant: 'success' },
			}),
		);

	return dispatch({ type: ActionTypes.LOGIN_SUCCESS, payload });
};

export const logout = (notify = true) => async (dispatch: any) => {
	try {
		localStorage.removeItem(JWT_COOKIE);
		await app.logout();
		notify &&
			dispatch(
				enqueueSnackbar({
					message: 'See you soon',
					options: {
						variant: 'success',
					},
				}),
			);
		return dispatch({ type: ActionTypes.LOGOUT_SUCCESS });
	} catch (error) {
		localStorage.removeItem(JWT_COOKIE);
		dispatch({ type: ActionTypes.LOGOUT_SUCCESS });
		dispatch(
			enqueueSnackbar({
				message: error.message,
				options: {
					variant: 'warning',
				},
			}),
		);
	}
};

export const addVisited = (storyId: Identifier) => async (dispatch: any) =>
	dispatch({ type: ActionTypes.ADD_VISITED, payload: storyId });

export const updateUser = (
	data: any,
	field = 'Information',
	fetch = true,
) => async (dispatch: any, getState: GetState) => {
	const user = UserSelector(getState()) as StoreUser;

	try {
		const newData: UserSchema = fetch
			? await app.service(Resources.USERS).patch(user.id, data)
			: data;
		dispatch(
			enqueueSnackbar({
				message: `Your ${field} has been updated`,
				options: {
					variant: 'success',
				},
			}),
		);
		dispatch(changeLanguage(newData.preferredLanguage));
		return dispatch({
			type: ActionTypes.UPDATE_USER_SUCCESS,
			payload: newData,
		});
	} catch (error) {
		dispatch(
			enqueueSnackbar({
				message: error.message,
				options: {
					variant: 'warning',
				},
			}),
		);

		return dispatch({ type: ActionTypes.UPDATE_USER_FAILED });
	}
};

// export const getIPData = () => async (dispatch: any, getState: GetState) => {
// 	const { ip } = AuthSelector(getState());
// 	const { REACT_APP_IP_STACK_KEY } = process.env;

// 	if (!ip && REACT_APP_IP_STACK_KEY) {
// 		try {
// 			const { data } = await axios.get(
// 				`http://api.ipstack.com/check?access_key=${REACT_APP_IP_STACK_KEY}`,
// 			);
// 			dispatch({ type: GET_IP_DATA_SUCCESS, payload: data });
// 		} catch (error) {}
// 	}
// };
