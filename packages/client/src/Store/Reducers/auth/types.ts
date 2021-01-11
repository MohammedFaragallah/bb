import {
	ActionTypes,
	CartResponseSchema,
	Identifier,
	IPData,
	StoreUser,
	UnpackedArray,
} from '@types';

export interface AuthState {
	user: StoreUser | null;
	visited: Identifier[];
	ip?: IPData;
	cart?: CartResponseSchema | null;
}

export interface LoginSuccessAction {
	type: ActionTypes.LOGIN_SUCCESS;
	payload: NonNullable<AuthState['user']>;
}

export interface GetCartAction {
	type: ActionTypes.GET_CART;
	payload: NonNullable<AuthState['cart']>;
}

export interface UpdateUserSuccessAction {
	type: ActionTypes.UPDATE_USER_SUCCESS;
	payload: Partial<AuthState['user']>;
}

export interface UpdateUserFailedAction {
	type: ActionTypes.UPDATE_USER_FAILED;
}

export interface LogoutSuccessAction {
	type: ActionTypes.LOGOUT_SUCCESS;
}

export interface GetIpDataSuccessAction {
	type: ActionTypes.GET_IP_DATA_SUCCESS;
	payload: AuthState['ip'];
}

export interface AddVisitedAction {
	type: ActionTypes.ADD_VISITED;
	payload: UnpackedArray<AuthState['visited']>;
}

export type AuthReducerAction =
	| LoginSuccessAction
	| GetCartAction
	| UpdateUserSuccessAction
	| UpdateUserFailedAction
	| LogoutSuccessAction
	| GetIpDataSuccessAction
	| AddVisitedAction;
