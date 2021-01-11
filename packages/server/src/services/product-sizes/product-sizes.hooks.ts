import * as authentication from '@feathersjs/authentication';
import { fastJoin } from 'feathers-hooks-common';
import { HookContext } from '@feathersjs/feathers';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;
const productResolvers = {
  joins: {
    product: () => async (size: any, context: HookContext) => {
      const product = await context.app
        .service('api/products')
        .get(size.productId);

      size.productName = product.name;

      delete product.id;
      delete product.createdAt;
      delete product.updatedAt;
      delete product.name;

      for (const prop in product) size[prop] = product[prop];
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
    all: [fastJoin(productResolvers)],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
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
