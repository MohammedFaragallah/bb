import assert from 'assert';
import app from '../../src/app';

describe('\'exercises\' service', () => {
  it('registered the service', () => {
    const service = app.service('exercises');

    assert.ok(service, 'Registered the service');
  });
});
