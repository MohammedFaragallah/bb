import assert from 'assert';
import app from '../../src/app';

describe('\'sports\' service', () => {
  it('registered the service', () => {
    const service = app.service('sports');

    assert.ok(service, 'Registered the service');
  });
});
