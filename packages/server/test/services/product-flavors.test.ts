import assert from 'assert';
import app from '../../src/app';

describe('\'productFlavors\' service', () => {
  it('registered the service', () => {
    const service = app.service('product-flavors');

    assert.ok(service, 'Registered the service');
  });
});
