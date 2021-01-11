// Initializes the `productSizes` service on path `/product-sizes`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { ProductSizes } from './product-sizes.class';
import createModel from '../../models/product-sizes.model';
import hooks from './product-sizes.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'api/product-sizes': ProductSizes & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('api/product-sizes', new ProductSizes(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/product-sizes');

  service.hooks(hooks);
}
