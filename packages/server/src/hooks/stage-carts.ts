// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
import { checkContext, getItems, replaceItems } from 'feathers-hooks-common';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    // Throw if the hook is being called from an unexpected location.
    checkContext(context, null, [
      'find',
      'get',
      'create',
      'update',
      'patch',
      'remove',
    ]);

    // Get the authenticated user.
    // eslint-disable-next-line no-unused-vars
    const { user } = context.params;
    // Get the record(s) from context.data (before), context.result.data or context.result (after).
    // getItems always returns an array to simplify your processing.
    const records = getItems(context);

    /*
    Modify records and/or context.
     */
    if (records.status === 'Processed') {
      Promise.all(
        records.items.map(async (item: any) => {
          const flavor = await context.app
            .service('api/product-flavors')
            .get(item.id);

          return context.app.service('api/product-flavors').update(flavor.id, {
            ...flavor,
            quantity: flavor.quantity - item.quantity,
          });
        }),
      ).then(() => {
        context.app
          .service('api/carts')
          .update(records.id, { ...records, status: 'Processing' });
      });
    }
    // Place the modified records back in the context.
    replaceItems(context, records);
    // Best practice: hooks should always return the context.
    return context;
  };
};
