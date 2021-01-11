import assert from 'assert';
import app from '../../src/app';

describe('\'stories\' service', () => {
  it('registered the service', () => {
    const service = app.service('stories');

    assert.ok(service, 'Registered the service');
  });
});
