import assert from 'assert';
import app from '../../src/app';

describe('\'storyViews\' service', () => {
  it('registered the service', () => {
    const service = app.service('story-views');

    assert.ok(service, 'Registered the service');
  });
});
