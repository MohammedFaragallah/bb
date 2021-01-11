import assert from 'assert';
import app from '../../src/app';

describe('\'storyComments\' service', () => {
  it('registered the service', () => {
    const service = app.service('story-comments');

    assert.ok(service, 'Registered the service');
  });
});
