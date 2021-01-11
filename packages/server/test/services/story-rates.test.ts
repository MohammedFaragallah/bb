import assert from 'assert';
import app from '../../src/app';

describe('\'storyRates\' service', () => {
  it('registered the service', () => {
    const service = app.service('story-rates');

    assert.ok(service, 'Registered the service');
  });
});
