// Initializes the `options` service on path `/options`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Options } from './options.class';
import createModel from '../../models/options.model';
import hooks from './options.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'api/options': Options & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('api/options', new Options(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/options');

  service.hooks(hooks);
}
