import get from 'lodash/get';

import {
	GetListParams,
	GetListResult,
	GetOneParams,
	GetOneResult,
} from '../types';

export const canReplyWithCache = (
	type: any,
	payload: any,
	resourceState: any,
) => {
	const now = new Date();
	switch (type) {
		case 'getList':
			return (
				get(resourceState, [
					'list',
					'cachedRequests',
					JSON.stringify(payload as GetListParams),
					'validity',
				]) > now
			);
		case 'getOne':
			return (
				resourceState &&
				resourceState.validity &&
				resourceState.validity[(payload as GetOneParams).id] > now
			);

		default:
			return false;
	}
};

export const getResultFromCache = (
	type: any,
	payload: any,
	resourceState: any,
) => {
	switch (type) {
		case 'getList': {
			const data = resourceState.data;
			const requestSignature = JSON.stringify(payload);
			const cachedRequest = resourceState.list.cachedRequests[requestSignature];
			return {
				data: cachedRequest.ids.map((id: any) => data[id]),
				total: cachedRequest.total,
			} as GetListResult;
		}
		case 'getOne':
			return { data: resourceState.data[payload.id] } as GetOneResult;
		default:
			throw new Error('cannot reply with cache for this method');
	}
};
