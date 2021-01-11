import { RegisterResourceAction } from '../../../actions';
import { CORE_REGISTER_RESOURCE } from '../../../types';
import data from './data';
import list from './list';
import validity from './validity';

const initialState: any = {};

type ActionTypes =
	| RegisterResourceAction
	| { type: 'OTHER_ACTION'; payload?: any; meta?: { resource?: string } };

const resourceReducer = (previousState = initialState, action: ActionTypes) => {
	if (action.type === CORE_REGISTER_RESOURCE) {
		const resourceState = {
			props: action.payload,
			data: data(undefined, action),
			list: list(undefined, action),
			validity: validity(undefined, action),
		};
		return {
			...previousState,
			[action.payload.name]: resourceState,
		};
	}

	if (!action.meta || !action.meta.resource) {
		return previousState;
	}

	const resources = Object.keys(previousState);
	const newState = resources.reduce(
		(acc, resource) => ({
			...acc,
			[resource]:
				action.meta?.resource === resource
					? {
							props: previousState[resource].props,
							data: data(previousState[resource].data, action),
							list: list(previousState[resource].list, action),
							validity: validity(previousState[resource].validity, action),
					  }
					: previousState[resource],
		}),
		{},
	);

	return newState;
};

export default resourceReducer;
