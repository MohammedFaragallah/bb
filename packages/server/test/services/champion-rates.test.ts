import assert from 'assert';
import app from '../../src/app';

describe('\'championRates\' service', () => {
  it('registered the service', () => {
    const service = app.service('champion-rates');

    assert.ok(service, 'Registered the service');
  });
});
