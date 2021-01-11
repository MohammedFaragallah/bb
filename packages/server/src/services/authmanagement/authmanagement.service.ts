// Initializes the `authmanagement` service on path `/authmanagement`
import { ServiceAddons } from '@feathersjs/feathers';
import authManagement, {
  AuthManagementService,
} from 'feathers-authentication-management-ts';

import { Application } from '../../declarations';
import hooks from './authmanagement.hooks';
import { notifier } from './notifier';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    authManagement: AuthManagementService & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  app.configure(
    authManagement({
      skipIsVerifiedCheck: true,
      notifier: notifier(app),
    }),
  );

  const service = app.service('authManagement');

  service.hooks(hooks);
}
