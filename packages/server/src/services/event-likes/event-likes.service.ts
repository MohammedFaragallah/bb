// Initializes the `eventLikes` service on path `/event-likes`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { EventLikes } from './event-likes.class';
import createModel from '../../models/event-likes.model';
import hooks from './event-likes.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'api/event-likes': EventLikes & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('api/event-likes', new EventLikes(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/event-likes');

  service.hooks(hooks);
}
