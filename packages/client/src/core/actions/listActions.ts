import { CRUD_CHANGE_LIST_PARAMS, TOGGLE_LIST_ITEM } from '../types';

export interface ListParams {
	sort: string;
	order: string;
	page: number;
	perPage: number;
	filter: any;
	displayedFilters: any;
}

export interface ChangeListParamsAction {
	readonly type: typeof CRUD_CHANGE_LIST_PARAMS;
	readonly payload: ListParams;
	readonly meta: { resource: string };
}

export const changeListParams = (
	resource: string,
	params: ListParams,
): ChangeListParamsAction => ({
	type: CRUD_CHANGE_LIST_PARAMS,
	payload: params,
	meta: { resource },
});

export interface ToggleListItemAction {
	readonly type: typeof TOGGLE_LIST_ITEM;
	readonly payload: any;
	readonly meta: { resource: string };
}

export const toggleListItem = (
	resource: string,
	id: any,
): ToggleListItemAction => ({
	type: TOGGLE_LIST_ITEM,
	payload: id,
	meta: { resource },
});
