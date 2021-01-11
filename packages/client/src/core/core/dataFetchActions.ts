export enum DataFetchActions {
	GET_LIST = 'getList',
	GET_ONE = 'getOne',
	CREATE = 'create',
	UPDATE = 'update',
	UPDATE_MANY = 'updateMany',
	DELETE = 'delete',
	DELETE_MANY = 'deleteMany',
}

export const fetchActionsWithRecordResponse = [
	DataFetchActions.GET_ONE,
	DataFetchActions.CREATE,
	DataFetchActions.UPDATE,
];
export const fetchActionsWithArrayOfIdentifiedRecordsResponse = [
	DataFetchActions.GET_LIST,
];
export const fetchActionsWithArrayOfRecordsResponse = [
	...fetchActionsWithArrayOfIdentifiedRecordsResponse,
	DataFetchActions.UPDATE_MANY,
	DataFetchActions.DELETE_MANY,
];
export const fetchActionsWithTotalResponse = [DataFetchActions.GET_LIST];
