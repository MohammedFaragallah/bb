// Initializes the `productComments` service on path `/product-comments`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { ProductComments } from './product-comments.class';
import createModel from '../../models/product-comments.model';
import hooks from './product-comments.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'api/product-comments': ProductComments & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('api/product-comments', new ProductComments(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/product-comments');

  service.hooks(hooks);
}
