import { Reducer } from 'redux';

interface State {
	[key: string]: any;
}

// reducer for queries called via useQueryWithStore and without a custom action name
const queriesReducer: Reducer<State> = (
	previousState = {},
	{ type, requestPayload, payload, meta },
) => {
	if (type !== 'CORE_QUERY_SUCCESS') {
		return previousState;
	}
	const key = JSON.stringify({
		type: meta.fetchResponse,
		resource: meta.resource,
		payload: requestPayload,
	});
	return {
		...previousState,
		[key]: payload,
	};
};

export default queriesReducer;
