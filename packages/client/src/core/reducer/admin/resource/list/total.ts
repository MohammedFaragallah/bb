import { Reducer } from 'redux';

import { CrudGetListSuccessAction } from '../../../../actions/dataActions';
import { CRUD_GET_LIST_SUCCESS } from '../../../../types';

type ActionTypes =
	| CrudGetListSuccessAction
	| {
			type: 'OTHER_TYPE';
			payload?: { ids: string[] };
			meta?: { fetch?: string };
	  };

type State = number;

const totalReducer: Reducer<State> = (
	previousState = 0,
	action: ActionTypes,
) => {
	if (action.type === CRUD_GET_LIST_SUCCESS) {
		return action.payload.total;
	}
	return previousState;
};

export default totalReducer;
