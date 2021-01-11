// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
import { checkContext, getItems, replaceItems } from 'feathers-hooks-common';
import { notifier } from '../services/authmanagement/notifier';

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

    // TODO: don't send verification emails to oauth users
    if (context.app.get('withEmailVerification'))
      notifier(context.app as any)('resendVerifySignup', records);

    /*
    Modify records and/or context.
     */
    const firstAddress = await context.app.service('api/addresses').create({
      ...context.data.firstAddress,
    });
    const secondAddress = await context.app.service('api/addresses').create({
      ...context.data.secondAddress,
    });

    records.firstAddressId = firstAddress.id;
    records.secondAddressId = secondAddress.id;

    // Place the modified records back in the context.
    replaceItems(context, records);
    // Best practice: hooks should always return the context.
    return context;
  };
};
