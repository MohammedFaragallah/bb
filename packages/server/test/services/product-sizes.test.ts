import assert from 'assert';
import app from '../../src/app';

describe('\'productSizes\' service', () => {
  it('registered the service', () => {
    const service = app.service('product-sizes');

    assert.ok(service, 'Registered the service');
  });
});
