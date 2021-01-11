import assert from 'assert';
import app from '../../src/app';

describe('\'exerciseLikes\' service', () => {
  it('registered the service', () => {
    const service = app.service('exercise-likes');

    assert.ok(service, 'Registered the service');
  });
});
