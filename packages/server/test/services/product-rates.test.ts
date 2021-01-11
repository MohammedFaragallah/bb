import assert from 'assert';
import app from '../../src/app';

describe('\'productRates\' service', () => {
  it('registered the service', () => {
    const service = app.service('product-rates');

    assert.ok(service, 'Registered the service');
  });
});
