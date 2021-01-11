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
    if (context.method === 'find' && records.length) {
      await Promise.all(
        records.map(async (record: any) => {
          record.len = await context.app
            .service('api/stories')
            .find({
              query: { $limit: 0, approved: true, categoryId: record.id },
            })
            .then((res: any) => res.total);
        }),
      );
    }
    // Place the modified records back in the context.
    replaceItems(context, records);
    // Best practice: hooks should always return the context.
    return context;
  };
};
