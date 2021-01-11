import assert from 'assert';
import app from '../../src/app';

describe('\'eventComments\' service', () => {
  it('registered the service', () => {
    const service = app.service('event-comments');

    assert.ok(service, 'Registered the service');
  });
});
