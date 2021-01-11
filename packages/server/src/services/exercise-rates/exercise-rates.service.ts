// Initializes the `exerciseRates` service on path `/exercise-rates`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { ExerciseRates } from './exercise-rates.class';
import createModel from '../../models/exercise-rates.model';
import hooks from './exercise-rates.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'api/exercise-rates': ExerciseRates & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('api/exercise-rates', new ExerciseRates(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/exercise-rates');

  service.hooks(hooks);
}
