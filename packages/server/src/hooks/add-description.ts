// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';

import { checkContext, getItems, replaceItems } from 'feathers-hooks-common';

import htmlToText from 'html-to-text';
import readingTime from 'reading-time';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (source = 'articleBody', to = 'description'): Hook => {
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
    if (
      records &&
      (context.method === 'create' || context.method === 'update')
    ) {
      if (records[source] && !records[to]) {
        const slotsRegex = /%%.+%%/g;

        const text = htmlToText.htmlToText(records[source]);
        records[to] = text.replace(slotsRegex, '');
        records.readingTime = readingTime(text);
      }
    }
    // Place the modified records back in the context.
    replaceItems(context, records);
    // Best practice: hooks should always return the context.
    return context;
  };
};
