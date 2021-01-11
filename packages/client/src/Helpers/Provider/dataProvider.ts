import { Application, Params as FeathersParams } from '@feathersjs/feathers';

import { Order, OrderNum } from '@types';
import { DataTypes } from 'Constants';
import { CoreRecord, DataProvider, GetOneResult, UpdateParams } from 'core';

const defaultIdKey = 'id';

const idKey = 'id';

const deleteProp = <T extends CoreRecord = CoreRecord>(
	obj: T,
	prop: keyof T,
) => {
	const res = { ...obj };
	delete res[prop];
	return res;
};

const mapChangeMany = (response: CoreRecord[]) => ({
	data: response.map(record => record[idKey]),
});

const mapRes = (response: GetOneResult) => ({ data: response });

const getOrder = (order: string | number) => {
	if (order === Order.desc) return OrderNum.desc;
	if (order === Order.asc) return OrderNum.asc;
	return order;
};

const dataProvider = (app: Application): DataProvider => {
	return {
		[DataTypes.GET_ONE]: (resource, params) =>
			app.service(resource).get(params.id).then(mapRes),

		[DataTypes.UPDATE]: (resource, params: UpdateParams) => {
			const data =
				idKey !== defaultIdKey
					? deleteProp(params.data, defaultIdKey)
					: params.data;

			return app.service(resource).update(params.id, data).then(mapRes);
		},

		[DataTypes.UPDATE_MANY]: async (resource, params) => {
			const data =
				idKey !== defaultIdKey
					? deleteProp(params.data, defaultIdKey)
					: params.data;

			const response = await Promise.all(
				params.ids.map(id => app.service(resource).update(id, data)),
			);
			return mapChangeMany(response);
		},

		[DataTypes.CREATE]: (resource, params) => {
			return app
				.service(resource)
				.create(params.data)
				.then((response: typeof params.data) => ({
					data: { ...params.data, ...response, id: response[idKey] },
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
				// TODO: handle multiple sorts
				query.$sort = {
					[field || idKey]: getOrder(order),
				};
			}

			Object.assign(query, params.filter);

			return app.service(resource).find({ query });
		},
	};
};

export default dataProvider;
