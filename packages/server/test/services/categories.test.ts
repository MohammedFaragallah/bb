import assert from 'assert';
import app from '../../src/app';

describe('\'categories\' service', () => {
  it('registered the service', () => {
    const service = app.service('categories');

    assert.ok(service, 'Registered the service');
  });
});
