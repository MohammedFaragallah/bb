import { Reducer } from 'redux';

import {
	CrudDeleteSuccessAction,
	ToggleListItemAction,
} from '../../../../actions';
import {
	CRUD_DELETE_SUCCESS,
	Identifier,
	TOGGLE_LIST_ITEM,
} from '../../../../types';

const initialState: any[] = [];

type State = Identifier[];

type ActionTypes =
	| ToggleListItemAction
	| CrudDeleteSuccessAction
	| {
			type: 'DELETE_ACTION';
			meta: { fetch: string };
			payload: any;
	  }
	| {
			type: 'OTHER_ACTION';
			meta: any;
			payload: any;
	  };

const selectedIdsReducer: Reducer<State, ActionTypes> = (
	previousState: State = initialState,
	action,
) => {
	if (action.type === TOGGLE_LIST_ITEM) {
		const index = previousState.indexOf(action.payload);
		if (index > -1) {
			return [
				...previousState.slice(0, index),
				...previousState.slice(index + 1),
			];
		} else {
			return [...previousState, action.payload];
		}
	}
	if (action.type === CRUD_DELETE_SUCCESS) {
		const index = previousState.indexOf(action.payload.data.id);
		if (index > -1) {
			return [
				...previousState.slice(0, index),
				...previousState.slice(index + 1),
			];
		}
	}

	return action.meta?.unselectAll ? initialState : previousState;
};

export default selectedIdsReducer;
