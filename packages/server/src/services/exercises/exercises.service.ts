// Initializes the `exercises` service on path `/exercises`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Exercises } from './exercises.class';
import createModel from '../../models/exercises.model';
import hooks from './exercises.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'api/exercises': Exercises & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('api/exercises', new Exercises(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/exercises');

  service.hooks(hooks);
}
