// Initializes the `slides` service on path `/slides`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Slides } from './slides.class';
import createModel from '../../models/slides.model';
import hooks from './slides.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'api/slides': Slides & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('api/slides', new Slides(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/slides');

  service.hooks(hooks);
}
