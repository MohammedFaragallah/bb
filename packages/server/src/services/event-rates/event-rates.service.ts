// Initializes the `eventRates` service on path `/event-rates`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { EventRates } from './event-rates.class';
import createModel from '../../models/event-rates.model';
import hooks from './event-rates.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'api/event-rates': EventRates & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('api/event-rates', new EventRates(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/event-rates');

  service.hooks(hooks);
}
