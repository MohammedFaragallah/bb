// Initializes the `storyRates` service on path `/story-rates`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { StoryRates } from './story-rates.class';
import createModel from '../../models/story-rates.model';
import hooks from './story-rates.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'api/story-rates': StoryRates & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('api/story-rates', new StoryRates(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/story-rates');

  service.hooks(hooks);
}
