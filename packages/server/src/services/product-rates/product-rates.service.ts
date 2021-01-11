// Initializes the `productRates` service on path `/product-rates`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { ProductRates } from './product-rates.class';
import createModel from '../../models/product-rates.model';
import hooks from './product-rates.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'api/product-rates': ProductRates & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('api/product-rates', new ProductRates(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/product-rates');

  service.hooks(hooks);
}
