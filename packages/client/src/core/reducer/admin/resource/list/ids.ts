import uniq from 'lodash/uniq';
import { Reducer } from 'redux';

import {
	CrudCreateSuccessAction,
	CrudGetListSuccessAction,
	CrudGetOneSuccessAction,
} from '../../../../actions';
import {
	CRUD_CREATE_SUCCESS,
	CRUD_GET_LIST_SUCCESS,
	Identifier,
} from '../../../../types';

type IdentifierArray = Identifier[];

type ActionTypes =
	| CrudGetListSuccessAction
	| CrudGetOneSuccessAction
	| CrudCreateSuccessAction
	| {
			type: 'OTHER_ACTION';
			payload: any;
			meta: any;
	  };

/**
 * List of the ids of the latest loaded page, regardless of params
 *
 * When loading a the list for the first time, useListController grabs the ids
 * from the cachedRequests reducer (not this ids reducer). It's only when the user
 * changes page, sort, or filter, that the useListController hook uses the ids
 * reducer, so as to show the previous list of results while loading the new
 * list (intead of displaying a blank page each time the list params change).
 *
 * @see useListController
 *
 */
const idsReducer: Reducer<IdentifierArray, ActionTypes> = (
	previousState = [],
	action,
) => {
	switch (action.type) {
		case CRUD_GET_LIST_SUCCESS:
			return action.payload.data.map(({ id }) => id);
		case CRUD_CREATE_SUCCESS:
			return uniq([action.payload.data.id, ...previousState]);
		default:
			return previousState;
	}
};

export default idsReducer;
