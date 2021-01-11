// Initializes the `storyViews` service on path `/story-views`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { StoryViews } from './story-views.class';
import createModel from '../../models/story-views.model';
import hooks from './story-views.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'api/story-views': StoryViews & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('api/story-views', new StoryViews(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/story-views');

  service.hooks(hooks);
}
