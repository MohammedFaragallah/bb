import { produce } from 'immer';
import { Reducer } from 'redux';

import { ActionTypes, StoreUser } from '@types';
import { AuthReducerAction, AuthState } from 'Store';

const initialState: AuthState = {
	user: null,
	cart: null,
	visited: [],
};

export const authReducer: Reducer<AuthState, AuthReducerAction> = (
	state = initialState,
	action,
) => {
	switch (action.type) {
		case ActionTypes.LOGIN_SUCCESS:
			return produce(state, draft => {
				draft.user = action.payload;
			});

		case ActionTypes.GET_CART:
			return produce(state, draft => {
				draft.cart = action.payload;
			});

		case ActionTypes.UPDATE_USER_SUCCESS:
			return produce(state, draft => {
				draft.user = { ...state.user, ...action.payload } as StoreUser;
			});

		case ActionTypes.UPDATE_USER_FAILED:
			return state;

		case ActionTypes.LOGOUT_SUCCESS:
			return initialState;

		case ActionTypes.GET_IP_DATA_SUCCESS:
			return produce(state, draft => {
				draft.ip = action.payload;
			});

		case ActionTypes.ADD_VISITED:
			return produce(state, draft => {
				draft.visited.push(action.payload);
			});

		default:
			return state;
	}
};
