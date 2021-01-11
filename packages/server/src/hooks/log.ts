// A hook that logs service method before, after and error
// See https://github.com/winstonjs/winston for documentation
// about the logger.

import logger from '../logger';
import { Hook, HookContext } from '@feathersjs/feathers';
// To see more detailed messages, uncomment the following line:
// logger.level = 'debug';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    // This debugs the service call and a stringified version of the hook context
    // You can customize the message (and logger) to your needs
    logger.debug(
      `${context.type} app.service('${context.path}').${context.method}()`,
    );

    if (context.error) {
      logger.error(context.error.stack);
    }

    return context;
  };
};
