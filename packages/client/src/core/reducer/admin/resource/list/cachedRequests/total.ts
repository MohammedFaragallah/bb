import { Reducer } from 'redux';

import { CrudGetListSuccessAction } from '../../../../../actions/dataActions';
import { DataFetchActions } from '../../../../../core';

type ActionTypes =
	| CrudGetListSuccessAction
	| { type: 'OTHER_TYPE'; payload: any; meta: any };

type State = number | null;

const initialState = null;

const totalReducer: Reducer<State, ActionTypes> = (
	previousState = initialState,
	action,
) => {
	if (action.meta?.fetchResponse === DataFetchActions.GET_LIST) {
		return action.payload.total;
	}
	return previousState;
};

export default totalReducer;
