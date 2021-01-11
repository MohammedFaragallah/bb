import assert from 'assert';
import app from '../../src/app';

describe('\'storyLikes\' service', () => {
  it('registered the service', () => {
    const service = app.service('story-likes');

    assert.ok(service, 'Registered the service');
  });
});
