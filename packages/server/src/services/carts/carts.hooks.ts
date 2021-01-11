import * as authentication from '@feathersjs/authentication';
import addAuthor from '../../hooks/add-author';
import { fastJoin } from 'feathers-hooks-common';
import { HookContext } from '@feathersjs/feathers';
import stageCarts from '../../hooks/stage-carts';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

const cartResolvers = {
  joins: {
    items: () => async (cart: any, context: HookContext) => {
      const cartItem = await context.app.service('api/cart-items').find({
        query: { cartId: cart.id },
        paginate: false,
      });

      cart.total = cartItem.reduce(
        (accumulator: number, currentValue: any) =>
          accumulator + currentValue.price * currentValue.quantity,
        0,
      );
      cart.items = cartItem;
    },
  },
};

export default {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [addAuthor()],
    update: [stageCarts()],
    patch: [stageCarts()],
    remove: [],
  },

  after: {
    all: [fastJoin(cartResolvers)],
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
