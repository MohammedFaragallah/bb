// Initializes the `storyComments` service on path `/story-comments`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { StoryComments } from './story-comments.class';
import createModel from '../../models/story-comments.model';
import hooks from './story-comments.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'api/story-comments': StoryComments & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('api/story-comments', new StoryComments(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/story-comments');

  service.hooks(hooks);
}
