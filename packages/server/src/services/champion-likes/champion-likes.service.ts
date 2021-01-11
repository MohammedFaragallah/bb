// Initializes the `championLikes` service on path `/champion-likes`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { ChampionLikes } from './champion-likes.class';
import createModel from '../../models/champion-likes.model';
import hooks from './champion-likes.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'api/champion-likes': ChampionLikes & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('api/champion-likes', new ChampionLikes(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/champion-likes');

  service.hooks(hooks);
}
