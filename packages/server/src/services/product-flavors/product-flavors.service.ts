// Initializes the `productFlavors` service on path `/product-flavors`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { ProductFlavors } from './product-flavors.class';
import createModel from '../../models/product-flavors.model';
import hooks from './product-flavors.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'api/product-flavors': ProductFlavors & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('api/product-flavors', new ProductFlavors(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/product-flavors');

  service.hooks(hooks);
}
