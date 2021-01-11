import assert from 'assert';
import app from '../../src/app';

describe('\'options\' service', () => {
  it('registered the service', () => {
    const service = app.service('options');

    assert.ok(service, 'Registered the service');
  });
});
