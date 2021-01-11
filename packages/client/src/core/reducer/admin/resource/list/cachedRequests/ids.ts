import { Reducer } from 'redux';

import { CrudGetListSuccessAction } from '../../../../../actions';
import { DataFetchActions } from '../../../../../core';
import { Identifier } from '../../../../../types';

type IdentifierArray = Identifier[];

type State = IdentifierArray;

type ActionTypes =
	| CrudGetListSuccessAction
	| { type: 'OTHER_TYPE'; payload: any; meta: any };

const initialState: any[] = [];

const idsReducer: Reducer<State, ActionTypes> = (
	previousState = initialState,
	action,
) => {
	if (action.meta?.fetchResponse === DataFetchActions.GET_LIST) {
		return action.payload.data.map(({ id }: any) => id);
	}
	return previousState;
};

export default idsReducer;
