import { Reducer } from 'redux';

import { DataFetchActions } from '../../../core';
import { FETCH_END, Identifier } from '../../../types';

interface ValidityRegistry {
	// FIXME: use [key: Identifier] once typeScript accepts any type as index (see https://github.com/Microsoft/TypeScript/pull/26797)
	[key: string]: Date;
	[key: number]: Date;
}

const initialState = {};

const validityReducer: Reducer<ValidityRegistry> = (
	previousState = initialState,
	{ type, payload, requestPayload, meta },
) => {
	if (
		!meta ||
		!meta.fetchResponse ||
		meta.fetchStatus !== FETCH_END ||
		meta.fromCache === true
	) {
		return previousState;
	}
	if (payload.validUntil) {
		// store the validity date
		switch (meta.fetchResponse) {
			case DataFetchActions.GET_LIST:
				return addIds(
					payload.data.map((record: any) => record.id),
					payload.validUntil,
					previousState,
				);
			case DataFetchActions.UPDATE_MANY:
				return addIds(payload.data, payload.validUntil, previousState);
			case DataFetchActions.UPDATE:
			case DataFetchActions.CREATE:
			case DataFetchActions.GET_ONE:
				return addIds([payload.data.id], payload.validUntil, previousState);
			case DataFetchActions.DELETE:
			case DataFetchActions.DELETE_MANY:
				throw new Error(
					'Responses to dataProvider.delete() or dataProvider.deleteMany() should not contain a validUntil param',
				);
			default:
				return previousState;
		}
	} else {
		// remove the validity date
		switch (meta.fetchResponse) {
			case DataFetchActions.GET_LIST:
				return removeIds(
					payload.data.map((record: any) => record.id),
					previousState,
				);
			case DataFetchActions.UPDATE:
			case DataFetchActions.CREATE:
			case DataFetchActions.GET_ONE:
				return removeIds([payload.data.id], previousState);
			case DataFetchActions.UPDATE_MANY:
				return removeIds(payload.data, previousState);
			case DataFetchActions.DELETE:
				return removeIds([requestPayload.id], previousState);
			case DataFetchActions.DELETE_MANY:
				return removeIds(requestPayload.ids, previousState);
			default:
				return previousState;
		}
	}
};

const addIds = (
	ids: Identifier[] = [],
	validUntil: Date,
	oldValidityRegistry: ValidityRegistry,
): ValidityRegistry => {
	const validityRegistry = { ...oldValidityRegistry };
	ids.forEach(id => {
		validityRegistry[id] = validUntil;
	});
	return validityRegistry;
};

const removeIds = (
	ids: Identifier[] = [],
	oldValidityRegistry: ValidityRegistry,
): ValidityRegistry => {
	const validityRegistry = { ...oldValidityRegistry };
	ids.forEach(id => {
		delete validityRegistry[id];
	});
	return validityRegistry;
};

export default validityReducer;
