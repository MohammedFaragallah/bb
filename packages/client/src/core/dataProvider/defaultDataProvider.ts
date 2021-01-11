import {
	CreateParams,
	DeleteManyParams,
	DeleteParams,
	GetListParams,
	GetOneParams,
	UpdateManyParams,
	UpdateParams,
} from '../types';

const record = { id: 1 };

const defaultDataProvider = {
	create: (resource: string, params: CreateParams) =>
		Promise.resolve({ data: record }), // avoids adding a context in tests
	delete: (resource: string, params: DeleteParams) =>
		Promise.resolve({ data: record }), // avoids adding a context in tests
	deleteMany: (resource: string, params: DeleteManyParams) =>
		Promise.resolve({ data: [] }), // avoids adding a context in tests
	getList: (resource: string, params: GetListParams) =>
		Promise.resolve({ data: [], total: 0 }), // avoids adding a context in tests
	getOne: (rce: string, params: GetOneParams) =>
		Promise.resolve({ data: record }), // avoids adding a context in tests
	update: (resource: string, params: UpdateParams) =>
		Promise.resolve({ data: record }), // avoids adding a context in tests
	updateMany: (resource: string, params: UpdateManyParams) =>
		Promise.resolve({ data: [] }), // avoids adding a context in tests
};

export default defaultDataProvider;
