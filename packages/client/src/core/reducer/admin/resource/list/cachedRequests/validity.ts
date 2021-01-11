import { Reducer } from 'redux';

import { DataFetchActions } from '../../../../../core';

type State = Date | null;

const initialState = null;

const validityReducer: Reducer<State> = (
	previousState = initialState,
	{ payload, meta },
) => {
	switch (meta.fetchResponse) {
		case DataFetchActions.GET_LIST: {
			if (payload.validUntil) {
				// store the validity date
				return payload.validUntil;
			} else {
				// remove the validity date
				return initialState;
			}
		}
		default:
			return previousState;
	}
};

export default validityReducer;
