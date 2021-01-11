// Initializes the `storyLikes` service on path `/story-likes`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { StoryLikes } from './story-likes.class';
import createModel from '../../models/story-likes.model';
import hooks from './story-likes.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'api/story-likes': StoryLikes & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('api/story-likes', new StoryLikes(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/story-likes');

  service.hooks(hooks);
}
