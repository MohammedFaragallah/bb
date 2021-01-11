import assert from 'assert';
import app from '../../src/app';

describe('\'exerciseComments\' service', () => {
  it('registered the service', () => {
    const service = app.service('exercise-comments');

    assert.ok(service, 'Registered the service');
  });
});
