// Initializes the `carts` service on path `/carts`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Carts } from './carts.class';
import createModel from '../../models/carts.model';
import hooks from './carts.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'api/carts': Carts & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('api/carts', new Carts(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/carts');

  service.hooks(hooks);
}
