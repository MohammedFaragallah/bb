import assert from 'assert';
import app from '../../src/app';

describe('\'champions\' service', () => {
  it('registered the service', () => {
    const service = app.service('champions');

    assert.ok(service, 'Registered the service');
  });
});
