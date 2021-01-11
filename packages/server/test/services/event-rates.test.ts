import assert from 'assert';
import app from '../../src/app';

describe('\'eventRates\' service', () => {
  it('registered the service', () => {
    const service = app.service('event-rates');

    assert.ok(service, 'Registered the service');
  });
});
