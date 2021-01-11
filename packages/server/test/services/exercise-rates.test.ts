import assert from 'assert';
import app from '../../src/app';

describe('\'exerciseRates\' service', () => {
  it('registered the service', () => {
    const service = app.service('exercise-rates');

    assert.ok(service, 'Registered the service');
  });
});
