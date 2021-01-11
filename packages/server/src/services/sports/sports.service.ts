// Initializes the `sports` service on path `/sports`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Sports } from './sports.class';
import createModel from '../../models/sports.model';
import hooks from './sports.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'api/sports': Sports & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('api/sports', new Sports(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/sports');

  service.hooks(hooks);
}
