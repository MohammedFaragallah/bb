import assert from 'assert';
import app from '../../src/app';

describe('\'cartItems\' service', () => {
  it('registered the service', () => {
    const service = app.service('cart-items');

    assert.ok(service, 'Registered the service');
  });
});
