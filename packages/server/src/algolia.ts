// For the default version
import algoliasearch from 'algoliasearch';
import { Application } from './declarations';

export default (app: Application) => {
  const { appId, apiKey } = app.get('algolia');

  return algoliasearch(appId, apiKey);
};
