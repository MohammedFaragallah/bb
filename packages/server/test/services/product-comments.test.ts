import assert from 'assert';
import app from '../../src/app';

describe('\'productComments\' service', () => {
  it('registered the service', () => {
    const service = app.service('product-comments');

    assert.ok(service, 'Registered the service');
  });
});
