// Initializes the `championRates` service on path `/champion-rates`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { ChampionRates } from './champion-rates.class';
import createModel from '../../models/champion-rates.model';
import hooks from './champion-rates.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'api/champion-rates': ChampionRates & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('api/champion-rates', new ChampionRates(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/champion-rates');

  service.hooks(hooks);
}
