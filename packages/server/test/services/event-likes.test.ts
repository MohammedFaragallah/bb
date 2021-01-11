import assert from 'assert';
import app from '../../src/app';

describe('\'eventLikes\' service', () => {
  it('registered the service', () => {
    const service = app.service('event-likes');

    assert.ok(service, 'Registered the service');
  });
});
