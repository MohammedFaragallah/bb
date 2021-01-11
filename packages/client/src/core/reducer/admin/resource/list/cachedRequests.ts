import { Reducer } from 'redux';

import { DataFetchActions } from '../../../../core';
import { FETCH_END, Identifier } from '../../../../types';
import ids from './cachedRequests/ids';
import total from './cachedRequests/total';
import validity from './cachedRequests/validity';

interface CachedRequestState {
	ids: Identifier[];
	total: number;
	validity: Date;
}

interface State {
	[key: string]: CachedRequestState;
}

const initialState = {};
const initialSubState = { ids: [], total: null, validity: null };

const cachedRequestsReducer: Reducer<State, any> = (
	previousState = initialState,
	action,
) => {
	if (!action.meta || action.meta.fetchStatus !== FETCH_END) {
		// not a return from the dataProvider
		return previousState;
	}
	if (
		action.meta.fetchResponse === DataFetchActions.CREATE ||
		action.meta.fetchResponse === DataFetchActions.DELETE ||
		action.meta.fetchResponse === DataFetchActions.DELETE_MANY ||
		action.meta.fetchResponse === DataFetchActions.UPDATE ||
		action.meta.fetchResponse === DataFetchActions.UPDATE_MANY
	) {
		// force refresh of all lists because we don't know where the
		// new/deleted/updated record(s) will appear in the list
		return initialState;
	}
	if (
		action.meta.fetchResponse !== DataFetchActions.GET_LIST ||
		action.meta.fromCache
	) {
		// looks like a GET_ONE, or a cached response
		return previousState;
	}
	const requestKey = JSON.stringify(action.requestPayload);
	const previousSubState = previousState[requestKey] || initialSubState;
	return {
		...previousState,
		[requestKey]: {
			ids: ids(previousSubState.ids, action),
			total: total(previousSubState.total, action),
			validity: validity(previousSubState.validity, action),
		},
	};
};

export default cachedRequestsReducer;
