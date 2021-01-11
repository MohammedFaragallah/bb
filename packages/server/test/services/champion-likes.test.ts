import assert from 'assert';
import app from '../../src/app';

describe('\'championLikes\' service', () => {
  it('registered the service', () => {
    const service = app.service('champion-likes');

    assert.ok(service, 'Registered the service');
  });
});
