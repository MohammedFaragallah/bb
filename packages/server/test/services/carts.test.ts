import assert from 'assert';
import app from '../../src/app';

describe('\'carts\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/carts');

    assert.ok(service, 'Registered the service');
  });
});
