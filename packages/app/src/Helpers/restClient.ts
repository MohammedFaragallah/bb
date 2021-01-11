import { Application, Params as FeathersParams } from '@feathersjs/feathers';
import { DataProvider, GetOneResult, UpdateParams } from 'react-admin';

import { DataTypes } from 'Constants';
import { injectImages } from 'Utils';
import { FeathersRecord } from 'types';

const defaultIdKey = 'id';

const idKey = 'id';

const deleteProp = (obj: object, prop: string) => {
	const res: { [ket: string]: any } = Object.assign({}, obj);
	delete res[prop];
	return res;
};

const mapChangeMany = (response: any[]) => ({
	data: response.map((record: FeathersRecord) => record[idKey]),
});

const mapRes = (response: GetOneResult) => ({ data: response });

enum Order {
	desc = 'DESC',
	asc = 'ASC',
}

const getOrder = (order: string) => {
	if (order === Order.desc) return -1;
	if (order === Order.asc) return 1;
	return order;
};

export const restClient = (app: Application): DataProvider => {
	return {
		[DataTypes.GET_ONE]: (resource, params) =>
			app.service(resource).get(params.id).then(mapRes),

		[DataTypes.GET_MANY]: (resource, params) => {
			const ids = params.ids || [];
			const query: FeathersParams = {};

			query[idKey] = { $in: ids };
			query.$limit = ids.length;

			return app.service(resource).find({ query });
		},

		[DataTypes.GET_MANY_REFERENCE]: (resource, params) => {
			const query: FeathersParams = {};
			if (params.target && params.id) {
				query[params.target] = params.id;
			}
			const { page, perPage } = params.pagination || {};
			const { field, order } = params.sort || {};
			if (perPage && page) {
				query.$limit = perPage;
				query.$skip = perPage * (page - 1);
			}
			if (order) {
				query.$sort = {
					[field || idKey]: getOrder(order),
				};
			}
			Object.assign(query, params.filter);
			return app.service(resource).find({ query });
		},

		[DataTypes.UPDATE]: async (resource, params: UpdateParams) => {
			let data =
				idKey !== defaultIdKey
					? deleteProp(params.data, defaultIdKey)
					: params.data;

			data = await injectImages(data);

			return app.service(resource).update(params.id, data).then(mapRes);
		},

		[DataTypes.UPDATE_MANY]: async (resource, params) => {
			let data =
				idKey !== defaultIdKey
					? deleteProp(params.data, defaultIdKey)
					: params.data;

			data = await injectImages(data);

			return Promise.all(
				params.ids.map(id => app.service(resource).update(id, data)),
			).then(mapChangeMany);
		},

		[DataTypes.CREATE]: async (resource, params) => {
			const data = await injectImages(params.data);

			return app
				.service(resource)
				.create(data)
				.then((response: typeof params.data) => ({
					data: { ...data, ...response, id: response[idKey] },
				}));
		},

		[DataTypes.DELETE]: (resource, params) => {
			return app.service(resource).remove(params.id).then(mapRes);
		},

		[DataTypes.DELETE_MANY]: (resource, params) => {
			const service = app.service(resource);

			if (service.options.multi) {
				return service.remove(null, {
					query: { [idKey]: { $in: params.ids } },
				});
			}
			return Promise.all(params.ids.map(id => service.remove(id))).then(
				mapChangeMany,
			);
		},

		[DataTypes.GET_LIST]: (resource, params) => {
			const query: FeathersParams = {};
			const { page, perPage } = params.pagination || {};
			const { field, order } = params.sort || {};
			if (perPage && page) {
				query.$limit = perPage;
				query.$skip = perPage * (page - 1);
			}
			if (order) {
				query.$sort = {
					[field || idKey]: getOrder(order),
				};
			}

			Object.assign(query, params.filter);

			return app.service(resource).find({ query });
		},
	};
};
