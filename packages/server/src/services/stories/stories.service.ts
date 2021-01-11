// Initializes the `stories` service on path `/stories`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Stories } from './stories.class';
import createModel from '../../models/stories.model';
import hooks from './stories.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'api/stories': Stories & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: true,
  };

  // Initialize our service with any options it requires
  app.use('api/stories', new Stories(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/stories');

  service.hooks(hooks);
}
