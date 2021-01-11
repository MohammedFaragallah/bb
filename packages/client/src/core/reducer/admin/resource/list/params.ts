import { Reducer } from 'redux';

import { ChangeListParamsAction } from '../../../../actions/listActions';
import { CRUD_CHANGE_LIST_PARAMS } from '../../../../types';

const defaultState = {
	sort: null,
	order: null,
	page: 1,
	perPage: null,
	filter: {},
};

interface ParamsState {
	sort: string | null;
	order: string | null;
	page: number;
	perPage: number | null;
	filter: any;
}

type ActionTypes =
	| ChangeListParamsAction
	| { type: 'OTHER_ACTION'; payload: any };

const paramsReducer: Reducer<ParamsState, ActionTypes> = (
	previousState = defaultState,
	action,
) => {
	switch (action.type) {
		case CRUD_CHANGE_LIST_PARAMS:
			return action.payload;
		default:
			return previousState;
	}
};

export default paramsReducer;
