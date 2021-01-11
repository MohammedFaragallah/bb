// Initializes the `champions` service on path `/champions`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Champions } from './champions.class';
import createModel from '../../models/champions.model';
import hooks from './champions.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'api/champions': Champions & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('api/champions', new Champions(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/champions');

  service.hooks(hooks);
}
