import assert from 'assert';
import app from '../../src/app';

describe('\'slides\' service', () => {
  it('registered the service', () => {
    const service = app.service('slides');

    assert.ok(service, 'Registered the service');
  });
});
