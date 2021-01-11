import * as authentication from '@feathersjs/authentication';
import { fastJoin } from 'feathers-hooks-common';
import { HookContext } from '@feathersjs/feathers';
import algolia from '../../hooks/algolia';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

const flavorResolvers = {
  joins: {
    items: () => async (flavor: any, context: HookContext) => {
      const size = await context.app
        .service('api/product-sizes')
        .get(flavor.productSizeId);

      const product = await context.app
        .service('api/products')
        .get(size.productId);

      const data = {
        sizeName: size.name,
        productName: product.name,
        ...size,
        ...product,
      };

      delete data.id;
      delete data.createdAt;
      delete data.updatedAt;
      delete data.name;

      for (const prop in data) flavor[prop] = data[prop];
    },
  },
};

export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [authenticate('jwt')],
    update: [authenticate('jwt')],
    patch: [authenticate('jwt')],
    remove: [authenticate('jwt')],
  },

  after: {
    all: [fastJoin(flavorResolvers)],
    find: [],
    get: [],
    create: [algolia()],
    update: [algolia()],
    patch: [algolia()],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
